import { VFC } from "react";

import { CurrencySelectOption } from "../CurrencySelect";
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
  SelectCollateralField,
  SelectCollateralTitle,
  StyledVaultSelect,
} from "./Deposit.styles";

const valueOptions = [
  { label: "Lending", value: "lending" },
  { label: "Options", value: "options" },
  { label: "Dual LP", value: "dual-lp" },
];

const collateralOptions: CurrencySelectOption[] = [
  {
    iconName: "usd-coin",
    label: "USDC",
    value: "usdc",
    amount: "45.000,00",
    amountLabel: "MAX",
  },
  {
    iconName: "usd-coin",
    label: "SOL",
    value: "sol",
    amount: "20.000,00",
    amountLabel: "MAX",
  },
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
          <StyledVaultSelect
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
          <SelectCollateralField
            options={collateralOptions}
            value="usdc"
            onChange={noop}
          />
        </MainCard>
        <SideCard></SideCard>
      </Cards>
    </InnerContainer>
  </Container>
);
