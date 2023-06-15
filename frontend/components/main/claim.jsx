import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite  } from "wagmi";
import { ethers, BigNumber } from "ethers"
import redelegateAbi from '../../abi/redelegate.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const ClaimRewards = () => {


const [userClaimable, setUserClaimable] = useState({});

const contractRead = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: redelegateAbi,
    functionName: 'balanceOf',
    args: ['0xc0f316E58DBB0A203b5B5808adc51a8D39abCdA0'],
    cacheTime: 25_000,
    onSettled(data, error) {
    console.log('Settled', { data, error })
   
    const claimable = ethers.BigNumber.from(data._hex);
    const claimableBalance = ethers.utils.formatEther(claimable);
    console.log(claimable)
    console.log(claimableBalance)

    setUserClaimable(claimableBalance);
  },
});

return(Number(userClaimable).toFixed(2))

}


export default ClaimRewards;