import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react';
import { useAccount, useContractReads, useContractWrite  } from "wagmi";
import { ClaimRewards } from "./claim";
import { ethers, BigNumber } from "ethers";
import redelegateAbi from '../../abi/redelegate.json';
import {BsQuestionCircleFill} from "react-icons/bs"
import { Tooltip } from 'flowbite-react';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const HeaderStats = () => {

const [contractStats, setContractStats] = useState({ poolVal: '', totalLocked: '', finishTime: '' });

const { data, isError, isLoading } = useContractReads({
  contracts: [
    {
      address: CONTRACT_ADDRESS,
      abi: redelegateAbi,
      functionName: 'getRewardForDuration',
    },
    {
      address: CONTRACT_ADDRESS,
      abi: redelegateAbi,
      functionName: 'totalSupplyLocked',
    },
    {
      address: CONTRACT_ADDRESS,
      abi: redelegateAbi,
      functionName: 'periodFinish',
    },
  ],
  allowFailure: true,
  cacheTime: 30_000,
  onSettled(data) {
    console.log('Settled', data)

    const poolValue = ethers.BigNumber.from(data[0]);
    const totalSupply = ethers.BigNumber.from(data[1]);
    const endTime = ethers.FixedNumber.from(data[2]);

    const poolValueFmt = ethers.utils.formatEther(poolValue);
    const totalSupplyFmt = ethers.utils.formatEther(totalSupply);
    const endTimeFmt = ethers.utils.formatEther(endTime) * 1000;
    const humanTime = new Intl.DateTimeFormat('en-US', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(endTimeFmt)
    setContractStats({
      poolVal: poolValueFmt,
      totalLocked: totalSupplyFmt,
      finishTime: humanTime
    });


  },
});

return(
    
  <div className="mb-8">
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Card className="max-w-sm bg-zinc-700 dark border-none text-center">
              <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
      Current Round Rewards
  </h5>
              <p className="text-3xl font-medium text-[#ed4e33] md:text-lg">
              {Number(contractStats.poolVal).toFixed(2)} tEVMOS
              </p>
          </Card>
          <Card className="max-w-sm bg-zinc-700 dark border-none text-center">
              <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Next Round Begins
              </h5>
              <p className="text-3xl font-medium text-[#ed4e33] md:text-lg">
              {(contractStats.finishTime)}
              </p>
          </Card>
          <Card className="max-w-sm bg-zinc-700 dark border-none text-center">
              <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Total Redelegated
              </h5>
              <p className="text-3xl font-medium text-[#ed4e33] md:text-lg">
              {Number(contractStats.totalLocked).toFixed(2)} tEVMOS
              </p>
          </Card>
          <Card className="max-w-sm bg-zinc-700 dark border-none text-center">
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              
                Claimable 
                <Tooltip content="Placeholder for now, checks contract for claimable amount for address 0xc0f316E58DBB0A203b5B5808adc51a8D39abCdA0" className="inline-block  text-sm"><BsQuestionCircleFill className="text-base ml-1"/></Tooltip>
              
            </h5>
              <p className="text-3xl font-medium text-[#ed4e33] md:text-xl">
              <ClaimRewards /> tEVMOS 
              </p>
          </Card>
      </dl>
  </div>
)
}

export default HeaderStats;