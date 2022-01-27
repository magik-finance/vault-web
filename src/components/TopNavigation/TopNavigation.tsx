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
  },
  {
    to: VAULT,
    label: "Vault",
  },
];

export const TopNavigation: VFC = () => (
  <Container>
    <InnerContainer>
      <LogoWrapper to={HOME} title="Homepage">
        <LogoIcon />
      </LogoWrapper>
      <NavLinks>
        {links.map(({ to, label }) => (
          <NavLinkWrapper key={label}>
            <NavLink to={to}>{label}</NavLink>
          </NavLinkWrapper>
        ))}
      </NavLinks>
      <StyledWallet />
    </InnerContainer>
  </Container>
);
