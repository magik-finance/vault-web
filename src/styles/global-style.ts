import { createGlobalStyle, css } from "styled-components";

import { fontsCss } from "./fonts-css";
import { normalizeCss } from "./normalize-css";

const globalCss = css`
  ${normalizeCss};
  ${fontsCss};

  html {
    margin: 0;
    box-sizing: border-box;
    font-family: "Gilmer", "Helvetica", "Arial", "sans-serif";
  }

  body {
    color: ${({ theme }) => theme.colors.regularFont};
    background: ${({ theme }) => theme.colors.pageBackground};
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  a {
    color: inherit;
    text-decoration: inherit;

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.selectedFont};
    }
  }

  button,
  input[type="submit"],
  input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.selectedFont};
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${globalCss};
`;
