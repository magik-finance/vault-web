import { Link, NavLink as BaseNavLink } from "react-router-dom";
import styled from "styled-components";

import { Icon } from "../Icon";
import { Wallet } from "../Wallet";

export const StyledWallet = styled(Wallet)`
  margin-left: auto;
`;

export const NavLink = styled(BaseNavLink)`
  color: ${({ theme }) => theme.colors.fadedOutFont};
  font-weight: 700;
  line-height: 1;
  padding: 12px 8px;
  border-radius: 12px;
  transition: color 0.3s ease;

  &.active {
    color: ${({ theme }) => theme.colors.regularFont};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.selectedFont};
  }
`;
export const NavLinkWrapper = styled.li`
  display: flex;
  align-items: center;
`;
export const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-left: 4px;
`;

export const LogoIcon = styled(Icon).attrs({ type: "magik-logo" })`
  width: 89px;
  height: auto;
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px;
  margin-left: -12px;
  border-radius: 12px;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.selectedFont};
  }
`;

export const InnerContainer = styled.div`
  width: 100%;
  max-width: calc(1740px + 96px + 96px);
  padding: 0 96px;
  height: calc(80px - 1px);
  display: flex;
  align-items: center;
`;

export const Container = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
