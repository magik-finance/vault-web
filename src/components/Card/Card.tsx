import { ComponentProps, FC } from "react";

import { Container } from "./Card.styles";

export const Card: FC<ComponentProps<typeof Container>> = ({
  children,
  className,
  ...otherProps
}) => (
  <Container className={className} {...otherProps}>
    {children}
  </Container>
);
