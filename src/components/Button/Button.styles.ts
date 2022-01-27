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
      #4700ff -56%,
      rgba(219, 105, 194, 0.36) 39%,
      #6130df 75%
    ),
    #ffffff;
  background-size: 100% 80px;
  background-position: 0 100%;
  transition: background 0.3s ease;

  &:hover {
    background-position: 0 0%;
  }
`;

export const StyledLink = styled(Link)`
  ${buttonCss};
`;

export const StyledButton = styled.button`
  ${buttonCss};
`;
