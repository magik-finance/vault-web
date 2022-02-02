import styled from "styled-components";

import { Icon } from "../../../components/Icon";

export const AmountLabelWrapper = styled.div`
  margin-left: 12px;
  color: ${({ theme }) => theme.colors.fadedOutFont};
`;

export const AmountWrapper = styled.div`
  margin-left: auto;
`;

export const ChevronDownIcon = styled(Icon).attrs({ type: "chevron-down" })`
  width: 24px;
  height: auto;
`;

export const OptionIcon = styled(Icon)`
  width: 24px;
  height: auto;
`;
