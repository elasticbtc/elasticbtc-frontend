import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import { Bank as BankEntity } from '../../basis-cash';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import config from '../../config';
import useBank from '../../hooks/useBank';
import useRedeem from '../../hooks/useRedeem';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';

const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));

  const { bankId } = useParams();
  const bank = useBank(bankId);

  const { account } = useWallet();
  const { onRedeem } = useRedeem(bank);

  return account && bank ? (
    <>
      <PageHeader
        icon="🏦"
        subtitle={`Deposit ${bank?.depositTokenName} and earn ${bank?.earnTokenName}`}
        title={bank?.name}
      />
      {bank.name.toLowerCase().includes('badger') && (
        <StyledBanner>
          <StyledCardWrapper>
            <Card>
              <CardContent>
                Sorry, we messed up the units for this pool. The max deposit is 0.00000002
                BADGER per address.
              </CardContent>
            </Card>
          </StyledCardWrapper>
        </StyledBanner>
      )}
      <Spacer />
      <StyledBank>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest bank={bank} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake bank={bank} />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        {bank.depositTokenName.includes('LP') && <LPTokenHelpText bank={bank} />}
        <Spacer size="lg" />
        <div>
          <Button onClick={onRedeem} text="Settle & Withdraw" />
        </div>
        <Spacer size="lg" />
      </StyledBank>
    </>
  ) : !bank ? (
    <BankNotFound />
  ) : (
    <UnlockWallet />
  );
};

const LPTokenHelpText: React.FC<{ bank: BankEntity }> = ({ bank }) => {
  let pairName: string;
  let uniswapUrl: string;
  if (bank.depositTokenName.includes('EBTC')) {
    pairName = 'EBTC-WBTC pair';
    uniswapUrl = `https://app.uniswap.org/#/add/${config.deployments.Cash.address}/${config.externalTokens.WBTC[0]}`;
  } else {
    pairName = 'EBS-WBTC pair';
    uniswapUrl = `https://app.uniswap.org/#/add/${config.deployments.Share.address}/${config.externalTokens.WBTC[0]}`;
  }
  return (
    <StyledLink href={uniswapUrl} target="_blank">
      {`🦄  Provide liquidity to ${pairName} on Uniswap  🦄`}
    </StyledLink>
  );
};

const BankNotFound = () => {
  return (
    <Center>
      <PageHeader
        icon="🏚"
        title="Not Found"
        subtitle="You've hit a bank just robbed by unicorns."
      />
    </Center>
  );
};

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center>
      <Button onClick={() => connect('injected')} text="Unlock Wallet" />
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledUniswapLPGuide = styled.div`
  margin: -24px auto 48px;
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledBanner = styled.div`
  color: #E57373;
  width: 800px;
`;

export default Bank;
