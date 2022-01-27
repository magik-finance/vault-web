import { VFC } from "react";

import {
  Cards,
  Container,
  DetailsLabel,
  DetailsRow,
  DetailsTitle,
  DetailsValue,
  InnerContainer,
  MainCard,
  PageTitle,
  SectionDescription,
  SectionTitle,
  SideCard,
  Stats,
  StatsLabel,
  StatsRow,
  StatsValue,
} from "./Dashboard.styles";

export const Dashboard: VFC = () => (
  <Container>
    <InnerContainer>
      <Cards>
        <MainCard>
          <PageTitle>Dashboard</PageTitle>
          <SectionTitle>Overview</SectionTitle>
          <SectionDescription>
            Get quick insights off all your current loans
          </SectionDescription>
          <StatsRow>
            <Stats>
              <StatsLabel>Borrowed amount</StatsLabel>
              <StatsValue>$ 20.000</StatsValue>
            </Stats>
            <Stats>
              <StatsLabel>Amount left to borrow</StatsLabel>
              <StatsValue>$ 20.000</StatsValue>
            </Stats>
          </StatsRow>
          <StatsRow>
            <Stats>
              <StatsLabel>Collateral deposited</StatsLabel>
              <StatsValue>$ 80.000</StatsValue>
            </Stats>
            <Stats>
              <StatsLabel>Utilization %</StatsLabel>
              <StatsValue>50%</StatsValue>
            </Stats>
          </StatsRow>
          <DetailsTitle>Details</DetailsTitle>
          <DetailsRow>
            <DetailsLabel>Borrow limit</DetailsLabel>
            <DetailsValue>$ 20.000</DetailsValue>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>Current APY</DetailsLabel>
            <DetailsValue>12.14%</DetailsValue>
          </DetailsRow>
        </MainCard>
        <SideCard></SideCard>
      </Cards>
    </InnerContainer>
  </Container>
);
