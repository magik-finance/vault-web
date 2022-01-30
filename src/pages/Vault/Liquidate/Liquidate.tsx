import { useState, VFC } from "react";

import { Box } from "../../../components/Box";
import { BalanceBox } from "../BalanceBox";
import {
  CurrencySelectAndInput,
  CurrencySelectAndInputOption,
} from "../CurrencySelectAndInput";
import { GoBack } from "../GoBack";
import { PageTitle } from "../PageTitle";
import {
  Cards,
  Container,
  InnerContainer,
  MainCard,
  MainCardActionButton,
  MainCardDivider,
  Separator,
  SideCard,
  SideCardTitle,
  StatsLabelMedium,
  StatsLabelRegular,
  StatsRow,
  StatsTitle,
} from "../Vault.styles";
import { VaultMenu } from "../VaultMenu";

const currencySelectAndInputOptions: CurrencySelectAndInputOption[] = [
  {
    value: "usdc",
    label: "USDC",
    iconName: "usd-coin",
    max: 23000,
  },
  {
    value: "sol",
    label: "SOL",
    iconName: "solana-coin",
    max: 11000,
  },
];

export const Liquidate: VFC = () => {
  const [currency, setCurrency] = useState(
    currencySelectAndInputOptions[0].value
  );
  const [amount, setAmount] = useState(0);

  return (
    <Container>
      <GoBack />
      <InnerContainer>
        <VaultMenu />
        <Cards>
          <MainCard>
            <PageTitle tooltip="Repay the remaining debt by liquidating your collateral">
              Liquidate
            </PageTitle>
            <Box padding="44px 0 24px" fontSize="18px" fontWeight="500">
              Load details
            </Box>
            <Separator />
            <Box
              padding="24px 0 20px"
              width="100%"
              display="flex"
              flexDirection="column"
              gap="24px"
            >
              <StatsRow>
                <StatsLabelRegular>Your collateral balance</StatsLabelRegular>
                <StatsLabelMedium>145.000,00 USDC</StatsLabelMedium>
              </StatsRow>
              <StatsRow>
                <StatsLabelRegular>Remaining USDC debt</StatsLabelRegular>
                <StatsLabelMedium>145.000,00 USDC</StatsLabelMedium>
              </StatsRow>
            </Box>
            <MainCardDivider />
            <Box paddingTop="20px" fontSize="20px" fontWeight="500">
              Pay your debt and liquidate
            </Box>
            <Box padding="12px 0 54px" fontWeight="500" color="fadedOutFont">
              Where you want to repay your loan with
            </Box>
            <CurrencySelectAndInput
              optionValue={currency}
              amountValue={amount}
              onOptionChange={setCurrency}
              onAmountChange={setAmount}
              buttonWidth="100%"
              menuWidth="400px"
              options={currencySelectAndInputOptions}
            />
            <Box height="44px" />
            <MainCardActionButton>
              Liquidate all your positions
            </MainCardActionButton>
          </MainCard>
          <SideCard>
            <SideCardTitle>Total loan height</SideCardTitle>
            <Box height="40px" />
            <BalanceBox
              currencyIcon="usd-coin"
              amount="145.000,00"
              currency="USDC"
              label="All your loans combined"
            />
            <Box height="44px" />
            <StatsTitle>Recent loans</StatsTitle>
            <Box height="24px" />
            <Separator />
            <Box
              display="flex"
              width="100%"
              flexDirection="column"
              padding="24px 0"
              gap="24px"
            >
              <StatsRow>
                <StatsLabelRegular>12.05.2021</StatsLabelRegular>
                <StatsLabelMedium>318.67 USDC</StatsLabelMedium>
              </StatsRow>
              <StatsRow>
                <StatsLabelRegular>07.05.2021</StatsLabelRegular>
                <StatsLabelMedium>5 SOL</StatsLabelMedium>
              </StatsRow>
              <StatsRow>
                <StatsLabelRegular>06.05.2021</StatsLabelRegular>
                <StatsLabelMedium>45.000,00 USDC</StatsLabelMedium>
              </StatsRow>
            </Box>
            <Separator />
          </SideCard>
        </Cards>
      </InnerContainer>
    </Container>
  );
};
