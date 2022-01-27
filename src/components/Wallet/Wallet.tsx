import { ComponentProps, VFC } from "react";

import { WalletButton, WalletIcon } from "./Wallet.styles";

export const Wallet: VFC<ComponentProps<typeof WalletButton>> = (
  walletProps
) => (
  <WalletButton {...walletProps}>
    Connect wallet
    <WalletIcon />
  </WalletButton>
);
