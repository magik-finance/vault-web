import styled from "styled-components";

import { Icon } from "../Icon";

export const StyledIcon = styled(Icon)`
  width: 89px;
  height: auto;
`;

export const InnerContainer = styled.div`
  width: 100%;
  max-width: calc(1740px + 96px + 96px);
  padding: 0 96px;
  height: 80px;
  display: flex;
  align-items: center;
`;

export const Container = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
