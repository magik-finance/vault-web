import { VFC } from "react";

import { IconName } from "../../components/Icon";
import { BORROW, DEPOSIT, LIQUIDATE } from "../../constants/routes";

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
  SideCardButton,
  SideCardButtonIconLeft,
  SideCardButtonIconRight,
  SideCardDescription,
  SideCardSection,
  SideCardSections,
  SideCardTitle,
  Stats,
  StatsLabel,
  StatsRow,
  StatsValue,
} from "./Dashboard.styles";

interface SideCardSection {
  title: string;
  buttonLabel: string;
  buttonIcon: IconName;
  to: string;
  description: string;
}

const sideCardSections: SideCardSection[] = [
  {
    title: "Deposit collateral",
    buttonLabel: "Deposit collateral",
    buttonIcon: "sell",
    to: DEPOSIT,
    description: "Collateral assets may affect the minimum collateral ratio",
  },
  {
    title: "Borrow assets",
    buttonLabel: "Borrow assets",
    buttonIcon: "buy",
    to: BORROW,
    description: "Get a loan based on the deposited collateral",
  },
  {
    title: "Liquidate all funds",
    buttonLabel: "Liquidate all funds",
    buttonIcon: "diamond-hands",
    to: LIQUIDATE,
    description: "Liquidating is immediate, your funds are back in your wallet",
  },
];

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
        <SideCard>
          <SideCardSections>
            {sideCardSections.map(
              ({ title, buttonLabel, buttonIcon, to, description }) => (
                <SideCardSection key={title}>
                  <SideCardTitle>{title}</SideCardTitle>
                  <SideCardButton to={to}>
                    <SideCardButtonIconLeft type={buttonIcon} />
                    {buttonLabel}
                    <SideCardButtonIconRight />
                  </SideCardButton>
                  <SideCardDescription>{description}</SideCardDescription>
                </SideCardSection>
              )
            )}
          </SideCardSections>
        </SideCard>
      </Cards>
    </InnerContainer>
  </Container>
);
