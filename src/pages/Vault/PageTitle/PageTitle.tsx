import { FC } from "react";
import { createPortal } from "react-dom";
import { usePopperTooltip } from "react-popper-tooltip";

import {
  Container,
  InfoIcon,
  InfoIconButton,
  Tooltip,
  TooltipArrow,
} from "./PageTitle.styles";

interface Props {
  className?: string;
  tooltip: string;
}

export const PageTitle: FC<Props> = ({ children, tooltip }) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ placement: "right" });
  return (
    <Container>
      {children}{" "}
      <InfoIconButton type="button" ref={setTriggerRef}>
        <InfoIcon />
      </InfoIconButton>
      {visible
        ? createPortal(
            <Tooltip
              ref={setTooltipRef}
              {...getTooltipProps({ className: "tooltip-container" })}
            >
              <TooltipArrow
                {...getArrowProps({ className: "tooltip-arrow" })}
              />
              {tooltip}
            </Tooltip>,
            document.querySelector("#popper")!
          )
        : null}
    </Container>
  );
};
