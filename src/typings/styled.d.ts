import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Record<
      | "primaryAccent"
      | "pageBackground"
      | "regularFont"
      | "fadedOutFont"
      | "selectedFont"
      | "border"
      | "buttonGradientStart"
      | "buttonGradientMid"
      | "buttonGradientEnd"
      | "sliderLine"
      | "sliderDot"
      | "sliderLabelBackground"
      | "sliderLabelFont"
      | "sliderAxisLines"
      | "usdcAccent"
      | "mgUsdcAccent",
      string
    >;
    sizing: Record<
      | "topNavigationHeightPx"
      | "pageSidePaddingPx"
      | "pageMaxWidthPx"
      | "pageContentMaxWidth"
      | "cardBorderRadiusPx",
      number
    >;
  }
}
