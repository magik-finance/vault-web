import { VFC } from "react";

import { Box } from "../../../components/Box";
import { BalanceBox } from "../BalanceBox";
import { CollateralRatioSlider } from "../CollateralRatioSlider";
import { CurrencySelectOption } from "../CurrencySelect";
import { GoBack } from "../GoBack";
import { PageTitle } from "../PageTitle";
import {
  Cards,
  Container,
  InnerContainer,
  MainCard,
  MainCardActionButton,
  MainCardDivider,
  SelectCollateralDescription,
  SelectCollateralField,
  SelectCollateralTitle,
  Separator,
  SideCard,
  SideCardTitle,
  StatsLabelBold,
  StatsLabelMedium,
  StatsLabelRegular,
  StatsRow,
  StatsTitle,
} from "../Vault.styles";
import { VaultMenu } from "../VaultMenu";

const collateralOptions: CurrencySelectOption[] = [
  {
    iconName: "usd-coin",
    label: "USDC",
    value: "usdc",
    amount: "45.000,00",
  },
  {
    iconName: "usd-coin",
    label: "SOL",
    value: "sol",
    amount: "20.000,00",
  },
];

const noop = () => {};

export const Borrow: VFC = () => (
  <Container>
    <GoBack />
    <InnerContainer>
      <VaultMenu />
      <Cards>
        <MainCard>
          <PageTitle tooltip="Take out a loan based on your deposited colleteral">
            Borrow
          </PageTitle>
          <SelectCollateralTitle>
            Choose a Collateral asset
          </SelectCollateralTitle>
          <SelectCollateralDescription>
            Collateral assets may affect the minimum collateral ratio
          </SelectCollateralDescription>
          <SelectCollateralField
            options={collateralOptions}
            value="usdc"
            onChange={noop}
          />
          <MainCardDivider />
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Box>
              <Box fontSize="20px" fontWeight="500">
                Set up a collateral ratio
              </Box>
              <Box fontWeight="500" color="fadedOutFont" paddingTop="12px">
                Positions below the minimum will be liquidated
              </Box>
            </Box>
            <Box
              border="1px solid"
              borderColor="border"
              borderRadius="9999px"
              padding="8px 24px"
              display="flex"
              gap="48px"
              fontWeight="500"
            >
              <Box>50%</Box>
              <Box color="fadedOutFont">MAX</Box>
            </Box>
          </Box>
          <Box height="75px" />
          <CollateralRatioSlider />
          <Box height="20px" />
          <StatsTitle>Deposit details</StatsTitle>
          <Box height="24px" />
          <Separator />
          <Box
            padding="24px 0 20px"
            display="flex"
            flexDirection="column"
            width="100%"
            gap="24px"
          >
            <StatsRow>
              <StatsLabelRegular>Reserve deposit limit</StatsLabelRegular>
              <StatsLabelMedium>6,000,000 SOL</StatsLabelMedium>
            </StatsRow>
            <StatsRow>
              <StatsLabelRegular>Borrow limit</StatsLabelRegular>
              <StatsLabelMedium>$ 0.00</StatsLabelMedium>
            </StatsRow>
            <StatsRow>
              <StatsLabelRegular>Liquidity</StatsLabelRegular>
              <StatsLabelMedium>0 %</StatsLabelMedium>
            </StatsRow>
            <StatsRow>
              <StatsLabelRegular>Supply APY</StatsLabelRegular>
              <StatsLabelMedium>1.92 %</StatsLabelMedium>
            </StatsRow>
          </Box>
          <MainCardDivider />
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            gap="20px"
            padding="20px 0 32px"
          >
            <StatsRow>
              <StatsLabelBold>USDC in wallet</StatsLabelBold>
              <StatsLabelRegular>$ 24.005,00</StatsLabelRegular>
            </StatsRow>
            <StatsRow>
              <StatsLabelBold>Tx fee</StatsLabelBold>
              <StatsLabelRegular>0.15 USDC</StatsLabelRegular>
            </StatsRow>
          </Box>
          <MainCardActionButton>Deposit your assets</MainCardActionButton>
        </MainCard>
        <SideCard>
          <SideCardTitle>Total deposited</SideCardTitle>
          <Box height="40px" />
          <BalanceBox
            currencyIcon="usd-coin"
            amount="45.000,00"
            currency="USDC"
            label="Current deposit"
          />
          <Box height="44px" />
          <StatsTitle>Recent deposits</StatsTitle>
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
            <StatsRow>
              <StatsLabelRegular>02.05.2021</StatsLabelRegular>
              <StatsLabelMedium>318.67 USDC</StatsLabelMedium>
            </StatsRow>
            <StatsRow>
              <StatsLabelRegular>01.05.2021</StatsLabelRegular>
              <StatsLabelMedium>318.67 USDC</StatsLabelMedium>
            </StatsRow>
          </Box>
          <Separator />
        </SideCard>
      </Cards>
    </InnerContainer>
  </Container>
);
