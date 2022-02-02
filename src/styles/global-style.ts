import { createGlobalStyle, css } from "styled-components";
import "react-popper-tooltip/dist/styles.css";
import "rc-slider/assets/index.css";
import "@solana/wallet-adapter-react-ui/styles.css";

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

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }

  p {
    margin: 0;
    padding: 0;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${globalCss};
`;
