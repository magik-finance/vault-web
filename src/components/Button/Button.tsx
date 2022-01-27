import { ComponentProps, FC } from "react";

import { Container } from "./Button.styles";

export const Button: FC<ComponentProps<typeof Container>> = ({
  children,
  className,
  ...otherProps
}) => (
  <Container className={className} {...otherProps}>
    {children}
  </Container>
);
