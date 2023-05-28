import { ethers } from "ethers";
import { useState } from "react";
import Router, { useRouter } from "next/router";

import { ModalComponent } from './modal';
import redelegateAbi from '../../abi/redelegate.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const CONTRACT_ABI = redelegateAbi; 

function RedelegateComponent({srcValidatorAddrs, dstValidatorAddrs, amounts}) {
    const router = useRouter();

    const [isMenuHidden, setIsMenuHidden] = useState(false);
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function redelegateTokensMultiple() {
        setLoading(true);
        setError(null);
        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.enable();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);


            try {
                const tx = await contract.redelegateTokensMultiple(srcValidatorAddrs, dstValidatorAddrs, amounts);
                setTransaction(tx);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        } else {
            console.log("Please install MetaMask!");
        }
    }
    const handleClick = () => {
        redelegateTokensMultiple();
    }
    const toggleMenu = () => {
        setIsMenuHidden(!isMenuHidden);
      };

    return (
        <div>
            <div className="relative flex justify-center items-center">

                <div id="menu" className={isMenuHidden ? 'hidden' : 'w-full h-full bg-gray-900 bg-opacity-80 top-0 fixed sticky-0'}>
                <div className="2xl:container  2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center">
                  <div className="w-96 md:w-auto dark:bg-gray-800 relative flex flex-col justify-center items-center bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36">
                    <div role="banner">
                        <h2 className="text-3xl text-gray-800">Delegation Review</h2>
                    </div>
                    <div className="my-8">
                      <h1 role="main" className="text-2xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-center text-gray-800">
                       </h1>
                     
                       <h1 className="text-gray-800">{transaction && (
                <div>
                    <h2>Transaction Details:</h2>
                    <p>Transaction Hash: {transaction.hash}</p>
                    <p>Block Number: {transaction.blockNumber}</p>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error:</h2>
                    <p>{error}</p>
                </div>
            )}</h1>
                    </div>
                  
                    <button className="focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:outline-none z-0 py-2 px-7 bg-gray-800 text-white rounded text-base hover:bg-black" onClick={handleClick}>
                    {loading ? "Processing..." : "Redelegate Tokens"}
            </button>
                    <a onClick={() => router.back()} className="mt-3 dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-gray-800 focus:border-gray-800 border-b border-transparent text-center text-gray-800">Go Back</a>
                    <button onClick={() => router.back()} className="text-gray-800 dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" aria-label="close">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
           
            
</div>
        </div>
    );
}

export default RedelegateComponent;