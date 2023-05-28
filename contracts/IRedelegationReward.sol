// SPDX-License-Identifier: LGPL-v3
pragma solidity >=0.8.17;

interface IRedelegationReward {
  function balanceOf(address account) external view returns (uint256);

  function totalSupplyLocked() external view returns (uint256);

  function redelegateTokens(
      string memory _srcValidatorAddr,
      string memory _dstValidatorAddr,
      uint256 _amount
  ) external returns (int64);

  function redelegateTokensMultiple(
      string[] memory _srcValidatorAddrs,
      string[] memory _dstValidatorAddrs,
      uint256[] memory _amounts
  ) external;
  
  function earned(address account) external view returns (uint256);

  function getRewardForDuration() external view returns (uint256);

  function lastTimeRewardApplicable() external view returns (uint256);

  function rewardPerToken() external view returns (uint256);

  function claim() external;

}