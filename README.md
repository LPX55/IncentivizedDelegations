# IncentivizedDelegations

Incentivizing Redelegations for Greater Network Decentralization and Security

- **Deployment (9000)** - `0x9A8c92273dC58f7F6Ebb20Aadac94D1bCd5784b4`
- **Round two initiation** - [transaction](https://testnet.escan.live/tx/0xf269e890ecdba5b34dd4ff8dd862fd61c990cbf0a5495732c7cc24bc990ee0cc)

## Project Summary

This project takes on the critical challenge of deteriorating decentralization within Delegated Proof of Stake (DPoS) and similar blockchains in which disapproprotionate amounts of power can be gained by a select few. We have been observing an alarming accumulation of power at an accelerated rate on most Cosmos chains - while not necessarily malicious, a network should have tools at disposal to protect its decentralized nature. With compounding rewards, the disparity only continues to grow.

![image](https://github.com/LPX55/IncentivizedDelegations/assets/16395727/ffe45866-f8d6-4b1d-8514-e69a10616f7f)


This project is a novel proof of concept that seeks to reverse this trend by incentivizing users to re-delegate from top-tier validators to mid-tier and lower-tier validators. This re-distribution of power is not only healthy for the network but is also beneficial and encouraging for the validators in the lower tiers to continue to validate the network and contribute.

At the heart of our project is a smart contract that amalgamates the effective principles of time-vested reward contracts, popular within Ethereum DeFi, and the forthcoming "EVM Extensions" currently live on Evmos testnet. The smart contract operates by maintaining a pool of tokens which are distributed as rewards to users in accordance with the size and duration of their re-delegations.

For management of contract features such as period lengths and reward amounts, the contract is designed to ideally be owned by a multisig wallet like Gnosis Safe. This PoC may one day serve a real purpose in the Evmos governance initiatives. 

The project represents a practical and viable approach to address the pressing issue of growing centralization in PoS and DPoS blockchains. Through incentivized re-delegation, we aim to uphold the original spirit of blockchain: decentralization.

## Contracts Overview

**Warning:** Unaudited contract not meant for production use nor written with security in mind.

Full view of contract and documentation of contract [available here.](https://github.com/LPX55/IncentivizedDelegations/tree/main/contracts)

### SimlpeStaking.sol Improvements

Added Functions:

- `redelegateTokensMultiple`: proof of concept to show capability of expanding provided example functions to accept arrays
- `isUserApproved`: added mapping to keep track of users that have already approved the contract

## To-Do

- Add rewards status and claiming page
- Add logic to check that the destination validator is indeed in a lower ranking
- Add logic to allow users to re-delegate only a portion of existing delegations
- Add logic for re-delegation distribution weights (currently divided evenly)
- UI: Show existing ongoing re-delegations and time remaining
- UI: Improve TX status reports
- UI: Improve redelegation screen and visual cues
