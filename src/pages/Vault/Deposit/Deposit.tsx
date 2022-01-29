import { VFC } from "react";

import { GoBack } from "../GoBack";
import { PageTitle } from "../PageTitle";
import {
  Cards,
  Container,
  InnerContainer,
  MainCard,
  SideCard,
} from "../Vault.styles";
import { VaultMenu } from "../VaultMenu";

import { StyledSelectVault } from "./Deposit.styles";

const valutOptions = [
  { label: "Lending", value: "lending" },
  { label: "Options", value: "options" },
  { label: "Dual LP", value: "dual-lp" },
];

const noop = () => {};

export const Deposit: VFC = () => (
  <Container>
    <GoBack />
    <InnerContainer>
      <VaultMenu />
      <Cards>
        <MainCard>
          <PageTitle tooltip="Deposit">Deposit</PageTitle>
          <StyledSelectVault options={valutOptions} onClick={noop} />
        </MainCard>
        <SideCard></SideCard>
      </Cards>
    </InnerContainer>
  </Container>
);
