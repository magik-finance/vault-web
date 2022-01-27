import { VFC } from "react";

import {
  Cards,
  Container,
  InnerContainer,
  MainCard,
  SideCard,
} from "./Dashboard.styles";

export const Dashboard: VFC = () => (
  <Container>
    <InnerContainer>
      <Cards>
        <MainCard></MainCard>
        <SideCard></SideCard>
      </Cards>
    </InnerContainer>
  </Container>
);
