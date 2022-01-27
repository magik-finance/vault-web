import styled from "styled-components";

export const Container = styled.div`
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizing.cardBorderRadiusPx}px;
  padding: 44px;
`;
