import { VFC } from "react";

import { GoBack } from "../GoBack";
import { PageTitle } from "../PageTitle";
import {
  Cards,
  Container,
  InnerContainer,
  MainCard,
  SideCard,
} from "../Vault.styles";
import { VaultMenu } from "../VaultMenu";

export const Deposit: VFC = () => (
  <Container>
    <GoBack />
    <InnerContainer>
      <VaultMenu />
      <Cards>
        <MainCard>
          <PageTitle tooltip="Deposit">Deposit</PageTitle>
        </MainCard>
        <SideCard></SideCard>
      </Cards>
    </InnerContainer>
  </Container>
);
