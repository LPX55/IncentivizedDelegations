import React, { useState, useEffect } from 'react';
import { useAccount, useContractReads, useContractWrite  } from "wagmi";
import { ethToEvmos } from "@evmos/address-converter";
import { HeaderStats } from "./stats";
import { toast } from "react-toastify";
import { Table, Tooltip } from "flowbite-react";

import Router, { useRouter } from "next/router";

import { ethers, BigNumber } from "ethers"
import redelegateAbi from '../../abi/redelegate.json';

const ValidatorsTable = () => {
  const router = useRouter();
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const { isSuccess, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: redelegateAbi,
    functionName: 'approveRequiredMethods',
  })
 
  const [validators, setValidators] = useState([]);
  const [totalShares, setTotalShares] = useState(0);
  const { address, isConnecting, isDisconnected } = useAccount();
  const [evmosAccount, setEvmosAccount] = useState('');
  const [delegations, setDelegations] = useState({});
  const [redelegations, setRedelegations] = useState({});
  const [checkedDelegations, setCheckedDelegations] = useState({});
  const [totalRedelegations, setTotalRedelegations] = useState(0);
  const [checkedDelegationsTo, setCheckedDelegationsTo] = useState({});
  const [isApproved, setIsApproved] = useState(false);
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: '0x9A8c92273dC58f7F6Ebb20Aadac94D1bCd5784b4',
        abi: redelegateAbi,
        functionName: 'isUserApproved',
        args: [address],
      }
    ],
    allowFailure: true,
    cacheTime: 30_000,
    onSettled(data) {
      console.log('Settled', data[0])
      if(!isError){
        setIsApproved(data[0])
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountUrl = `https://rest.bd.evmos.dev:1317/evmos/evm/v1/cosmos_account/${address}`; // replace {address} with actual address
        const accountResponse = await fetch(accountUrl);
        const accountData = await accountResponse.json();
        
        const evmosAddr = ethToEvmos(address)
        setEvmosAccount(evmosAddr);
        console.log(checkedDelegations)
        const validatorsUrl = 'https://rest.bd.evmos.dev:1317/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED';
        const validatorsResponse = await fetch(validatorsUrl);
        const validatorsData = await validatorsResponse.json();
  
        const sortedData = validatorsData.validators.sort((a, b) => parseFloat(b.delegator_shares) - parseFloat(a.delegator_shares));
        const total = sortedData.reduce((sum, validator) => sum + parseFloat(validator.delegator_shares), 0);
  
        setTotalShares(total);
        setValidators(sortedData);
  
        const delegationsUrl = `https://rest.bd.evmos.dev:1317/cosmos/staking/v1beta1/delegations/${evmosAddr}`;
        const delegationsResponse = await fetch(delegationsUrl);
        const delegationsData = await delegationsResponse.json();
        const delegations = {};
        if (delegationsData && Array.isArray(delegationsData.delegation_responses)) {
          delegationsData.delegation_responses.forEach(response => {
          delegations[response.delegation.validator_address] = response.balance.amount;
        });
        }
        const redelegationsUrl = `https://rest.bd.evmos.dev:1317/cosmos/staking/v1beta1/delegators/${evmosAddr}/redelegations`
        const redelegationsResponse = await fetch(redelegationsUrl);
        const redelegationsData = await redelegationsResponse.json();
        const redelegations = {};
        if (redelegationsData && Array.isArray(redelegationsData.redelegation_responses)) {
          redelegationsData.redelegation_responses.forEach(response => {
            redelegations[response.redelegation.validator_dst_address] = response.entries;
          });
        }
        setDelegations(delegations);
        setRedelegations(redelegations)
        console.log(redelegations);

      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  const getRowColor = (index, total) => {
    const quintile = Math.floor((index / total) * 5);
    switch (quintile) {
      case 0: return 'bg-red-200';
      case 1: return 'bg-orange-200';
      case 2: return 'bg-yellow-200';
      case 3: return 'bg-green-200';
      case 4: return 'bg-blue-200';
      default: return '';
    }
  };
  const throwError = () => toast('Error - Make sure you are connected to Evmos testnet and the selected delegations are not in a redelegation state already.', { hideProgressBar: true, autoClose: 3000, type: 'error' })
  const handleSubmit = (event) => {
    if(!address){
      throwError();
      return
    }
    event.preventDefault();
    localStorage.setItem('srcVal', JSON.stringify(checkedDelegations));
    localStorage.setItem('dstVal', JSON.stringify(checkedDelegationsTo));
    router.push('/review')
  };
  return (
    <>
  <div className="w-full mx-auto py-2">
   <HeaderStats />
  </div>

    <Table hoverable className="min-w-[72rem] dark w-full rounded-xl relative border-zinc-500">
    <Table.Head className=" border-zinc-500">
        <Table.HeadCell className="py-2 text-center w-[40px]">#</Table.HeadCell>
        <Table.HeadCell className="border-x border-zinc-600 text-left max-w-[8rem]">Validator</Table.HeadCell>
        <Table.HeadCell className="border-x border-zinc-600">Voting<br />Power</Table.HeadCell>
        <Table.HeadCell className="border-x max-w-30 border-zinc-600 px-2 py-2 text-left">Current<br />Delegation</Table.HeadCell>
        <Table.HeadCell className="border-x w-[20rem] border-zinc-600">After<br />Redelegation</Table.HeadCell>
        <Table.HeadCell className="px-2 py-2 text-center">🔁</Table.HeadCell>
    </Table.Head>
    <Table.Body className="rounded-lg divide-y">
      {validators.map((validator, index) => {
        const percentage = ((parseFloat(validator.delegator_shares) / totalShares) * 100).toFixed(2);
        const delegatedAmount = delegations[validator.operator_address] ? delegations[validator.operator_address].toString() * (10 ** -18) : '0';
        const redelegationProgress = redelegations[validator.operator_address] ? true : false;
        const redelegationTime = redelegationProgress ? redelegations[validator.operator_address][0].redelegation_entry.completion_time : '';
        const numItems = Object.keys(checkedDelegationsTo).length;


        return (
          <Table.Row key={index} rank={index} addr={validator.operator_address} className="border-zinc-600 bg-gray-800">
            <Table.Cell className={`text-center w-[40px] ${getRowColor(index, validators.length)} whitespace-nowrap font-medium text-xs text-gray-800`}>
              {index + 1}
            </Table.Cell>

            <Table.Cell className="py-2 max-w-[8rem] whitespace-nowrap overflow-clip text-ellipsis	font-medium text-white">{validator.description.moniker}</Table.Cell>
            <Table.Cell className="font-medium text-white">{percentage}%</Table.Cell>
            <Table.Cell className={`max-w-30 whitespace-nowrap font-medium text-white`}>
              <span className={`${checkedDelegations[validator.operator_address] ? 'line-through' : ''} inline text-xs`}>
                {Number(delegatedAmount).toFixed(2)} tEVMOS
              </span>
              {redelegationProgress ? (
              
              <span className="inline-flex ml-1">
              <Tooltip content={`Redelegation in progress. You may redelegate additional tokens TO this validator but cannot redelegate FROM this validator until ${redelegationTime}`} className="inline max-w-[28rem] whitespace-normal"> ⌛</Tooltip>
              </span>
              
            ) : (
              <></>
            )}
            </Table.Cell>
            <Table.Cell className="font-medium text-white text-xs">
            {checkedDelegations[validator.operator_address] && '0'}
            {checkedDelegationsTo[validator.operator_address] && ((totalRedelegations / numItems).toFixed(2) + ' tEVMOS')}
            
            </Table.Cell>
            
            <Table.Cell className="self-center text-center whitespace-nowrap font-medium text-white">
            {delegations[validator.operator_address] && delegations[validator.operator_address] > 0 && !redelegationProgress ? (
                <>
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" 
            checked={!!checkedDelegations[validator.operator_address]}
            
            onChange={(e) => {
              setCheckedDelegations(prev => ({
                ...prev,
                [validator.operator_address]: e.target.checked ? delegations[validator.operator_address] : null
              }));
              setTotalRedelegations(totalRedelegations + delegatedAmount);
            }} />
            <span className="text-xs inline ml-1.5">⬅ REDELEGATE FROM</span>

            </>
          ): (
            <>
            <span className="text-xs inline mr-1.5">REDELEGATE TO ➡</span>
            <input className="h-4 w-4 rounded border-gray-300" 
            type="checkbox" id="Row1" 
            onChange={(e) => {
              setCheckedDelegationsTo(prev => ({
                ...prev,
                [validator.operator_address]: e.target.checked ? index : null
              }));
            }}
            />
              </>
          )
          } 
            </Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>
  </Table>
    { isDisconnected ? (
      <h1 className="my-8 font-bold text-3xl">Connect to Evmos Testnet</h1>
    ) : (
      <></>
    )}
    <div className="mt-4 flex gap-4 ">
      { !isApproved && address && !isConnecting ? (
    <btn className="focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:outline-none relative z-0 py-2 px-7 bg-gray-800 text-white rounded text-base hover:cursor-pointer hover:bg-black"
    disabled={!write} onClick={() => write?.()}><strong className="font-medium">Approve Contract</strong></btn>
      ) : ( 
    <btn onClick={handleSubmit} type="button" className="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-center cursor-pointer h-12 border-2 border-solid py-0 px-6 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-[#ed4e33] text-white border-[#e7583e] hover:text-[#dddddd] focus:text-[#ed4e33]">Review Redelegations</btn>

      ) }
    
                
              
           
            
            </div>
    </>
  );
};

export default ValidatorsTable;