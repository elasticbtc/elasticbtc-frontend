import { BigNumber, utils } from 'ethers';

export const getDisplayBalance = (balance: BigNumber, decimals = 18, fractionDigits = 3) => {
  const number = getBalance(balance, decimals);
  if (number !== 0 && number < 1e-2) {
    return number.toExponential(fractionDigits);
  }
  return number.toFixed(fractionDigits);
};

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return getDisplayBalance(balance, decimals);
};

export const getExactDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return utils.formatUnits(balance, decimals);
};

export function getBalance(balance: BigNumber, decimals: number = 18): number {
  return parseFloat(utils.formatUnits(balance, decimals));
}
