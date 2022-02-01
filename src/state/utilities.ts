import { BN, Program, Provider } from "@project-serum/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { useMemo } from "react";

import {
  MAGIK_PROGRAM_ID,
  W_SOL_MINT_TOKEN,
  W_SOL_VAULT,
} from "../constants/solana";
import { VaultIdl } from "../interfaces/vault";

interface FindOrCreateATAProps {
  connection: Connection;
  payer: PublicKey;
  owner: PublicKey;
  mint: PublicKey;
}

interface FindOrCreateATAReturn {
  ata: PublicKey;
  instructions: TransactionInstruction[];
}

export const useProgram = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const program = useMemo(() => {
    if (!wallet) return undefined;

    const provider = new Provider(connection, wallet, {
      preflightCommitment: "processed",
    });

    return new Program(VaultIdl, MAGIK_PROGRAM_ID, provider);
  }, [connection, wallet]);

  return program;
};

export async function getWSolTreasureAddress(walletAddress: PublicKey) {
  const [wSolTreasureAddress] = await PublicKey.findProgramAddress(
    [Buffer.from("treasure"), W_SOL_VAULT.toBuffer(), walletAddress.toBuffer()],
    MAGIK_PROGRAM_ID
  );

  return wSolTreasureAddress ? wSolTreasureAddress : undefined;
}

export async function getWSolTreasureBump(walletAddress: PublicKey) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, wSolTreasureBump] = await PublicKey.findProgramAddress(
    [Buffer.from("treasure"), W_SOL_VAULT.toBuffer(), walletAddress.toBuffer()],
    MAGIK_PROGRAM_ID
  );

  return wSolTreasureBump ? wSolTreasureBump : undefined;
}

export async function getWSolSynthMintAddress() {
  const [wSolMintAddress] = await PublicKey.findProgramAddress(
    [
      Buffer.from("synth_mint"),
      W_SOL_MINT_TOKEN.toBuffer(),
      W_SOL_VAULT.toBuffer(),
    ],
    MAGIK_PROGRAM_ID
  );

  return wSolMintAddress ? wSolMintAddress : undefined;
}

export async function getWSolVaultTokenAddress() {
  const [wSolVaultTokenAddress] = await PublicKey.findProgramAddress(
    [
      Buffer.from("vault_token"),
      W_SOL_MINT_TOKEN.toBuffer(),
      W_SOL_VAULT.toBuffer(),
    ],
    MAGIK_PROGRAM_ID
  );

  return wSolVaultTokenAddress ? wSolVaultTokenAddress : undefined;
}

export async function findOrCreateATA({
  connection,
  payer,
  owner,
  mint,
}: FindOrCreateATAProps): Promise<FindOrCreateATAReturn> {
  const ata = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    mint,
    owner
  );

  const info = await connection.getAccountInfo(ata);
  if (info !== null && info.owner.equals(TOKEN_PROGRAM_ID)) {
    return { ata, instructions: [] };
  }

  const associatedTokenAccountInstruction =
    Token.createAssociatedTokenAccountInstruction(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      mint,
      ata,
      owner,
      payer
    );

  return { ata, instructions: [associatedTokenAccountInstruction] };
}

interface GetSolBalanceProps {
  connection: Connection;
  walletAddress: PublicKey;
}

export async function getSolBalance({
  connection,
  walletAddress,
}: GetSolBalanceProps) {
  return new BN((await connection.getBalance(walletAddress)) / Math.pow(10, 9));
}

interface GetSplTokenBalanceProps {
  connection: Connection;
  walletAddress: PublicKey;
  mintTokenAddress: PublicKey;
}

export async function getSplTokenBalance({
  connection,
  walletAddress,
  mintTokenAddress,
}: GetSplTokenBalanceProps) {
  const tokenAccounts = await connection.getTokenAccountsByOwner(
    walletAddress,
    {
      mint: mintTokenAddress,
    }
  );

  const [tokenAccount] = tokenAccounts.value;

  if (!tokenAccount) return new BN(0);

  const balance = await connection.getTokenAccountBalance(tokenAccount.pubkey);

  if (!balance.value.uiAmountString) return new BN("0", 10);

  return new BN(balance.value.amount);
}
