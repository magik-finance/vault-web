import styled from "styled-components";

import { Button } from "../../components/Button";
import { Card } from "../../components/Card";

import { CurrencySelect } from "./CurrencySelect";

export const SideCardTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
`;

export const MainCardActionButton = styled(Button)`
  width: 100%;
  justify-content: center;
`;

export const Separator = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StatsLabelRegular = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.fadedOutFont};
`;

export const StatsLabelMedium = styled.div`
  font-weight: 500;
`;

export const StatsLabelBold = styled.div`
  font-weight: 700;
`;

export const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatsTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

export const MainCardDivider = styled.div`
  margin: 24px -44px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SelectCollateralField = styled(CurrencySelect).attrs({
  buttonWidth: "100%",
  menuWidth: "617px",
})`
  margin-top: 54px;
`;

export const SelectCollateralDescription = styled.p`
  font-weight: 500;
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.fadedOutFont};
`;
export const SelectCollateralTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin-top: 40px;
`;

export const SideCard = styled(Card)`
  width: 37%;
`;

export const MainCard = styled(Card)`
  width: 63%;
`;

export const Cards = styled.main`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-top: 24px;
`;

export const InnerContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.sizing.pageContentMaxWidth}px;
  padding: 0 ${({ theme }) => theme.sizing.pageSidePaddingPx}px;
  padding-top: 58px;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;
