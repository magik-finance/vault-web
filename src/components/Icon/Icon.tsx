import { FC, SVGProps } from "react";

import { ReactComponent as MagikLogoIcon } from "./icons/magik-logo.svg";

const iconComponents = {
  "magik-logo": MagikLogoIcon,
};

export type IconName = keyof typeof iconComponents;

interface Props extends SVGProps<SVGSVGElement> {
  type: IconName;
}

export const Icon: FC<Props> = ({ type, ...otherProps }) => {
  const Component = iconComponents[type];

  return <Component {...otherProps} />;
};
