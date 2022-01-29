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

import {
  SelectCollateralDescription,
  SelectCollateralTitle,
  StyledSelectVault,
} from "./Deposit.styles";

const valueOptions = [
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
          <StyledSelectVault
            options={valueOptions}
            onChange={noop}
            value={valueOptions[0].value}
          />
          <SelectCollateralTitle>
            Choose a Collateral asset to deposit
          </SelectCollateralTitle>
          <SelectCollateralDescription>
            Based on the amount of collateral you can get a loan
          </SelectCollateralDescription>
        </MainCard>
        <SideCard></SideCard>
      </Cards>
    </InnerContainer>
  </Container>
);
