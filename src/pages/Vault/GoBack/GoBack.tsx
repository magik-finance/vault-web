import { VFC } from "react";

import { HOME } from "../../../constants/routes";

import {
  Container,
  GoBackIcon,
  InnerWrapper,
  StyledLink,
} from "./GoBack.styles";

export const GoBack: VFC<{ className?: string }> = ({ className }) => (
  <Container className={className}>
    <InnerWrapper>
      <StyledLink to={HOME}>
        <GoBackIcon /> Go back
      </StyledLink>
    </InnerWrapper>
  </Container>
);
