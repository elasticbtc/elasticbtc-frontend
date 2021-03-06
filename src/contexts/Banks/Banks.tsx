import React, { useCallback, useEffect, useState } from 'react';
import { Bank } from '../../basis-cash';
import config, { bankDefinitions } from '../../config';
import useBasisCash from '../../hooks/useBasisCash';
import Context from './context';

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const basisCash = useBasisCash();

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!basisCash.isUnlocked) continue;

        try {
          // only show pools staked by user
          const balance = await basisCash.stakedBalanceOnBank(
            bankInfo.contract,
            basisCash.myAccount,
          );
          if (balance.lte(0)) {
            continue;
          }
        } catch (e) {
          const nextErr = new Error(`could not fetch pool ${bankInfo.contract}: ${e.message}`);
          nextErr.stack = e.stack;
          throw nextErr;
        }
      }
      try {
        banks.push({
          ...bankInfo,
          address: config.deployments[bankInfo.contract].address,
          depositToken: basisCash.externalTokens[bankInfo.depositTokenName],
          earnToken: bankInfo.earnTokenName == 'EBTC' ? basisCash.EBTC : basisCash.EBS,
        });
      } catch (e) {
        const nextErr = new Error(`could not create pool ${bankInfo.contract}: ${e.message}`);
        nextErr.stack = e.stack;
        throw nextErr;
      }
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [basisCash, basisCash?.isUnlocked, setBanks]);

  useEffect(() => {
    if (basisCash) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.message}`, err));
    }
  }, [basisCash, basisCash?.isUnlocked, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;
