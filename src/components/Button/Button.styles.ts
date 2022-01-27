import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const buttonCss = css`
  display: flex;
  align-items: center;
  line-height: 1;
  height: 56px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 9999px;
  background: linear-gradient(
      173deg,
      #4700ff -53.54%,
      rgba(219, 105, 194, 0.36) -2.38%,
      #6130df 63.52%
    ),
    #ffffff;
`;

export const StyledLink = styled(Link)`
  ${buttonCss};
`;

export const StyledButton = styled.button`
  ${buttonCss};
`;
