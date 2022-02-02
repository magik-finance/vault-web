import { Program } from "@project-serum/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { Dispatch, MutableRefObject, SetStateAction, useCallback } from "react";

import { Coin, coins } from "../constants/solana";
import { VaultProgram } from "../interfaces/vault";

import { MagikCoinData, MagikData } from "./types";
import { getCoinBalance, getSolBalance, getTreasureAddress } from "./utilities";

interface UseFetchDataProps {
  wallet: WalletContextState;
  program: Program<VaultProgram> | undefined;
  connection: Connection;
  setData: Dispatch<SetStateAction<MagikData>>;
  isDataInitializedRef: MutableRefObject<boolean>;
}

export const useFetchData = ({
  wallet,
  program,
  connection,
  setData,
  isDataInitializedRef,
}: UseFetchDataProps) =>
  useCallback(async () => {
    if (!program || !wallet.publicKey) return;

    let coinData: Record<Coin, MagikCoinData> = { usdc: {}, wsol: {} };

    const allTreasures = await program.account.treasure.all();

    for (const coin of coins) {
      try {
        const treasureAddress = await getTreasureAddress(
          coin,
          wallet.publicKey
        );
        if (!treasureAddress) throw new Error();

        const treasure = allTreasures.find(
          ({ publicKey }) => publicKey.toBase58() === treasureAddress.toBase58()
        );
        if (!treasure) throw new Error();

        const currentDeposit = treasure?.account.currentDeposit.toNumber();
        const currentBorrow = treasure?.account.currentBorrow.toNumber();

        coinData = {
          ...coinData,
          [coin]: {
            ...coinData[coin],
            currentDeposit,
            currentBorrow,
          },
        };
      } catch (error) {}

      const balance = await getCoinBalance({
        coin,
        connection,
        walletAddress: wallet.publicKey,
      });

      coinData = {
        ...coinData,
        [coin]: {
          ...coinData[coin],
          balance,
        },
      };
    }

    const solBalance = await getSolBalance({
      connection,
      walletAddress: wallet.publicKey,
    });

    setData((previousData) => ({
      ...previousData,
      ...coinData,
      solBalance,
    }));

    isDataInitializedRef.current = true;
  }, [wallet, program, setData, connection, isDataInitializedRef]);
