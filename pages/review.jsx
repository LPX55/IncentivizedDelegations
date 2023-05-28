import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import RedelegateComponent from "../components/main/redelegate";
import { HeaderStats } from "../components/main/stats";

function prepareRedelegationData(srcVal, dstVal) {
  // Create arrays for the source and destination validator addresses and the amounts
  const srcValidatorAddrs = [];
  const dstValidatorAddrs = [];
  const amounts = [];

  // Get the keys of srcVal and dstVal as arrays
  const srcKeys = Object.keys(srcVal);
  const dstKeys = Object.keys(dstVal);

  for (let i = 0; i < srcKeys.length; i++) {
    // Get the srcKey and the addresses to which the delegation should be split
    const srcKey = srcKeys[i];
    const dstKeysToSplit = dstKeys.filter((_, index) => index % srcKeys.length === i);

    // Calculate the amount to delegate to each address
    const numAddresses = dstKeysToSplit.length;
    const amountPerAddress = ethers.BigNumber.from(srcVal[srcKey]).div(numAddresses);

    // Add the data to the arrays
    for (let j = 0; j < numAddresses; j++) {
      const dstKey = dstKeysToSplit[j];
      srcValidatorAddrs.push(srcKey);
      dstValidatorAddrs.push(dstKey);
      amounts.push(amountPerAddress.toString());
    }
  }

  return { srcValidatorAddrs, dstValidatorAddrs, amounts };
}


function SumArrayValues() {
  const [sum, setSum] = useState(0);
  const [passData, setPassData] = useState({});

  useEffect(() => {
      const srcVal = JSON.parse(localStorage.getItem('srcVal'));
      const dstVal = JSON.parse(localStorage.getItem('dstVal'));
      const data = srcVal;
      const redelegationData = prepareRedelegationData(srcVal, dstVal);
      setPassData(redelegationData);
      console.log(passData);
      console.log(redelegationData);
    let total = ethers.BigNumber.from(0);

    for (let key in data) {
      total = total.add(ethers.BigNumber.from(data[key]));
    }

    setSum(ethers.utils.formatEther(total));
    console.log(sum)
  }, []);

  return (
    <div className="w-full mx-auto py-2">
      <main className={styles.main}>
      <HeaderStats />

        <RedelegateComponent srcValidatorAddrs={passData.srcValidatorAddrs} dstValidatorAddrs={passData.dstValidatorAddrs} amounts={passData.amounts} />
      </main>
    </div>
  );
}

export default SumArrayValues;