import { css } from "styled-components";

import GilmerBoldOtf from "./GilmerBold.otf";
import GilmerBoldTtf from "./GilmerBold.ttf";
import GilmerBoldWoff from "./GilmerBold.woff";
import GilmerBoldWoff2 from "./GilmerBold.woff2";
import GilmerHeavyOtf from "./GilmerHeavy.otf";
import GilmerHeavyTtf from "./GilmerHeavy.ttf";
import GilmerHeavyWoff from "./GilmerHeavy.woff";
import GilmerHeavyWoff2 from "./GilmerHeavy.woff2";
import GilmerLightOtf from "./GilmerLight.otf";
import GilmerLightTtf from "./GilmerLight.ttf";
import GilmerLightWoff from "./GilmerLight.woff";
import GilmerLightWoff2 from "./GilmerLight.woff2";
import GilmerMediumOtf from "./GilmerMedium.otf";
import GilmerMediumTtf from "./GilmerMedium.ttf";
import GilmerMediumWoff from "./GilmerMedium.woff";
import GilmerMediumWoff2 from "./GilmerMedium.woff2";
import GilmerRegularOtf from "./GilmerRegular.otf";
import GilmerRegularTtf from "./GilmerRegular.ttf";
import GilmerRegularWoff from "./GilmerRegular.woff";
import GilmerRegularWoff2 from "./GilmerRegular.woff2";

export const fontsCss = css`
  @font-face {
    font-family: "Gilmer";
    src: url(${GilmerLightWoff2}) format("woff2"),
      url(${GilmerLightWoff}) format("woff"),
      url(${GilmerLightOtf}) format("opentype"),
      url(${GilmerLightTtf}) format("truetype");
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Gilmer";
    src: url(${GilmerRegularWoff2}) format("woff2"),
      url(${GilmerRegularWoff}) format("woff"),
      url(${GilmerRegularOtf}) format("opentype"),
      url(${GilmerRegularTtf}) format("truetype");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Gilmer";
    src: url(${GilmerMediumWoff2}) format("woff2"),
      url(${GilmerMediumWoff}) format("woff"),
      url(${GilmerMediumOtf}) format("opentype"),
      url(${GilmerMediumTtf}) format("truetype");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Gilmer";
    src: url(${GilmerBoldWoff2}) format("woff2"),
      url(${GilmerBoldWoff}) format("woff"),
      url(${GilmerBoldOtf}) format("opentype"),
      url(${GilmerBoldTtf}) format("truetype");
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Gilmer";
    src: url(${GilmerHeavyWoff2}) format("woff2"),
      url(${GilmerHeavyWoff}) format("woff"),
      url(${GilmerHeavyOtf}) format("opentype"),
      url(${GilmerHeavyTtf}) format("truetype");
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }
`;
