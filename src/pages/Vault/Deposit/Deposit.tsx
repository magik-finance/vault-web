import { VFC, useCallback, useState, useMemo } from "react";

import { Box } from "../../../components/Box";
import { Coin, coinConfigs } from "../../../constants/solana";
import { useMagikData } from "../../../state/magik";
import {
  coinAmountFloatToInteger,
  coinAmountIntegerToFloat,
  formatCoinNumber,
  formatNumber,
} from "../../../utils/formatNumber";
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
  SelectCollateralDescription,
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

import { StyledVaultSelect } from "./Deposit.styles";

const vaultOptions = [
  { label: "Lending", value: "lending", apy: 9.2 },
  { label: "Options", value: "options", apy: 21.6 },
  { label: "Dual LP", value: "dual-lp", apy: 15.9 },
];

export const Deposit: VFC = () => {
  const [vault, setVault] = useState(vaultOptions[0].value);
  const [coin, setCoin] = useState<Coin>("usdc");
  const [amount, setAmount] = useState(0);
  const { magikData, deposit, deposits } = useMagikData();

  const currencySelectAndInputOptions: CurrencySelectAndInputOption[] = useMemo(
    () => [
      {
        value: "usdc",
        label: "USDC",
        iconName: "usd-coin",
        max: coinAmountIntegerToFloat("usdc", magikData.usdc.balance),
      },
      {
        value: "wsol",
        label: "wSOL",
        iconName: "solana-coin",
        max: coinAmountIntegerToFloat("wsol", magikData.wsol.balance),
      },
    ],
    [magikData.usdc.balance, magikData.wsol.balance]
  );

  const vaultOption = useMemo(
    () => vaultOptions.find(({ value }) => value === vault)!,
    [vault]
  );

  const handleFormSubmit = useCallback(() => {
    deposit({ coin, amount: coinAmountFloatToInteger(coin, amount) });
  }, [deposit, amount, coin]);

  const reserveDepositLimit = coin === "usdc" ? 6000000000000 : 5000000000000;

  console.log("magikData[coin].balance", magikData[coin]);

  return (
    <Container>
      <GoBack />
      <InnerContainer>
        <VaultMenu />
        <Cards>
          <MainCard>
            <PageTitle tooltip="You choose a vault strategy and Magik maximizes returns by creating the optimal portfolio">
              Deposit
            </PageTitle>
            <StyledVaultSelect
              options={vaultOptions}
              onChange={setVault}
              value={vault}
            />
            <SelectCollateralTitle>
              Choose an asset to deposit
            </SelectCollateralTitle>
            <SelectCollateralDescription>
              Your deposits will be used as collateral while generate APY from
              Magik's vaults
            </SelectCollateralDescription>
            <Box height="44px" />
            <CurrencySelectAndInput
              optionValue={coin}
              amountValue={amount}
              onOptionChange={setCoin}
              onAmountChange={setAmount}
              buttonWidth="100%"
              menuWidth="400px"
              options={currencySelectAndInputOptions}
            />
            <Box height="20px" />
            <MainCardDivider />
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
                <StatsLabelRegular>Vault APY</StatsLabelRegular>
                <StatsLabelMedium>
                  {formatNumber(vaultOption.apy)}%
                </StatsLabelMedium>
              </StatsRow>

              <StatsRow>
                <StatsLabelRegular>Reserve deposit limit</StatsLabelRegular>
                <StatsLabelMedium>
                  {formatCoinNumber(coin, reserveDepositLimit)}
                </StatsLabelMedium>
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
                <StatsLabelBold>
                  {coinConfigs[coin].label} in wallet
                </StatsLabelBold>
                <StatsLabelRegular>
                  {formatCoinNumber(coin, magikData[coin].balance)}
                </StatsLabelRegular>
              </StatsRow>
            </Box>
            <MainCardActionButton onClick={handleFormSubmit}>
              Deposit
            </MainCardActionButton>
          </MainCard>
          <SideCard>
            <SideCardTitle>Total deposited</SideCardTitle>
            <Box height="40px" />
            <BalanceBox
              currencyIcon={coinConfigs[coin].coinIcon}
              amount={formatCoinNumber(
                coin,
                magikData[coin].currentDeposit ?? 0,
                {
                  skipLabel: true,
                }
              )}
              currency={coinConfigs[coin].label}
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
              {deposits.map(({ amount, coin, timestamp }) => (
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
              {deposits.length === 0 ? (
                <Box fontWeight="500" color="fadedOutFont">
                  No deposits yet
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
