import { Link } from "react-router-dom";
import styled from "styled-components";

import { Icon } from "../../../components/Icon";

export const GoBackIcon = styled(Icon).attrs({ type: "arrow-right" })`
  transform: rotate(180deg);
  width: 16px;
  height: auto;
  color: ${({ theme }) => theme.colors.regularFont};
  margin-bottom: 2px;
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.fadedOutFont};
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  padding: 4px 8px;
  margin-left: -4px;
`;

export const InnerWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.sizing.pageMaxWidthPx}px;
  padding: 0 ${({ theme }) => theme.sizing.pageSidePaddingPx}px;
  display: flex;
  align-items: center;
  height: 40px;
`;

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;
