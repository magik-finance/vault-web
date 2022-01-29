import { ComponentProps, FC } from "react";

import { StyledButton, StyledLink, StyledNavLink } from "./Button.styles";

export const Button: FC<ComponentProps<typeof StyledButton>> = ({
  children,
  ...otherProps
}) => <StyledButton {...otherProps}>{children}</StyledButton>;

export const ButtonLink: FC<ComponentProps<typeof StyledLink>> = ({
  children,
  ...otherProps
}) => <StyledLink {...otherProps}>{children}</StyledLink>;

export const ButtonNavLink: FC<ComponentProps<typeof StyledNavLink>> = ({
  children,
  ...otherProps
}) => <StyledNavLink {...otherProps}>{children}</StyledNavLink>;
