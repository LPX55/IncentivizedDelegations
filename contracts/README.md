# Contract Overview

## IRedelegationReward

### Contract
IRedelegationReward : gist-e259420aec8d85ea2219e4154536ad35/contracts/IRedelegationReward.sol

 --- 
### Functions:
### balanceOf

```solidity
function balanceOf(address account) external view returns (uint256)
```

### totalSupplyLocked

```solidity
function totalSupplyLocked() external view returns (uint256)
```

### redelegateTokens

```solidity
function redelegateTokens(string _srcValidatorAddr, string _dstValidatorAddr, uint256 _amount) external returns (int64)
```

### redelegateTokensMultiple

```solidity
function redelegateTokensMultiple(string[] _srcValidatorAddrs, string[] _dstValidatorAddrs, uint256[] _amounts) external
```

### earned

```solidity
function earned(address account) external view returns (uint256)
```

### getRewardForDuration

```solidity
function getRewardForDuration() external view returns (uint256)
```

### lastTimeRewardApplicable

```solidity
function lastTimeRewardApplicable() external view returns (uint256)
```

### rewardPerToken

```solidity
function rewardPerToken() external view returns (uint256)
```

### claim

```solidity
function claim() external
```

## ZeroAmount

```solidity
error ZeroAmount()
```

## WaitToFinish

```solidity
error WaitToFinish()
```

## NotEnoughBalance

```solidity
error NotEnoughBalance()
```

## TooHighReward

```solidity
error TooHighReward()
```

## FailedToWithdrawStaking

```solidity
error FailedToWithdrawStaking()
```

## RedelegationReward

Stakes tokens for a certain duration and gets rewards according to their
staked shares

### Contract
RedelegationReward : gist-e259420aec8d85ea2219e4154536ad35/contracts/RedelegationReward.sol

 --- 
### Modifiers:
### updateReward

```solidity
modifier updateReward(address account)
```

 --- 
### Functions:
### approveRequiredMethods

```solidity
function approveRequiredMethods() public
```

_Approves the required transactions for delegation and withdrawal of staking rewards transactions.
This creates a Cosmos Authorization Grants for the given methods.
This emits an Approval event._

### constructor

```solidity
constructor(address rewardsToken_, uint256 duration) public
```

_Constructor_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| rewardsToken_ | address | Address to rewards ERC20 token |
| duration | uint256 | Reward duration in seconds |

### setRewardsDuration

```solidity
function setRewardsDuration(uint256 duration) external
```

Set rewards duration, only available to set after finish
of previous rewards period.

_Callable by owner_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| duration | uint256 | New rewards duration |

### redelegateTokens

```solidity
function redelegateTokens(string _srcValidatorAddr, string _dstValidatorAddr, uint256 _amount) public returns (int64)
```

_Redelegate the staked tokens from one validator to another_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcValidatorAddr | string | The address of the source validator |
| _dstValidatorAddr | string | The address of the destination validator |
| _amount | uint256 | The amount of tokens to redelegate |

### redelegateTokensMultiple

```solidity
function redelegateTokensMultiple(string[] _srcValidatorAddrs, string[] _dstValidatorAddrs, uint256[] _amounts) public
```

_Redelegate the staked tokens from multiple validators to others_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _srcValidatorAddrs | string[] | The addresses of the source validators |
| _dstValidatorAddrs | string[] | The addresses of the destination validators |
| _amounts | uint256[] | The amounts of tokens to redelegate |

### claim

```solidity
function claim() public
```

Claim rewards tokens, callable only when unpaused.

_Callable only when unpaused_

### fund

```solidity
function fund(uint256 reward) public
```

Fund rewards tokens and re-calculate rewards rate.
Rewards rate will be calculated again from remaining distributable tokens
and awarding rewards tokens.

_Callable only when unpaused and by owner_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| reward | uint256 | Funding rewards token amount |

### recoverERC20

```solidity
function recoverERC20(address tokenAddress, uint256 tokenAmount) external
```

Transfer ERC20 tokens back from this contract to the owner
except staking token.

_Callable by owner_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | Recovering token address |
| tokenAmount | uint256 | Recovering token amount |

### _lastTimeRewardApplicable

```solidity
function _lastTimeRewardApplicable() internal view returns (uint256)
```

### _rewardPerToken

```solidity
function _rewardPerToken() internal view returns (uint256)
```

### _earned

```solidity
function _earned(address account) internal view returns (uint256)
```

### totalSupplyLocked

```solidity
function totalSupplyLocked() external view returns (uint256)
```

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Returns totalSupplyLocked |

### balanceOf

```solidity
function balanceOf(address account) external view returns (uint256)
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | User address |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Returns balance of staked amount per user. |

### lastTimeRewardApplicable

```solidity
function lastTimeRewardApplicable() external view returns (uint256)
```

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Returns last time to calculate rewards. If now is less than the last time, returns now. |

### rewardPerToken

```solidity
function rewardPerToken() external view returns (uint256)
```

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Returns total amount of calculated rewards. |

### earned

```solidity
function earned(address account) external view returns (uint256)
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | User address |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Returns earned rewards per user. |

### getRewardForDuration

```solidity
function getRewardForDuration() external view returns (uint256)
```

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Returns total rewards amount for current duration. |

### isUserApproved

```solidity
function isUserApproved(address _user) public view returns (bool)
```

_Checks if a user has executed the approveRequiredMethods function._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _user | address | The address of the user to check. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | A boolean indicating if the user is approved. |

inherits ReentrancyGuard:
### _reentrancyGuardEntered

```solidity
function _reentrancyGuardEntered() internal view returns (bool)
```

_Returns true if the reentrancy guard is currently set to "entered", which indicates there is a
`nonReentrant` function in the call stack._

inherits Pausable:
### paused

```solidity
function paused() public view virtual returns (bool)
```

_Returns true if the contract is paused, and false otherwise._

### _requireNotPaused

```solidity
function _requireNotPaused() internal view virtual
```

_Throws if the contract is paused._

### _requirePaused

```solidity
function _requirePaused() internal view virtual
```

_Throws if the contract is not paused._

### _pause

```solidity
function _pause() internal virtual
```

_Triggers stopped state.

Requirements:

- The contract must not be paused._

### _unpause

```solidity
function _unpause() internal virtual
```

_Returns to normal state.

Requirements:

- The contract must be paused._

inherits Ownable:
### owner

```solidity
function owner() public view virtual returns (address)
```

_Returns the address of the current owner._

### _checkOwner

```solidity
function _checkOwner() internal view virtual
```

_Throws if the sender is not the owner._

### renounceOwnership

```solidity
function renounceOwnership() public virtual
```

_Leaves the contract without owner. It will not be possible to call
`onlyOwner` functions. Can only be called by the current owner.

NOTE: Renouncing ownership will leave the contract without an owner,
thereby disabling any functionality that is only available to the owner._

### transferOwnership

```solidity
function transferOwnership(address newOwner) public virtual
```

_Transfers ownership of the contract to a new account (`newOwner`).
Can only be called by the current owner._

### _transferOwnership

```solidity
function _transferOwnership(address newOwner) internal virtual
```

_Transfers ownership of the contract to a new account (`newOwner`).
Internal function without access restriction._

inherits IRedelegationReward:

 --- 
### Events:
### Redelegate

```solidity
event Redelegate(address account, uint256 amount)
```

Emitted when user stakes staking token

### CancelRedelegate

```solidity
event CancelRedelegate(address account, uint256 amount)
```

Emited when user unstakes his/her staked token

### Claimed

```solidity
event Claimed(address account, uint256 amount)
```

Emitted when user claim his/her rewards token

### Funded

```solidity
event Funded(uint256 amount)
```

Emitted when owner funds rewards token and restart rewarding session

### RewardsDurationUpdated

```solidity
event RewardsDurationUpdated(uint256 duration)
```

Emitted when rewards duration has been updated

### Recovered

```solidity
event Recovered(address token, uint256 amount)
```

Emitted when owner recovered tokens from this contract

inherits ReentrancyGuard:
inherits Pausable:
### Paused

```solidity
event Paused(address account)
```

_Emitted when the pause is triggered by `account`._

### Unpaused

```solidity
event Unpaused(address account)
```

_Emitted when the pause is lifted by `account`._

inherits Ownable:
### OwnershipTransferred

```solidity
event OwnershipTransferred(address previousOwner, address newOwner)
```

inherits IRedelegationReward:

## STAKING_PRECOMPILE_ADDRESS

```solidity
address STAKING_PRECOMPILE_ADDRESS
```

## STAKING_CONTRACT

```solidity
contract StakingI STAKING_CONTRACT
```

## MSG_DELEGATE

```solidity
string MSG_DELEGATE
```

## MSG_UNDELEGATE

```solidity
string MSG_UNDELEGATE
```

## MSG_REDELEGATE

```solidity
string MSG_REDELEGATE
```

## MSG_CANCEL_UNDELEGATION

```solidity
string MSG_CANCEL_UNDELEGATION
```

## CommissionRates

```solidity
struct CommissionRates {
  uint256 rate;
  uint256 maxRate;
  uint256 maxChangeRate;
}
```

## Commission

```solidity
struct Commission {
  struct CommissionRates commissionRates;
  uint256 updateTime;
}
```

## Validator

```solidity
struct Validator {
  string operatorAddress;
  string consensusPubkey;
  bool jailed;
  enum BondStatus status;
  uint256 tokens;
  uint256 delegatorShares;
  string description;
  int64 unbondingHeight;
  int64 unbondingTime;
  uint256 commission;
  uint256 minSelfDelegation;
}
```

## RedelegationResponse

```solidity
struct RedelegationResponse {
  struct Redelegation redelegation;
  struct RedelegationEntryResponse[] entries;
}
```

## Redelegation

```solidity
struct Redelegation {
  struct RedelegationEntry[] entries;
}
```

## RedelegationEntryResponse

```solidity
struct RedelegationEntryResponse {
  struct RedelegationEntry redelegationEntry;
  uint256 balance;
}
```

## RedelegationEntry

```solidity
struct RedelegationEntry {
  int64 creationHeight;
  int64 completionTime;
  uint256 initialBalance;
  uint256 sharesDst;
}
```

## UnbondingDelegationEntry

```solidity
struct UnbondingDelegationEntry {
  int64 creationHeight;
  int64 completionTime;
  uint256 initialBalance;
  uint256 balance;
}
```

## PageRequest

```solidity
struct PageRequest {
  bytes key;
  uint64 offset;
  uint64 limit;
  bool countTotal;
  bool reverse;
}
```

## BondStatus

```solidity
enum BondStatus {
  Unspecified,
  Unbonded,
  Unbonding,
  Bonded
}
```

## StakingI

_The interface through which solidity contracts will interact with staking.
We follow this same interface including four-byte function selectors, in the precompile that
wraps the pallet._

### Contract
StakingI : gist-e259420aec8d85ea2219e4154536ad35/contracts/Staking.sol

The interface through which solidity contracts will interact with staking.
We follow this same interface including four-byte function selectors, in the precompile that
wraps the pallet.

 --- 
### Functions:
### delegate

```solidity
function delegate(address delegatorAddress, string validatorAddress, uint256 amount) external returns (int64 completionTime)
```

_Defines a method for performing a delegation of coins from a delegator to a validator._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegatorAddress | address | The address of the delegator |
| validatorAddress | string | The address of the validator |
| amount | uint256 | The amount of the Coin to be delegated to the validator |

### undelegate

```solidity
function undelegate(address delegatorAddress, string validatorAddress, uint256 amount) external returns (int64 completionTime)
```

_Defines a method for performing an undelegation from a delegate and a validator._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegatorAddress | address | The address of the delegator |
| validatorAddress | string | The address of the validator |
| amount | uint256 | The amount to be undelegated from the validator |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| completionTime | int64 | The time when the undelegation is completed |

### redelegate

```solidity
function redelegate(address delegatorAddress, string validatorSrcAddress, string validatorDstAddress, uint256 amount) external returns (int64 completionTime)
```

_Defines a method for performing a redelegation
of coins from a delegator and source validator to a destination validator._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegatorAddress | address | The address of the delegator |
| validatorSrcAddress | string | The validator from which the redelegation is initiated |
| validatorDstAddress | string | The validator to which the redelegation is destined |
| amount | uint256 | The amount to be redelegated to the validator |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| completionTime | int64 | The time when the redelegation is completed |

### cancelUnbondingDelegation

```solidity
function cancelUnbondingDelegation(address delegatorAddress, string validatorAddress, uint256 amount, uint256 creationHeight) external returns (int64 completionTime)
```

_Allows delegators to cancel the unbondingDelegation entry
and to delegate back to a previous validator._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegatorAddress | address | The address of the delegator |
| validatorAddress | string | The address of the validator |
| amount | uint256 | The amount of the Coin |
| creationHeight | uint256 | The height at which the unbonding took place |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| completionTime | int64 | The time when the cancellation of the unbonding delegation is completed |

### delegation

```solidity
function delegation(address delegatorAddress, string validatorAddress) external view returns (uint256 shares, struct Coin balance)
```

_Queries the given amount of the bond denomination to a validator._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegatorAddress | address | The address of the delegator. |
| validatorAddress | string | The address of the validator. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| shares | uint256 | The amount of shares, that the delegator has received. |
| balance | struct Coin | The amount in Coin, that the delegator has delegated to the given validator. |

### unbondingDelegation

```solidity
function unbondingDelegation(address delegatorAddress, string validatorAddress) external view returns (struct UnbondingDelegationEntry[] entries)
```

_Returns the delegation shares and coins, that are currently
unbonding for a given delegator and validator pair._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegatorAddress | address | The address of the delegator. |
| validatorAddress | string | The address of the validator. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| entries | struct UnbondingDelegationEntry[] | The delegations that are currently unbonding. |

### validator

```solidity
function validator(string validatorAddress) external view returns (struct Validator[] validators)
```

_Queries validator info for a given validator address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| validatorAddress | string | The address of the validator. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| validators | struct Validator[] | The validator info for the given validator address. |

### validators

```solidity
function validators(string status, struct PageRequest pageRequest) external view returns (struct Validator[] validators, struct PageResponse pageResponse)
```

_Queries all validators that match the given status._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| status | string | Enables to query for validators matching a given status. |
| pageRequest | struct PageRequest | Defines an optional pagination for the request. |

### redelegation

```solidity
function redelegation(address delegatorAddress, string srcValidatorAddress, string dstValidatorAddress) external view returns (struct RedelegationEntry[] entries)
```

_Queries all redelegations from a source to a destination validator for a given delegator._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegatorAddress | address | The address of the delegator. |
| srcValidatorAddress | string | Defines the validator address to redelegate from. |
| dstValidatorAddress | string | Defines the validator address to redelegate to. |
