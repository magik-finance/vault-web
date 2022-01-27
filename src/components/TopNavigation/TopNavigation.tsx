import { VFC } from "react";

import { Container, InnerContainer, StyledIcon } from "./TopNavigation.styles";

export const TopNavigation: VFC = () => (
  <Container>
    <InnerContainer>
      <StyledIcon type="magik-logo" />
    </InnerContainer>
  </Container>
);
