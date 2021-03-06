import React from 'react';
import styled from 'styled-components';
import config from '../../../config';

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink href={buyBAS} target="_blank">
        Get EBS
      </StyledLink>
      <StyledLink href={buyBAC} target="_blank">
        Get EBTC
      </StyledLink>
      <StyledLink href="https://github.com/ElasticBTC" target="_blank">
        GitHub
      </StyledLink>
      {/* <StyledLink href="https://twitter.com/BasisCash" target="_blank">
        Twitter
      </StyledLink>
      <StyledLink href="https://t.me/basiscash" target="_blank">
        Telegram
      </StyledLink> */}
      <StyledLink href="https://discord.gg/accqdzVhaP" target="_blank">
        Discord
      </StyledLink>
      <StyledLink href="https://medium.com/elasticbtc" target="_blank">
        Medium
      </StyledLink>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`;

const buyBAS = `https://uniswap.exchange/swap?inputCurrency=${config.externalTokens.WBTC[0]}&outputCurrency=${config.deployments.Share.address}`;
const buyBAC = `https://uniswap.exchange/swap?inputCurrency=${config.externalTokens.WBTC[0]}&outputCurrency=${config.deployments.Cash.address}`;
export default Nav;
