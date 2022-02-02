import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  colors: {
    primaryAccent: "#4E27B2",
    pageBackground: "#04020C",
    regularFont: "#FFFFFF",
    fadedOutFont: "#575B6A",
    selectedFont: "#dcaae3",
    border: "#333744",
    buttonGradientStart: "#4700FF",
    buttonGradientMid: "#DB69C2",
    buttonGradientEnd: "#6130DF",
    sliderLine: "#4E27B2",
    sliderDot: "#A590DD",
    sliderLabelBackground: "#4E27B2",
    sliderLabelFont: "#FFFFFF",
    sliderAxisLines: "#333744",
    usdcAccent: "#2775CA",
    mgUsdcAccent: "#6231DF",
  },
  sizing: {
    topNavigationHeightPx: 80,
    pageSidePaddingPx: 96,
    pageMaxWidthPx: 1740 + 96 + 96,
    pageContentMaxWidth: 1144 + 96 + 96,
    cardBorderRadiusPx: 20,
  },
};
