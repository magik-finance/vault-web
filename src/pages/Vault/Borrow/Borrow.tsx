import { MouseEventHandler, useCallback, useMemo, useState, VFC } from "react";

import { Box } from "../../../components/Box";
import { Icon } from "../../../components/Icon";
import { Coin, coinConfigs } from "../../../constants/solana";
import { useMagikData } from "../../../state/magik";
import { formatCoinNumber } from "../../../utils/formatNumber";
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
  SelectCollateralField,
  SelectCollateralTitle,
  Separator,
  SideCard,
  SideCardTitle,
  StatsLabelMedium,
  StatsLabelRegular,
  StatsRow,
  StatsTitle,
} from "../Vault.styles";
import { VaultMenu } from "../VaultMenu";

export const Borrow: VFC = () => {
  const [coin, setCoin] = useState<Coin>("usdc");
  const [collateralRatio, setCollateralRatio] = useState(25);
  const { borrow, magikData, loans } = useMagikData();

  const collateralOptions: CurrencySelectOption[] = useMemo(
    () => [
      {
        iconName: "usd-coin",
        label: "USDC",
        value: "usdc",
        amount: formatCoinNumber("usdc", magikData.usdc.currentDeposit ?? 0, {
          skipLabel: true,
        }),
      },
      {
        iconName: "solana-coin",
        label: "wSOL",
        value: "wsol",
        amount: formatCoinNumber("wsol", magikData.wsol.currentDeposit ?? 0, {
          skipLabel: true,
        }),
      },
    ],
    [magikData.usdc.currentDeposit, magikData.wsol.currentDeposit]
  );

  const borrowAmount = useMemo(
    () => (magikData[coin].currentDeposit ?? 0) * (collateralRatio / 100),
    [magikData, collateralRatio, coin]
  );

  const handleCollateralRatioChange = useCallback((value: number) => {
    setCollateralRatio(value);
  }, []);

  const handleFormSubmit: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      borrow({ coin, amount: borrowAmount });
    }, [borrow, coin, borrowAmount]);

  return (
    <Container>
      <GoBack />
      <InnerContainer>
        <VaultMenu />
        <Cards>
          <MainCard>
            <PageTitle tooltip="Take out a loan based on your deposited collateral">
              Borrow
            </PageTitle>
            <SelectCollateralTitle>
              Choose a Collateral asset
            </SelectCollateralTitle>
            <SelectCollateralField
              options={collateralOptions}
              value={coin}
              onChange={setCoin}
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
                  Choose borrow amount
                </Box>
                <Box fontWeight="500" color="fadedOutFont" paddingTop="12px">
                  You can take out a loan up to 50% of the value of your
                  deposits
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
            <CollateralRatioSlider
              value={collateralRatio}
              onChange={handleCollateralRatioChange}
            />
            <Box height="20px" />
            <MainCardDivider />
            <Box paddingTop="20px" fontSize="20px" fontWeight="500">
              Confirm borrow asset and amount
            </Box>
            <Box paddingTop="12px" fontWeight="500" color="fadedOutFont">
              Positions can be closed by repaying the borrowed amount
            </Box>
            <Box
              margin="54px 0 44px"
              width="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap="12px"
              padding="16px 24px"
              border="1px solid"
              borderColor="border"
              borderRadius="9999px"
            >
              <Box width="24px" height="24px">
                <Icon width="100%" height="100%" type="magik-coin" />
              </Box>
              {coinConfigs[coin].mgLabel}
              <Box marginLeft="auto" display="flex" alignItems="center">
                {formatCoinNumber(coin, borrowAmount, { skipLabel: true })}
              </Box>
            </Box>
            <MainCardActionButton onClick={handleFormSubmit}>
              Confirm
            </MainCardActionButton>
          </MainCard>
          <SideCard>
            <SideCardTitle>Collateral preview</SideCardTitle>
            <Box height="40px" />
            <BalanceBox
              currencyIcon={coinConfigs[coin].coinIcon}
              amount={formatCoinNumber(
                coin,
                magikData[coin].currentDeposit ?? 0,
                { skipLabel: true }
              )}
              currency={coinConfigs[coin].label}
              label={`Balance: ${formatCoinNumber(
                coin,
                magikData[coin].balance ?? 0
              )}`}
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
              {loans.map(({ amount, coin, timestamp }) => (
                <StatsRow key={timestamp}>
                  <StatsLabelRegular>
                    {new Date(timestamp).toLocaleDateString("en-US", {
                      dateStyle: "medium",
                    })}
                  </StatsLabelRegular>
                  <StatsLabelMedium>
                    {formatCoinNumber(coin, amount)}
                  </StatsLabelMedium>
                </StatsRow>
              ))}
              {loans.length === 0 ? (
                <Box fontWeight="500" color="fadedOutFont">
                  No loans yet
                </Box>
              ) : null}
            </Box>
            <Separator />
          </SideCard>
        </Cards>
      </InnerContainer>
    </Container>
  );
};
