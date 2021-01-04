import { BigNumber } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import ERC20 from '../basis-cash/ERC20';
import config from '../config';
import useBasisCash from './useBasisCash';

const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    setBalance(await token.balanceOf(basisCash.myAccount));
  }, [basisCash.myAccount, token]);

  useEffect(() => {
    if (basisCash?.isUnlocked) {
      fetchBalance().catch((err) =>
        console.error(`Failed to fetch token balance: ${err.stack}`),
      );
      let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [basisCash, fetchBalance, token]);

  return balance;
};

export default useTokenBalance;
