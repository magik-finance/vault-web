import { BN } from "@project-serum/anchor";

import { Coin } from "../constants/solana";

import { BorrowProps } from "./useBorrow";
import { DepositProps } from "./useDeposit";
import { LiquidateProps } from "./useLiquidate";

export interface MagikCoinData {
  balance?: BN;
  currentDeposit?: BN;
  currentBorrow?: BN;
}

export interface MagikData extends Record<Coin, MagikCoinData> {
  solBalance?: BN;
}

export interface MagikDataContextValue {
  magikData: MagikData;
  refetchMagikData: () => void;
  deposit: (props: DepositProps) => Promise<void>;
  borrow: (props: BorrowProps) => Promise<void>;
  liquidate: (props: LiquidateProps) => Promise<void>;
}
