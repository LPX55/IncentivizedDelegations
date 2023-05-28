// SPDX-License-Identifier: LGPL-v3
pragma solidity >=0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IRedelegationReward} from "./IRedelegationReward.sol";

import "./Staking.sol";
import "./Distribution.sol";

error ZeroAmount();
error WaitToFinish();
error NotEnoughBalance();
error TooHighReward();
error FailedToWithdrawStaking();

/**
 * Stakes tokens for a certain duration and gets rewards according to their
 * staked shares
 */
contract RedelegationReward is IRedelegationReward, Ownable, Pausable, ReentrancyGuard {
    string[] private stakingMethods = [MSG_REDELEGATE];
    mapping(address => bool) private approvedUsers;

    /// @dev Approves the required transactions for delegation and withdrawal of staking rewards transactions.
    /// @dev This creates a Cosmos Authorization Grants for the given methods.
    /// @dev This emits an Approval event.
    function approveRequiredMethods() public {
        bool success = STAKING_CONTRACT.approve(
            msg.sender,
            type(uint256).max,
            stakingMethods
        );
        require(success, "Failed to approve delegate method");
        approvedUsers[msg.sender] = true; // Track the user as approved

    }


    using SafeERC20 for IERC20;

    // Address to staking ERC20 token
    IERC20 public stakingToken;
    // Address to rewards ERC20 token
    IERC20 public rewardsToken;
    // Block timestamp of the end of reward session
    uint256 public periodFinish;
    // Reward rate
    uint256 public rewardRate;
    // Rewards duration in seconds
    uint256 public rewardsDuration = 2 days;
    // Last timestamp of funding in seconds
    uint256 public lastUpdateTime;
    // Accumulated rewards token
    uint256 public rewardPerTokenStored;

    // Mapping for accumulated rewards token as temporary store
    mapping(address => uint256) public userRewardPerTokenPaid;
    // Mapping for rewards amount, <user account, rewards amount>
    mapping(address => uint256) public rewards;

    // Total staked token amount
    uint256 private totalSupply;
    // Balances of staked token per user
    mapping(address => uint256) private balances;

    /* -------------------------------------------------------------------------- */
    /*                                   Events                                   */
    /* -------------------------------------------------------------------------- */

    /**
    * Emitted when user stakes staking token
    */
    event Redelegate(address indexed account, uint256 amount);
    /**
    * Emited when user unstakes his/her staked token
    */
    event CancelRedelegate(address indexed account, uint256 amount);
    /**
    * Emitted when user claim his/her rewards token
    */
    event Claimed(address indexed account, uint256 amount);
    /**
    * Emitted when owner funds rewards token and restart rewarding session
    */
    event Funded(uint256 amount);
    /**
    * Emitted when rewards duration has been updated
    */
    event RewardsDurationUpdated(uint256 duration);
    /**
    * Emitted when owner recovered tokens from this contract
    */
    event Recovered(address token, uint256 amount);

    /* -------------------------------------------------------------------------- */
    /*                                  Modifier                                  */
    /* -------------------------------------------------------------------------- */

    modifier updateReward(address account) {
    rewardPerTokenStored = _rewardPerToken();
    lastUpdateTime = _lastTimeRewardApplicable();
    if (account != address(0)) {
        rewards[account] = _earned(account);
        userRewardPerTokenPaid[account] = rewardPerTokenStored;
    }
    _;
    }

  /* -------------------------------------------------------------------------- */
  /*                             External Functions                             */
  /* -------------------------------------------------------------------------- */

  /**
   * @dev Constructor
   * @param rewardsToken_ Address to rewards ERC20 token
   * @param duration Reward duration in seconds
   */
  constructor(address rewardsToken_, uint256 duration) {
    rewardsToken = IERC20(rewardsToken_);
    stakingToken = IERC20(address(0xBeFe898407483f0f2fF605971FBD8Cf8FbD8B160));
    rewardsDuration = duration;
  }

  /**
   * @notice Set rewards duration, only available to set after finish
   * of previous rewards period.
   * @dev Callable by owner
   * @param duration New rewards duration
   */
  function setRewardsDuration(uint256 duration) external onlyOwner {
    if (block.timestamp < periodFinish) {
      revert WaitToFinish();
    }
    rewardsDuration = duration;
    emit RewardsDurationUpdated(duration);
  }


    /// @dev Redelegate the staked tokens from one validator to another
    /// @param _srcValidatorAddr The address of the source validator
    /// @param _dstValidatorAddr The address of the destination validator
    /// @param _amount The amount of tokens to redelegate
    function redelegateTokens(
        string memory _srcValidatorAddr,
        string memory _dstValidatorAddr,
        uint256 _amount
    ) public whenNotPaused updateReward(msg.sender) returns (int64) {
        if (_amount <= 0) {
            revert ZeroAmount();
        }
        int64 completionTime = STAKING_CONTRACT.redelegate(msg.sender, _srcValidatorAddr, _dstValidatorAddr, _amount);
        totalSupply = totalSupply + _amount;
        balances[msg.sender] += _amount;
        emit Redelegate(msg.sender, _amount);
        return completionTime;
    }
    /// @dev Redelegate the staked tokens from multiple validators to others
    /// @param _srcValidatorAddrs The addresses of the source validators
    /// @param _dstValidatorAddrs The addresses of the destination validators
    /// @param _amounts The amounts of tokens to redelegate
    function redelegateTokensMultiple(
        string[] memory _srcValidatorAddrs,
        string[] memory _dstValidatorAddrs,
        uint256[] memory _amounts
    ) public whenNotPaused{
        require(
            _srcValidatorAddrs.length == _dstValidatorAddrs.length &&
            _dstValidatorAddrs.length == _amounts.length,
            "Input arrays length mismatch"
        );
        for (uint256 i = 0; i < _srcValidatorAddrs.length; i++) {
            redelegateTokens(_srcValidatorAddrs[i], _dstValidatorAddrs[i], _amounts[i]);
        }
    }


  /**
   * @notice Claim rewards tokens, callable only when unpaused.
   * @dev Callable only when unpaused
   */
  function claim() public nonReentrant whenNotPaused updateReward(msg.sender) {
    uint256 reward = rewards[msg.sender];
    if (reward > 0) {
      rewards[msg.sender] = 0;
      rewardsToken.safeTransfer(msg.sender, reward);
      emit Claimed(msg.sender, reward);
    }
  }

  /**
   * @notice Fund rewards tokens and re-calculate rewards rate.
   * Rewards rate will be calculated again from remaining distributable tokens
   * and awarding rewards tokens.
   * @dev Callable only when unpaused and by owner
   * @param reward Funding rewards token amount
   */
  function fund(
    uint256 reward
  ) public onlyOwner whenNotPaused updateReward(address(0)) {
    if (block.timestamp >= periodFinish) {
      rewardRate = reward / rewardsDuration;
    } else {
      uint256 remaining = periodFinish - block.timestamp;
      uint256 leftover = remaining * rewardRate;
      rewardRate = (reward + leftover) / rewardsDuration;
    }

    // Ensure the provided reward amount is not more than the balance in the contract.
    // This keeps the reward rate in the right range, preventing overflows due to
    // very high values of rewardRate in the earned() and rewardsPerToken()
    // Reward + leftover must be less than 2^256 / 10^18 to avoid overflow.
    rewardsToken.safeTransferFrom(msg.sender, address(this), reward);
    uint256 balance = rewardsToken.balanceOf(address(this));
    if (rewardRate > balance / rewardsDuration) {
      revert TooHighReward();
    }

    lastUpdateTime = block.timestamp;
    periodFinish = block.timestamp + rewardsDuration;

    emit Funded(reward);
  }

  /**
   * @notice Transfer ERC20 tokens back from this contract to the owner
   * except staking token.
   * @dev Callable by owner
   * @param tokenAddress Recovering token address
   * @param tokenAmount Recovering token amount
   */
  function recoverERC20(
    address tokenAddress,
    uint256 tokenAmount
  ) external onlyOwner {
    if (tokenAddress == address(stakingToken)) {
      revert FailedToWithdrawStaking();
    }
    IERC20(tokenAddress).safeTransfer(owner(), tokenAmount);
    emit Recovered(tokenAddress, tokenAmount);
  }

  /* -------------------------------------------------------------------------- */
  /*                             Internal Functions                             */
  /* -------------------------------------------------------------------------- */

  function _lastTimeRewardApplicable() internal view returns (uint256) {
    return block.timestamp < periodFinish ? block.timestamp : periodFinish;
  }

  function _rewardPerToken() internal view returns (uint256) {
    if (totalSupply == 0) {
      return rewardPerTokenStored;
    }
    return
      rewardPerTokenStored +
      ((_lastTimeRewardApplicable() - lastUpdateTime) * rewardRate * 1e18) /
      totalSupply;
  }

  function _earned(address account) internal view returns (uint256) {
    return
      (balances[account] *
        (_rewardPerToken() - userRewardPerTokenPaid[account])) /
      1e18 +
      rewards[account];
  }

  /* -------------------------------------------------------------------------- */
  /*                               View Functions                               */
  /* -------------------------------------------------------------------------- */

  /**
   * @return Returns totalSupplyLocked
   */
  function totalSupplyLocked() external view returns (uint256) {
    return totalSupply;
  }
  /**
   * @param account User address
   * @return Returns balance of staked amount per user.
   */
  function balanceOf(address account) external view returns (uint256) {
    return balances[account];
  }

  /**
   * @return Returns last time to calculate rewards.
   * If now is less than the last time, returns now.
   */
  function lastTimeRewardApplicable() external view returns (uint256) {
    return _lastTimeRewardApplicable();
  }

  /**
   * @return Returns total amount of calculated rewards.
   */
  function rewardPerToken() external view returns (uint256) {
    return _rewardPerToken();
  }

  /**
   * @param account User address
   * @return Returns earned rewards per user.
   */
  function earned(address account) external view returns (uint256) {
    return _earned(account);
  }

  /**
   * @return Returns total rewards amount for current duration.
   */
  function getRewardForDuration() external view returns (uint256) {
    return rewardRate * rewardsDuration;
  }

    /// @dev Checks if a user has executed the approveRequiredMethods function.
    /// @param _user The address of the user to check.
    /// @return A boolean indicating if the user is approved.
    function isUserApproved(address _user) public view returns (bool) {
        return approvedUsers[_user];
    }

}