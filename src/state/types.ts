import { Coin } from "../constants/solana";
import { Deposit, Loan } from "../utils/useLocalStorage";

import { BorrowProps } from "./useBorrow";
import { DepositProps } from "./useDeposit";
import { LiquidateProps } from "./useLiquidate";

export interface MagikCoinData {
  balance?: number;
  currentDeposit?: number;
  currentBorrow?: number;
}

export interface MagikData extends Record<Coin, MagikCoinData> {
  solBalance?: number;
}

export interface MagikDataContextValue {
  magikData: MagikData;
  deposits: Deposit[];
  loans: Loan[];
  refetchMagikData: () => void;
  deposit: (props: DepositProps) => Promise<void>;
  borrow: (props: BorrowProps) => Promise<void>;
  liquidate: (props: LiquidateProps) => Promise<void>;
}
