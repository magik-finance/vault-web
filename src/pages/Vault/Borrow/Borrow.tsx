import { BN, Program, Provider } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import { useCallback, useState, VFC } from "react";

import { Box } from "../../../components/Box";
import { Icon } from "../../../components/Icon";
import {
  MAGIK_PROGRAM_ID,
  W_SOL_MINT_TOKEN,
  W_SOL_VAULT,
} from "../../../constants/solana";
import { VaultIdl } from "../../../interfaces/vault";
import { findOrCreateATA } from "../../../state/magik";
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
    iconName: "solana-coin",
    label: "SOL",
    value: "sol",
    amount: "20.000,00",
  },
];

export const Borrow: VFC = () => {
  const [currency, setCurrency] = useState(collateralOptions[0].value);

  const { connection } = useConnection();
  const wallet = useWallet();
  const [collateralRatio, setCollateralRatio] = useState(50);

  const requestLoan = useCallback(async () => {
    if (!wallet.publicKey) throw new WalletNotConnectedError();

    const provider = new Provider(connection, wallet as any, {
      preflightCommitment: "processed",
    });

    const user = wallet.publicKey;
    const program = new Program(VaultIdl, MAGIK_PROGRAM_ID, provider);

    const treasureSeed = Buffer.from("treasure");
    const vault = new PublicKey(W_SOL_VAULT);
    const wSolMint = new PublicKey(W_SOL_MINT_TOKEN);

    const [treasure, trBump] = await PublicKey.findProgramAddress(
      [treasureSeed, vault.toBuffer(), user.toBuffer()],
      program.programId
    );

    const [synth_mint] = await PublicKey.findProgramAddress(
      [Buffer.from("synth_mint"), wSolMint.toBuffer(), vault.toBuffer()],
      program.programId
    );

    const [vaultToken] = await PublicKey.findProgramAddress(
      [Buffer.from("vault_token"), wSolMint.toBuffer(), vault.toBuffer()],
      program.programId
    );

    const userSynth = await findOrCreateATA(
      {
        connection,
        payer: wallet.publicKey,
        owner: wallet.publicKey,
        mint: W_SOL_MINT_TOKEN,
      }
    );

    const loanAmount = 1000; //Hardcode
    const loanTransaction = await program.rpc.borrow(
      new BN(trBump),
      new BN(loanAmount),
      {
        accounts: {
          treasure: treasure,
          vault: vault,
          vaultToken: vaultToken,
          synthMint: synth_mint,
          userSynth: userSynth,
          owner: user,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        },
      }
    );

    console.log(loanTransaction);

    return loanTransaction;
  }, [wallet, connection]);

  const handleCollateralRatioChange = useCallback((value: number) => {
    setCollateralRatio(value);
  }, []);

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
            <SelectCollateralDescription>
              Collateral assets may affect the minimum collateral ratio
            </SelectCollateralDescription>
            <SelectCollateralField
              options={collateralOptions}
              value={currency}
              onChange={setCurrency}
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
                <Box>{collateralRatio}%</Box>
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
              mgUSDC
              <Box marginLeft="auto" display="flex" alignItems="center">
                0.00
              </Box>
            </Box>
            <MainCardActionButton onClick={requestLoan}>Confirm the loan</MainCardActionButton>
          </MainCard>
          <SideCard>
            <SideCardTitle>Collateral preview</SideCardTitle>
            <Box height="40px" />
            <BalanceBox
              currencyIcon="usd-coin"
              amount="45.000,00"
              currency="USDC"
              label="Balance: 318.67 USDC"
            />
            <Box height="44px" />
            <StatsTitle>Conversion details</StatsTitle>
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
                <StatsLabelRegular>Exchange Price</StatsLabelRegular>
                <StatsLabelMedium>45.000,00 USDC</StatsLabelMedium>
              </StatsRow>
              <StatsRow>
                <StatsLabelRegular>Premium</StatsLabelRegular>
                <StatsLabelMedium>-0.04%</StatsLabelMedium>
              </StatsRow>
            </Box>
            <Separator />
            <Box height="24px" />
            <StatsRow>
              <StatsLabelRegular>Liquidity</StatsLabelRegular>
              <StatsLabelMedium>17.33M USDC</StatsLabelMedium>
            </StatsRow>
            <Box height="24px" />
            <Separator />
          </SideCard>
        </Cards>
      </InnerContainer>
    </Container>
  );
};
