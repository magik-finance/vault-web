import { Program, BN } from "@project-serum/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { VFC, useCallback, useState } from "react";

import { Box } from "../../../components/Box";
import { MAGIK_PROGRAM_ID } from "../../../constants/solana";
import { VaultIdl } from "../../../interfaces/vault";
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

const valueOptions = [
  { label: "Lending", value: "lending" },
  { label: "Options", value: "options" },
  { label: "Dual LP", value: "dual-lp" },
];

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

async function getATA(owner: PublicKey, mint: PublicKey) {
  const [ata] = await PublicKey.findProgramAddress(
    [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  return ata;
}

const noop = () => {};

export const Deposit: VFC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [currency, setCurrency] = useState(
    currencySelectAndInputOptions[0].value
  );
  const [amount, setAmount] = useState(0);

  const depositFunds = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const program = new Program(VaultIdl, MAGIK_PROGRAM_ID);
    const treasureSeed = Buffer.from("treasure");

    const vault = new PublicKey("5Acwv2Sztq8vZJnMVLEXZw3rL6by8CHhU8BMmuX1ELog");
    const wSOLMINT = new PublicKey(
      "So11111111111111111111111111111111111111112"
    );

    const user = new PublicKey("USER_PUB_KEY_HERE");
    const [treasure, trBump] = await PublicKey.findProgramAddress(
      [treasureSeed, vault.toBuffer(), user.toBuffer()],
      program.programId
    );

    const [synth_mint, _] = await PublicKey.findProgramAddress(
      [Buffer.from("synth_mint"), wSOLMINT.toBuffer(), vault.toBuffer()],
      program.programId
    );

    const vaultToken = await getATA(vault, wSOLMINT);
    const userToken = await getATA(user, wSOLMINT);
    const userSynth = await getATA(user, synth_mint);

    const depositAmount = 1000;
    const depositTransaction = await program.rpc.deposit(
      new BN(trBump),
      new BN(depositAmount),
      {
        accounts: {
          treasure: treasure,
          userToken: userToken,
          vault: vault,
          vaultToken: vaultToken,
          userSynth: userSynth,
          owner: user,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram,
          rent: SYSVAR_RENT_PUBKEY,
        },
      }
    );
  }, [publicKey, sendTransaction, connection]);

  return (
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
            <Box height="44px" />
            <CurrencySelectAndInput
              optionValue={currency}
              amountValue={amount}
              onOptionChange={setCurrency}
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
                <StatsLabelMedium>15%</StatsLabelMedium>
              </StatsRow>

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
};
