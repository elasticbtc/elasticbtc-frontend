import { BigNumber } from 'ethers';

export const DECIMALS_8 = BigNumber.from(10).pow(8);

export const BOND_REDEEM_PRICE = 1.05;
export const BOND_REDEEM_PRICE_BN = DECIMALS_8.mul(105).div(100);
