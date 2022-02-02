import { MouseEventHandler, useCallback, useMemo, useState, VFC } from "react";

import { Box } from "../../../components/Box";
import { Coin, coinConfigs } from "../../../constants/solana";
import { useMagikData } from "../../../state/magik";
import { formatCoinNumber } from "../../../utils/formatNumber";
import { BalanceBox } from "../BalanceBox";
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
  SelectCollateralField,
  Separator,
  SideCard,
  SideCardTitle,
  StatsLabelMedium,
  StatsLabelRegular,
  StatsRow,
} from "../Vault.styles";
import { VaultMenu } from "../VaultMenu";

export const Liquidate: VFC = () => {
  const [coin, setCoin] = useState<Coin>("usdc");
  const { liquidate, magikData } = useMagikData();

  const collateralOptions: CurrencySelectOption[] = useMemo(
    () => [
      {
        value: "usdc",
        label: "USDC",
        iconName: "usd-coin",
        amount: formatCoinNumber("usdc", magikData.usdc.currentBorrow ?? 0, {
          skipLabel: true,
        }),
      },
      {
        value: "wsol",
        label: "SOL",
        iconName: "solana-coin",
        amount: formatCoinNumber("wsol", magikData.wsol.currentBorrow ?? 0, {
          skipLabel: true,
        }),
      },
    ],
    [magikData.usdc.currentBorrow, magikData.wsol.currentBorrow]
  );

  const isAbleToLiquidate = useMemo(
    () => (magikData[coin].currentBorrow ?? 0) > 0,
    [magikData, coin]
  );

  const handleFormSubmit: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      liquidate({ coin });
    }, [liquidate, coin]);

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
                <StatsLabelMedium>
                  {formatCoinNumber(coin, magikData[coin].currentDeposit ?? 0)}
                </StatsLabelMedium>
              </StatsRow>
              <StatsRow>
                <StatsLabelRegular>Remaining debt</StatsLabelRegular>
                <StatsLabelMedium>
                  {formatCoinNumber(coin, magikData[coin].currentBorrow ?? 0)}
                </StatsLabelMedium>
              </StatsRow>
            </Box>
            <MainCardDivider />
            <Box paddingTop="20px" fontSize="20px" fontWeight="500">
              Choose asset
            </Box>
            <Box paddingTop="12px" fontWeight="500" color="fadedOutFont">
              Which loan you want to repay
            </Box>
            <SelectCollateralField
              options={collateralOptions}
              value={coin}
              onChange={setCoin}
            />
            <Box height="44px" />
            <MainCardActionButton
              onClick={handleFormSubmit}
              disabled={!isAbleToLiquidate}
            >
              Liquidate your entire position
            </MainCardActionButton>
          </MainCard>
          <SideCard>
            <SideCardTitle>Total loan height</SideCardTitle>
            <Box height="40px" />
            <BalanceBox
              currencyIcon={coinConfigs[coin].coinIcon}
              amount={formatCoinNumber(
                coin,
                magikData[coin].currentBorrow ?? 0,
                {
                  skipLabel: true,
                }
              )}
              currency={coinConfigs[coin].label}
              label="All your loans combined"
            />
          </SideCard>
        </Cards>
      </InnerContainer>
    </Container>
  );
};
