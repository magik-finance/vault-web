import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ComponentProps, VFC } from "react";

import { WalletButton } from "./Wallet.styles";
export const Wallet: VFC<ComponentProps<typeof WalletButton>> = (
  walletProps
) => (
  <WalletButton {...walletProps}>
    <WalletMultiButton />
  </WalletButton>
);
