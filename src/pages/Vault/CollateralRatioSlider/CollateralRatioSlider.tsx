import { ComponentProps, VFC } from "react";

import {
  MarkValue,
  MarkContainer,
  MarkLine,
  StyledSliderWithTooltip,
  SliderWithTooltip,
} from "./CollateralRatioSlider.styles";

interface MarkProps {
  value?: number;
  isFirst?: boolean;
  isLast?: boolean;
}

const Mark: VFC<MarkProps> = ({ value, isFirst, isLast }) => (
  <MarkContainer isFirst={isFirst} isLast={isLast}>
    <MarkLine />
    {typeof value !== "undefined" ? <MarkValue>{value}%</MarkValue> : null}
  </MarkContainer>
);

const marksWithValuesToShow = [0, 25, 50];
const markValues = [...new Array(100 - 50 + 1)]
  .map((_, index) => index)
  .filter((value) => value % 5 === 0);
const marks = markValues.reduce(
  (sum, value, index) => ({
    ...sum,
    [value]: (
      <Mark
        value={marksWithValuesToShow.includes(value) ? value : undefined}
        isFirst={index === 0}
        isLast={index === markValues.length - 1}
      />
    ),
  }),
  {}
);

const tipFormatter = (value: number) => `${value}%`;

export const CollateralRatioSlider: VFC<
  ComponentProps<typeof SliderWithTooltip>
> = (props) => (
  <StyledSliderWithTooltip
    min={0}
    max={50}
    step={1}
    defaultValue={25}
    marks={marks}
    tipFormatter={tipFormatter}
    railStyle={{ backgroundColor: "#4E27B2" }}
    trackStyle={{ backgroundColor: "#4E27B2" }}
    handleStyle={{
      border: "4px solid #030109",
      height: 21,
      width: 21,
      backgroundColor: "#A590DD",
      marginTop: -9,
    }}
    dotStyle={{ display: "none" }}
    style={{ marginBottom: 42 }}
    {...props}
  />
);
