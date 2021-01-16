import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import Button from '../../components/Button';
import LaunchCountdown from '../../components/LaunchCountdown';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import config from '../../config';
import Bank from '../Bank';
import BankCards from './BankCards';

const Banks: React.FC = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();

  const isLaunched = Date.now() >= config.baseLaunchDate.getTime();
  if (!isLaunched) {
    return (
      <Switch>
        <Page>
          <PageHeader
            icon={'🏦'}
            title="Pick a Bank."
            subtitle="Earn Elastic BTC Shares by providing liquidity"
          />
          <LaunchCountdown
            deadline={config.baseLaunchDate}
            description="Elastic BTC is launching very soon!"
            descriptionLink="https://medium.com/elasticbtc"
          />
        </Page>
      </Switch>
    );
  }

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          {!!account ? (
            <>
              <PageHeader
                icon={'🏦'}
                title="Pick a Bank."
                subtitle="Earn Elastic BTC Shares by providing liquidity"
              />

              <BankCards />
            </>
          ) : (
            <Center>
              <Button onClick={() => connect('injected')} text="Unlock Wallet" />
            </Center>
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Banks;
