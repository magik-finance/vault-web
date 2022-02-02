import styled from "styled-components";

import { ButtonNavLink } from "../../../components/Button";

export const StyledButtonNavLink = styled(ButtonNavLink)`
  padding: 0 24px;

  && {
    height: 40px;
  }
`;
export const Container = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
`;
