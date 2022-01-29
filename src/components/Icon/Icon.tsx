import { FC, SVGProps } from "react";

import { ReactComponent as ArrowRightIcon } from "./icons/arrow-right.svg";
import { ReactComponent as BuyIcon } from "./icons/buy.svg";
import { ReactComponent as ChevronDownIcon } from "./icons/chevron-down.svg";
import { ReactComponent as DiamondHandsIcon } from "./icons/diamond-hands.svg";
import { ReactComponent as InfoIcon } from "./icons/info.svg";
import { ReactComponent as MagikLogoIcon } from "./icons/magik-logo.svg";
import { ReactComponent as SellIcon } from "./icons/sell.svg";
import { ReactComponent as VaultIcon } from "./icons/vault.svg";
import { ReactComponent as WalletIcon } from "./icons/wallet.svg";

const iconComponents = {
  "arrow-right": ArrowRightIcon,
  buy: BuyIcon,
  "chevron-down": ChevronDownIcon,
  "diamond-hands": DiamondHandsIcon,
  info: InfoIcon,
  "magik-logo": MagikLogoIcon,
  sell: SellIcon,
  vault: VaultIcon,
  wallet: WalletIcon,
};

export type IconName = keyof typeof iconComponents;

interface Props extends SVGProps<SVGSVGElement> {
  type: IconName;
}

export const Icon: FC<Props> = ({ type, ...otherProps }) => {
  const Component = iconComponents[type];

  return <Component {...otherProps} />;
};
