import styled from "styled-components";

import { ButtonLink } from "../../components/Button";
import { Card } from "../../components/Card";
import { Icon } from "../../components/Icon";

export const SideCardDescription = styled.p`
  margin-top: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.fadedOutFont};
`;
export const SideCardButtonIconRight = styled(Icon).attrs({
  type: "arrow-right",
})`
  margin-right: -6px;
  margin-left: auto;
  width: 24px;
  height: auto;
`;
export const SideCardButtonIconLeft = styled(Icon)`
  margin-left: -6px;
  width: 24px;
  height: auto;
`;
export const SideCardButton = styled(ButtonLink)`
  width: 100%;
  margin-top: 28px;
  gap: 12px;
`;
export const SideCardTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
`;
export const SideCardSection = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 24px;

  &:last-child {
    border: none;
    padding-bottom: 0;
  }
`;
export const SideCardSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DetailsValue = styled.div`
  font-weight: 500;
  line-height: 1;
`;
export const DetailsLabel = styled.div`
  font-weight: 500;
  line-height: 1;
  color: ${({ theme }) => theme.colors.fadedOutFont};
`;
export const DetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 8px;
`;
export const DetailsTitle = styled.h3`
  margin-top: 44px;
  font-weight: 500;
  font-size: 18px;
  line-height: 1;
`;
export const StatsValue = styled.div`
  font-size: 32px;
  line-height: 1;
`;
export const StatsLabel = styled.div`
  font-weight: 500;
  line-height: 1;
`;
export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 250px;
`;
export const StatsRow = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
`;
export const SectionDescription = styled.p`
  color: ${({ theme }) => theme.colors.fadedOutFont};
  margin-top: 12px;
  margin-bottom: 24px;
`;
export const SectionTitle = styled.h3`
  margin-top: 44px;
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
`;
export const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 500;
  line-height: 1;
`;

export const SideCard = styled(Card)`
  width: 37%;
  padding: 24px 32px;
`;

export const MainCard = styled(Card)`
  width: 63%;
`;

export const Cards = styled.main`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 24px;
`;

export const InnerContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.sizing.pageContentMaxWidth}px;
  padding: 0 ${({ theme }) => theme.sizing.pageSidePaddingPx}px;
  padding-top: 58px;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
