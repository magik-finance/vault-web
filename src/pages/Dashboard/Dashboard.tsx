import { VFC } from "react";

import { IconName } from "../../components/Icon";
import { BORROW, DEPOSIT, LIQUIDATE } from "../../constants/routes";
import { useMagikData } from "../../state/magik";
import { formatCoinNumber } from "../../utils/formatNumber";

import { Chart } from "./Chart";
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
    title: "Deposit into Vault",
    buttonLabel: "Deposit",
    buttonIcon: "sell",
    to: DEPOSIT,
    description: "Deposits will generate yield based on the vault selected",
  },
  {
    title: "Borrow assets",
    buttonLabel: "Borrow",
    buttonIcon: "buy",
    to: BORROW,
    description:
      "Take out an interest-free loan depending on the amount of collateral deposited",
  },
  {
    title: "Liquidate all funds",
    buttonLabel: "Liquidate",
    buttonIcon: "diamond-hands",
    to: LIQUIDATE,
    description: "Magik will immediately return all deposits after liquidation",
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
                <StatsValue>
                  {formatCoinNumber("usdc", deposited ?? 0)}
                </StatsValue>
              </Stats>
              <Stats>
                <StatsLabel>Max Utilization</StatsLabel>
                <StatsValue>50%</StatsValue>
              </Stats>
            </StatsRow>
            <Chart />
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
