import React, { useState, useEffect } from 'react';
import { useAccount, useContractReads, useContractWrite  } from "wagmi";
import { ethers, BigNumber } from "ethers"
import redelegateAbi from '../../abi/redelegate.json';

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
    const endTimeFmt = ethers.utils.formatEther(endTime);

    setContractStats({
      poolVal: poolValueFmt,
      totalLocked: totalSupplyFmt,
      finishTime: endTimeFmt
    });


  },
});

return(
    
    <div className="mb-8">
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col rounded-lg bg-zinc-700 px-4 py-8 text-center dark:bg-blue-700">
          <dt className="order-last text-lg font-medium text-gray-200" >
            Current Round Pool
          </dt>
          <dd className="text-3xl font-medium text-[#ed4e33] md:text-2xl">
            {Number(contractStats.poolVal).toFixed(2)} EVMOS
          </dd>
        </div>

        <div
          className="flex flex-col rounded-lg bg-zinc-700 px-4 py-8 text-center dark:bg-blue-700"
        >
          <dt
            className="order-last text-lg font-medium text-gray-200"
          >
            Round-End Epoch Time
          </dt>

          <dd className="text-3xl font-medium text-[#ed4e33] md:text-2xl">
          {Number(contractStats.finishTime)}
          </dd>
        </div>

        <div
          className="flex flex-col rounded-lg bg-zinc-700 px-4 py-8 text-center dark:bg-blue-700"
        >
          <dt
            className="order-last text-lg font-medium text-gray-200"
          >
            Total Redelegated
          </dt>

          <dd className="text-3xl font-medium text-[#ed4e33] md:text-2xl">
          {Number(contractStats.totalLocked).toFixed(2)} EVMOS
          </dd>
        </div>
      </dl>
    </div>
)
}

export default HeaderStats;