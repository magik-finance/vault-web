import styled from "styled-components";

import { Icon } from "../../../components/Icon";

export const TooltipArrow = styled.div``;
export const Tooltip = styled.div``;

export const InfoIcon = styled(Icon).attrs({ type: "info" })`
  width: 16px;
  height: auto;
  color: ${({ theme }) => theme.colors.fadedOutFont};
`;

export const InfoIconButton = styled.button`
  padding: 4px;
  margin: -4px;
`;

export const Container = styled.h1`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
`;
