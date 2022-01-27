import styled from "styled-components";

import { Card } from "../../components/Card";

export const SideCard = styled(Card)`
  width: 37%;
`;
export const MainCard = styled(Card)`
  width: 63%;
`;
export const Cards = styled.div`
  width: 100%;
  display: flex;
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
