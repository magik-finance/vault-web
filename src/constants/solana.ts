import { PublicKey } from "@solana/web3.js";

import { IconName } from "../components/Icon";

export const MAGIK_PROGRAM_ID = new PublicKey(
  "CmHZHMPRfsNpYZe1YUJA59EaCfZiQqJAyBrx9oA3QtCg"
);
export const USDC_VAULT = new PublicKey(
  "GvTug7AAsEMTgeAoGQKuNZqXexpBnEbiuMmvRGFMLfDr"
);
export const W_SOL_VAULT = new PublicKey(
  "5Acwv2Sztq8vZJnMVLEXZw3rL6by8CHhU8BMmuX1ELog"
);
export const USDC_MINT_TOKEN = new PublicKey(
  "G6YKv19AeGZ6pUYUwY9D7n4Ry9ESNFa376YqwEkUkhbi"
);
export const W_SOL_MINT_TOKEN = new PublicKey(
  "So11111111111111111111111111111111111111112"
);
export const LENDING_MARKET = new PublicKey(
  "H27Quk3DSbu55T4dCr1NddTTSAezXwHU67FPCZVKLhSW"
);

export type Coin = "usdc" | "wsol";

export const coins: Coin[] = ["usdc", "wsol"];

export interface CoinConfig {
  vault: PublicKey;
  mintToken: PublicKey;
  decimalPlaces: number;
  label: string;
  mgLabel: string;
  coinIcon: IconName;
}

export const coinConfigs: Record<Coin, CoinConfig> = {
  usdc: {
    vault: USDC_VAULT,
    mintToken: USDC_MINT_TOKEN,
    decimalPlaces: 6,
    label: "USDC",
    mgLabel: "mgUSD",
    coinIcon: "usd-coin",
  },
  wsol: {
    vault: W_SOL_VAULT,
    mintToken: W_SOL_MINT_TOKEN,
    decimalPlaces: 9,
    label: "SOL",
    mgLabel: "mgSOL",
    coinIcon: "solana-coin",
  },
};
