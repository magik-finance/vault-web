import { FC } from "react";

import { TopNavigation } from "../TopNavigation/TopNavigation";

import { Container, ContentWrapper } from "./Layout.styles";

export const Layout: FC = ({ children }) => (
  <Container>
    <TopNavigation />
    <ContentWrapper>{children}</ContentWrapper>
  </Container>
);
