import { Program, BN } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { Dispatch, SetStateAction, useCallback } from "react";

import { NOTIFICATION_TYPE } from "../constants/common";
import { Coin, coinConfigs } from "../constants/solana";
import { VaultProgram } from "../interfaces/vault";
import { Loan } from "../utils/useLocalStorage";

import { createNotification } from "./notificationManager";
import {
  findOrCreateATA,
  getSynthMintAddress,
  getTreasureAddress,
  getTreasureBump,
  getVaultTokenAddress,
} from "./utilities";

export interface UseBorrowProps {
  wallet: WalletContextState;
  program: Program<VaultProgram> | undefined;
  connection: Connection;
  fetchData: () => Promise<void>;
  setLoans: Dispatch<SetStateAction<Loan[] | undefined>>;
}

export interface BorrowProps {
  coin: Coin;
  amount: number;
}

export const useBorrow = ({
  wallet,
  program,
  connection,
  fetchData,
  setLoans,
}: UseBorrowProps) =>
  useCallback(
    async ({ coin, amount }: BorrowProps) => {
      if (!wallet.publicKey) throw new WalletNotConnectedError();
      if (!program) throw new Error();

      let instructions: TransactionInstruction[] = [];

      const treasureAddress = await getTreasureAddress(coin, wallet.publicKey);
      const treasureBump = await getTreasureBump(coin, wallet.publicKey);
      const vaultTokenAddress = await getVaultTokenAddress(coin);
      const synthMintAddress = await getSynthMintAddress(coin);

      if (
        !treasureAddress ||
        typeof treasureBump === "undefined" ||
        !vaultTokenAddress ||
        !synthMintAddress
      )
        throw new Error();

      const { ata: userSynthAddress, instructions: userSynthInstructions } =
        await findOrCreateATA({
          connection,
          payer: wallet.publicKey,
          owner: wallet.publicKey,
          mint: synthMintAddress,
        });

      instructions.push(...userSynthInstructions);

      if (instructions.length > 0) {
        let transaction = new Transaction({ feePayer: wallet.publicKey });
        transaction.instructions = [...instructions];
        await wallet.sendTransaction(transaction, connection);
      }

      console.log("treasureBump", treasureBump);
      console.log("amount", amount);
      console.log("treasure", treasureAddress.toBase58());
      console.log("vault", coinConfigs[coin].vault.toBase58());
      console.log("vaultToken", vaultTokenAddress.toBase58());
      console.log("userSynth", userSynthAddress.toBase58());
      console.log("synthMint", synthMintAddress.toBase58());
      console.log("owner", wallet.publicKey.toBase58());
      console.log("tokenProgram", TOKEN_PROGRAM_ID.toBase58());
      console.log("systemProgram", SystemProgram.programId.toBase58());

      try {
        const transactionHash = await program.rpc.borrow(
          new BN(treasureBump),
          new BN(amount),
          {
            accounts: {
              treasure: treasureAddress,
              vault: coinConfigs[coin].vault,
              vaultToken: vaultTokenAddress,
              userSynth: userSynthAddress,
              synthMint: synthMintAddress,
              owner: wallet.publicKey,
              tokenProgram: TOKEN_PROGRAM_ID,
              systemProgram: SystemProgram.programId,
            },
          }
        );

        setLoans((previous) => [
          { amount, coin, timestamp: +new Date() },
          ...(previous ?? []),
        ]);
        await fetchData();

        createNotification(
          NOTIFICATION_TYPE.SUCCESS,
          `Your request to borrow ${
            amount / 1000000
          } ${coin.toUpperCase()} has been successful. Click to view on SolScan`,
          "Congratulations",
          5000,
          transactionHash
        );
      } catch (e) {
        createNotification(
          NOTIFICATION_TYPE.ERROR,
          `We ran into an issue while trying to request a loan`,
          "Error",
          5000,
        );
      }
    },
    [wallet, connection, program, fetchData, setLoans]
  );
