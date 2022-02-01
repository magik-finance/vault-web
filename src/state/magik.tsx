import { BN } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  USDC_MINT_TOKEN,
  W_SOL_MINT_TOKEN,
  W_SOL_VAULT,
} from "../constants/solana";

import {
  useProgram,
  getWSolSynthMintAddress,
  getWSolTreasureAddress,
  getWSolTreasureBump,
  getWSolVaultTokenAddress,
  findOrCreateATA,
  getSolBalance,
  getSplTokenBalance,
} from "./utilities";

interface MagikData {
  solBalance?: BN;
  wSolBalance?: BN;
  usdcBalance?: BN;
  wSolCurrentDeposit?: BN;
  wSolCurrentBorrow?: BN;
}

interface MagikDataContextValue {
  magikData: MagikData;
  refetchMagikData: () => void;
  depositWSol: (props: DepositProps) => Promise<void>;
  borrowWSol: (props: BorrowProps) => Promise<void>;
}

export const MagikDataContext = createContext<MagikDataContextValue>(
  {} as MagikDataContextValue
);

const defaultData: MagikData = {};

interface DepositProps {
  amount: number;
}

interface BorrowProps {
  amount: number;
}

export const MagikDataProvider: FC = ({ children }) => {
  const isDataInitializedRef = useRef(false);
  const [data, setData] = useState<MagikData>(defaultData);
  const { connection } = useConnection();
  const wallet = useWallet();
  const program = useProgram();

  const fetchData = useCallback(async () => {
    if (!program || !wallet.publicKey) return;

    const wSolTreasureAddress = await getWSolTreasureAddress(wallet.publicKey);
    if (!wSolTreasureAddress) return;

    const allTreasures = await program.account.treasure.all();

    const wSolTreasure = allTreasures.find(
      ({ publicKey }) => publicKey.toBase58() === wSolTreasureAddress.toBase58()
    );
    if (!wSolTreasure) return;

    const wSolCurrentDeposit = wSolTreasure?.account.currentDeposit;
    const wSolCurrentBorrow = wSolTreasure?.account.currentBorrow;

    const solBalance = await getSolBalance({
      connection,
      walletAddress: wallet.publicKey,
    });
    const wSolBalance = await getSplTokenBalance({
      connection,
      walletAddress: wallet.publicKey,
      mintTokenAddress: W_SOL_MINT_TOKEN,
    });
    const usdcBalance = await getSplTokenBalance({
      connection,
      walletAddress: wallet.publicKey,
      mintTokenAddress: USDC_MINT_TOKEN,
    });

    setData((previousData) => ({
      ...previousData,
      solBalance,
      wSolBalance,
      usdcBalance,
      wSolCurrentDeposit,
      wSolCurrentBorrow,
    }));

    isDataInitializedRef.current = true;
  }, [wallet, program, setData, connection]);

  /**
   * DEPOSIT SOL
   */
  const depositWSol = useCallback(
    async ({ amount }: DepositProps) => {
      if (!wallet.publicKey) throw new WalletNotConnectedError();
      if (!program) throw new Error();

      let instructions: TransactionInstruction[] = [];

      const wSolTreasureAddress = await getWSolTreasureAddress(
        wallet.publicKey
      );
      const wSolTreasureBump = await getWSolTreasureBump(wallet.publicKey);
      const wSolVaultTokenAddress = await getWSolVaultTokenAddress();
      const wSolSynthMintAddress = await getWSolSynthMintAddress();

      if (
        !wSolTreasureAddress ||
        typeof wSolTreasureBump === "undefined" ||
        !wSolVaultTokenAddress ||
        !wSolSynthMintAddress
      )
        throw new Error();

      const {
        ata: userWSolTokenAddress,
        instructions: userWSolTokenInstructions,
      } = await findOrCreateATA({
        connection,
        payer: wallet.publicKey,
        owner: wallet.publicKey,
        mint: W_SOL_MINT_TOKEN,
      });

      instructions.push(...userWSolTokenInstructions);

      const {
        ata: userWSolSynthAddress,
        instructions: userWSolSynthInstructions,
      } = await findOrCreateATA({
        connection,
        payer: wallet.publicKey,
        owner: wallet.publicKey,
        mint: wSolSynthMintAddress,
      });

      instructions.push(...userWSolSynthInstructions);

      if (instructions.length > 0) {
        let transaction = new Transaction({ feePayer: wallet.publicKey });
        transaction.instructions = [...instructions];
        await wallet.sendTransaction(transaction, connection);
      }

      await program.rpc.deposit(new BN(wSolTreasureBump), new BN(amount), {
        accounts: {
          treasure: wSolTreasureAddress,
          userToken: userWSolTokenAddress,
          vault: W_SOL_VAULT,
          vaultToken: wSolVaultTokenAddress,
          userSynth: userWSolSynthAddress,
          owner: wallet.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      await fetchData();
    },
    [wallet, connection, program, fetchData]
  );

  /**
   * BORROW SOL
   */
  const borrowWSol = useCallback(
    async ({ amount }: BorrowProps) => {
      if (!wallet.publicKey) throw new WalletNotConnectedError();
      if (!program) throw new Error();

      let instructions: TransactionInstruction[] = [];

      const wSolTreasureAddress = await getWSolTreasureAddress(
        wallet.publicKey
      );
      const wSolTreasureBump = await getWSolTreasureBump(wallet.publicKey);
      const wSolVaultTokenAddress = await getWSolVaultTokenAddress();
      const wSolSynthMintAddress = await getWSolSynthMintAddress();

      if (
        !wSolTreasureAddress ||
        typeof wSolTreasureBump === "undefined" ||
        !wSolVaultTokenAddress ||
        !wSolSynthMintAddress
      )
        throw new Error();

      const {
        ata: userWSolSynthAddress,
        instructions: userWSolSynthInstructions,
      } = await findOrCreateATA({
        connection,
        payer: wallet.publicKey,
        owner: wallet.publicKey,
        mint: wSolSynthMintAddress,
      });

      instructions.push(...userWSolSynthInstructions);

      if (instructions.length > 0) {
        let transaction = new Transaction({ feePayer: wallet.publicKey });
        transaction.instructions = [...instructions];
        await wallet.sendTransaction(transaction, connection);
      }

      console.log("treasure", wSolTreasureAddress.toBase58());
      console.log("vault", W_SOL_VAULT.toBase58());
      console.log("vaultToken", wSolVaultTokenAddress.toBase58());
      console.log("userSynth", userWSolSynthAddress.toBase58());
      console.log("synthMint", wSolSynthMintAddress.toBase58());
      console.log("owner", wallet.publicKey.toBase58());
      console.log("tokenProgram", TOKEN_PROGRAM_ID.toBase58());
      console.log("systemProgram", SystemProgram.programId.toBase58());

      await program.rpc.borrow(new BN(wSolTreasureBump), new BN(amount), {
        accounts: {
          treasure: wSolTreasureAddress,
          vault: W_SOL_VAULT,
          vaultToken: wSolVaultTokenAddress,
          userSynth: userWSolSynthAddress,
          synthMint: wSolSynthMintAddress,
          owner: wallet.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        },
      });

      await fetchData();
    },
    [wallet, connection, program, fetchData]
  );

  /**
   * Liquidate position
   */
  const liquidatePosition = useCallback(
    async () => {
      if (!wallet.publicKey) throw new WalletNotConnectedError();
      if (!program) throw new Error();

      let instructions: TransactionInstruction[] = [];

      const wSolTreasureAddress = await getWSolTreasureAddress(
        wallet.publicKey
      );
      const wSolTreasureBump = await getWSolTreasureBump(wallet.publicKey);
      const wSolVaultTokenAddress = await getWSolVaultTokenAddress();
      const wSolSynthMintAddress = await getWSolSynthMintAddress();

      if (
        !wSolTreasureAddress ||
        typeof wSolTreasureBump === "undefined" ||
        !wSolVaultTokenAddress ||
        !wSolSynthMintAddress
      )
        throw new Error();

      const {
        ata: userWSolTokenAddress,
        instructions: userWSolTokenInstructions,
      } = await findOrCreateATA({
        connection,
        payer: wallet.publicKey,
        owner: wallet.publicKey,
        mint: W_SOL_MINT_TOKEN,
      });

      instructions.push(...userWSolTokenInstructions);

      const {
        ata: userWSolSynthAddress,
        instructions: userWSolSynthInstructions,
      } = await findOrCreateATA({
        connection,
        payer: wallet.publicKey,
        owner: wallet.publicKey,
        mint: wSolSynthMintAddress,
      });

      instructions.push(...userWSolSynthInstructions);

      if (instructions.length > 0) {
        let transaction = new Transaction({ feePayer: wallet.publicKey });
        transaction.instructions = [...instructions];
        await wallet.sendTransaction(transaction, connection);
      }

      await program.rpc.liquidate({
        accounts: {
          treasure: wSolTreasureAddress,
          userToken: userWSolTokenAddress,
          vault: W_SOL_VAULT,
          vaultToken: wSolVaultTokenAddress,
          synthMint: wSolSynthMintAddress,
          userSynth: userWSolSynthAddress,
          owner: wallet.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      await fetchData();
    },
    [wallet, connection, program, fetchData]
  );

  /** initial fetch */
  useEffect(() => {
    if (!isDataInitializedRef.current) void fetchData();
  }, [fetchData]);

  const value = useMemo(
    () => ({
      magikData: data,
      refetchMagikData: fetchData,
      depositWSol,
      borrowWSol,
      liquidatePosition,
    }),
    [data, fetchData, depositWSol, borrowWSol, liquidatePosition]
  );

  return (
    <MagikDataContext.Provider value={value}>
      {children}
    </MagikDataContext.Provider>
  );
};

export const useMagikData = () => {
  return useContext(MagikDataContext);
};
