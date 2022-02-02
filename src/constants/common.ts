import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

const DEVNET_URL = "";
const MAINNET_URL = "";

export const ACTIVE_NETWORK = {
  NAME: WalletAdapterNetwork.Mainnet,
  URL: MAINNET_URL,
};

export const NOTIFICATION_TYPE = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};
