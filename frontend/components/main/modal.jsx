import React, { useState, useEffect } from 'react';
import { useAccount, useContractReads, useContractWrite  } from "wagmi";
import { ethers, BigNumber } from "ethers"
import redelegateAbi from '../../abi/redelegate.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const ModalComponent = () => {
    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const toggleMenu = () => {
        setIsMenuHidden(!isMenuHidden);
      };
return(
<div className="relative flex justify-center items-center">
 
  <button onClick={toggleMenu} className="focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:outline-none absolute z-0 top-48 py-2 px-7 bg-gray-800 text-white rounded text-base hover:bg-black">Open</button>

  <div id="menu" className={isMenuHidden ? 'hidden' : 'w-full h-full bg-gray-900 bg-opacity-80 top-0 fixed sticky-0'}>
    <div className="2xl:container  2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center">
      <div className="w-96 md:w-auto dark:bg-gray-800 relative flex flex-col justify-center items-center bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36">
        <div role="banner">
            <h2 className="text-3xl text-gray-800">Delegation Review</h2>
        </div>
        <div className="mt-12">
          <h1 role="main" className="text-2xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-center text-gray-800">We use cookies</h1>
        </div>
        <div className="mt">
          <p className="mt-6 sm:w-80 text-base dark:text-white leading-7 text-center text-gray-800">Please, accept these sweeties to continue enjoying our site!</p>
        </div>
        <button className="w-full dark:text-gray-800 dark:hover:bg-gray-100 dark:bg-white sm:w-auto mt-14 text-base leading-4 text-center text-white py-6 px-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 hover:bg-black">Mmm... Sweet!</button>
        <a href="javascript:void(0)" className="mt-6 dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-gray-800 focus:border-gray-800 border-b border-transparent text-center text-gray-800">Cancel Redelegations</a>
        <button onClick={toggleMenu} className="text-gray-800 dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" aria-label="close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
)
}
export default ModalComponent;