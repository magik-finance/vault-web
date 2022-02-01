import { Program, Provider, BN } from "@project-serum/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
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
  MAGIK_PROGRAM_ID,
  W_SOL_MINT_TOKEN,
  W_SOL_VAULT,
} from "../constants/solana";
import { VaultIdl } from "../interfaces/vault";

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

export interface MagikData {
  wSolCurrentDeposit?: BN;
  wSolCurrentBorrow?: BN;
}

export interface MagikDataContextValue {
  magikData: MagikData;
  refetchMagikData: () => void;
  depositWSol: (props: DepositProps) => Promise<void>;
}

export const MagikDataContext = createContext<MagikDataContextValue>(
  {} as MagikDataContextValue
);

const defaultData: MagikData = {};

interface DepositProps {
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

    setData((previousData) => ({
      ...previousData,
      wSolCurrentDeposit,
      wSolCurrentBorrow,
    }));

    isDataInitializedRef.current = true;
  }, [wallet, program, setData]);

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

  /** initial fetch */
  useEffect(() => {
    if (!isDataInitializedRef.current) fetchData();
  }, [fetchData]);

  const value = useMemo(
    () => ({ magikData: data, refetchMagikData: fetchData, depositWSol }),
    [data, fetchData, depositWSol]
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
