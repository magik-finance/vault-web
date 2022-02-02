import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useLocalStorage } from "../utils/useLocalStorage";

import { MagikData, MagikDataContextValue } from "./types";
import { useBorrow } from "./useBorrow";
import { useDeposit } from "./useDeposit";
import { useFetchData } from "./useFetchData";
import { useLiquidate } from "./useLiquidate";
import { useProgram } from "./utilities";

export const MagikDataContext = createContext<MagikDataContextValue>(
  {} as MagikDataContextValue
);

const defaultData: MagikData = { usdc: {}, wsol: {} };

export const MagikDataProvider: FC = ({ children }) => {
  const isDataInitializedRef = useRef(false);
  const [data, setData] = useState<MagikData>(defaultData);
  const [deposits, setDeposits] = useLocalStorage("deposits");
  const { connection } = useConnection();
  const wallet = useWallet();
  const program = useProgram();

  const fetchData = useFetchData({
    wallet,
    connection,
    program,
    setData,
    isDataInitializedRef,
  });
  const deposit = useDeposit({
    wallet,
    connection,
    program,
    fetchData,
    setDeposits,
  });
  const borrow = useBorrow({ wallet, connection, program, fetchData });
  const liquidate = useLiquidate({ wallet, connection, program, fetchData });

  /** initial fetch */
  useEffect(() => {
    if (!isDataInitializedRef.current) void fetchData();
  }, [fetchData]);

  const value = useMemo(
    () => ({
      magikData: data,
      deposits: deposits ?? [],
      refetchMagikData: fetchData,
      deposit,
      borrow,
      liquidate,
    }),
    [data, deposits, fetchData, deposit, borrow, liquidate]
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
