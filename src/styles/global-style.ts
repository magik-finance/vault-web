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
`;

export const GlobalStyle = createGlobalStyle`
  ${globalCss};
`;
