import styled from "styled-components";

export const LegendLabel = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.fadedOutFont};
`;

export const LegendValue = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

export const LegendRow = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
`;

export const LegendTitle = styled.div`
  font-weight: 500;
  padding-bottom: 3px;
`;

export const Legend = styled.div`
  position: absolute;
  top: 26px;
  right: 0;
`;

export const Container = styled.div`
  position: relative;
`;
