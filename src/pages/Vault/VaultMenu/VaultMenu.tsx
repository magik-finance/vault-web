import { VFC } from "react";

import { BORROW, DEPOSIT, LIQUIDATE } from "../../../constants/routes";

import { Container, StyledButtonNavLink } from "./VaultMenu.styles";

export const VaultMenu: VFC<{ className?: string }> = ({ className }) => (
  <Container className={className}>
    <StyledButtonNavLink to={DEPOSIT}>Deposit</StyledButtonNavLink>
    <StyledButtonNavLink to={BORROW}>Borrow</StyledButtonNavLink>
    <StyledButtonNavLink to={LIQUIDATE}>Liquidate</StyledButtonNavLink>
  </Container>
);
