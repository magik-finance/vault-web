import Slider, { createSliderWithTooltip } from "rc-slider";
import styled from "styled-components";

export const MarkValue = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.fadedOutFont};
`;
export const MarkLine = styled.div`
  height: 16px;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;
export const MarkContainer = styled.div<{
  isFirst?: boolean;
  isLast?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;

  > ${MarkValue} {
    margin-left: ${({ isFirst }) => (isFirst ? "100%" : null)};
    margin-right: ${({ isLast }) => (isLast ? "100%" : null)};
  }
`;

const SliderWithTooltip = createSliderWithTooltip(Slider);

export const StyledSliderWithTooltip = styled(SliderWithTooltip)`
  .rc-slider-tooltip-inner {
    background-color: ${({ theme }) => theme.colors.primaryAccent};
    box-shadow: none;
    min-width: 82px;
    height: 30px;
    font-size: 12px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 1;
    padding: 2px 0 0 0;
    margin: 0;
  }

  .rc-slider-tooltip-placement-top .rc-slider-tooltip-arrow {
    border-top-color: ${({ theme }) => theme.colors.primaryAccent};
  }
`;
