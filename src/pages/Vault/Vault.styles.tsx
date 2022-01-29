import styled from "styled-components";

import { Card } from "../../components/Card";

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
