import { VFC } from "react";

import { IconName } from "../../components/Icon";
import { BORROW, DEPOSIT, LIQUIDATE } from "../../constants/routes";
import { useMagikData } from "../../state/magik";
import { formatCoinNumber } from "../../utils/formatNumber";

import {
  Cards,
  Container,
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

interface SideCardSectionType {
  title: string;
  buttonLabel: string;
  buttonIcon: IconName;
  to: string;
  description: string;
}

const sideCardSections: SideCardSectionType[] = [
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

export const Dashboard: VFC = () => {
  const { magikData } = useMagikData();

  const borrowed = magikData.usdc.currentBorrow ?? 0;
  const leftToBorrow =
    (magikData.usdc.currentDeposit ?? 0) * 0.5 -
    (magikData.usdc.currentBorrow ?? 0);
  const deposited = magikData.usdc.currentDeposit;

  return (
    <Container>
      <InnerContainer>
        <Cards>
          <MainCard>
            <PageTitle>Dashboard</PageTitle>
            <SectionTitle>Overview</SectionTitle>
            <SectionDescription>
              Get a snapshot of your existing positions
            </SectionDescription>
            <StatsRow>
              <Stats>
                <StatsLabel>Borrowed amount</StatsLabel>
                <StatsValue>{formatCoinNumber("usdc", borrowed)}</StatsValue>
              </Stats>
              <Stats>
                <StatsLabel>Amount left to borrow</StatsLabel>
                <StatsValue>
                  {formatCoinNumber("usdc", leftToBorrow)}
                </StatsValue>
              </Stats>
            </StatsRow>
            <StatsRow>
              <Stats>
                <StatsLabel>Collateral deposited</StatsLabel>
                <StatsValue>{formatCoinNumber("usdc", deposited)}</StatsValue>
              </Stats>
              <Stats>
                <StatsLabel>Max Utilization</StatsLabel>
                <StatsValue>50%</StatsValue>
              </Stats>
            </StatsRow>
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
};
