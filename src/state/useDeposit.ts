import { Program, BN } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { Dispatch, SetStateAction, useCallback } from "react";

import { NOTIFICATION_TYPE } from "../constants/common";
import { Coin, coinConfigs } from "../constants/solana";
import { VaultProgram } from "../interfaces/vault";
import { formatCoinNumber } from "../utils/formatNumber";
import { Deposit } from "../utils/useLocalStorage";

import { createNotification } from "./notificationManager";
import {
  findOrCreateATA,
  getSynthMintAddress,
  getTreasureAddress,
  getTreasureBump,
  getVaultTokenAddress,
} from "./utilities";

export interface UseDepositProps {
  wallet: WalletContextState;
  program: Program<VaultProgram> | undefined;
  connection: Connection;
  fetchData: () => Promise<void>;
  setDeposits: Dispatch<SetStateAction<Deposit[] | undefined>>;
}

export interface DepositProps {
  coin: Coin;
  amount: number;
}

export const useDeposit = ({
  wallet,
  program,
  connection,
  fetchData,
  setDeposits,
}: UseDepositProps) =>
  useCallback(
    async ({ coin, amount }: DepositProps) => {
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

      const { ata: userTokenAddress, instructions: userTokenInstructions } =
        await findOrCreateATA({
          connection,
          payer: wallet.publicKey,
          owner: wallet.publicKey,
          mint: coinConfigs[coin].mintToken,
        });

      instructions.push(...userTokenInstructions);

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

      try {
        const transactionHash = await program.rpc.deposit(
          new BN(treasureBump),
          new BN(amount),
          {
            accounts: {
              treasure: treasureAddress,
              userToken: userTokenAddress,
              vault: coinConfigs[coin].vault,
              vaultToken: vaultTokenAddress,
              userSynth: userSynthAddress,
              owner: wallet.publicKey,
              tokenProgram: TOKEN_PROGRAM_ID,
              systemProgram: SystemProgram.programId,
              rent: SYSVAR_RENT_PUBKEY,
            },
          }
        );

        setDeposits((previous) => [
          { amount, coin, timestamp: +new Date() },
          ...(previous ?? []),
        ]);

        await fetchData();

        createNotification(
          NOTIFICATION_TYPE.SUCCESS,
          `Your deposit out of ${formatCoinNumber(
            coin,
            amount
          )}} has been successful. Click to view on SolScan`,
          "Congratulations",
          5000,
          transactionHash
        );
      } catch (e) {
        createNotification(
          NOTIFICATION_TYPE.ERROR,
          `We ran into an issue while trying to deposit from your wallet`,
          "Error",
          5000
        );
      }
    },
    [wallet, connection, program, fetchData, setDeposits]
  );
