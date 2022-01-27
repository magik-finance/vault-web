import { VFC } from "react";

import { HOME, VAULT } from "../../constants/routes";

import {
  Container,
  InnerContainer,
  LogoIcon,
  LogoWrapper,
  NavLink,
  NavLinks,
  NavLinkWrapper,
  StyledWallet,
} from "./TopNavigation.styles";

const links = [
  {
    to: HOME,
    label: "Dashboard",
    exact: true,
  },
  {
    to: VAULT,
    label: "Vault",
    exact: false,
  },
];

export const TopNavigation: VFC = () => (
  <Container>
    <InnerContainer>
      <LogoWrapper to={HOME} title="Homepage">
        <LogoIcon />
      </LogoWrapper>
      <NavLinks>
        {links.map(({ to, label, exact }) => (
          <NavLinkWrapper key={label}>
            <NavLink to={to} exact={exact}>
              {label}
            </NavLink>
          </NavLinkWrapper>
        ))}
      </NavLinks>
      <StyledWallet />
    </InnerContainer>
  </Container>
);
