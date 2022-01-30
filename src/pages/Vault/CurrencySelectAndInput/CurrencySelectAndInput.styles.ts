import styled from "styled-components";

import { Icon } from "../../../components/Icon";

export const MaxButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
  margin-left: -12px;
  margin-right: -12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.fadedOutFont};
  height: 100%;
  outline: none;

  &:focus,
  &:active {
    outline: none;
  }
`;

export const AmountWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 220px;
  height: 100%;
  padding-right: 12px;
  margin-right: -12px;
  margin-left: auto;
  line-height: 1;
  text-align: right;
`;

export const AmountInput = styled.input.attrs({ type: "number" })`
  margin-left: auto;
  min-width: 220px;
  -moz-appearance: textfield;

  background: transparent;
  border: 0;
  outline: none;
  color: ${({ theme }) => theme.colors.regularFont};
  text-align: right;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const ChevronDownIcon = styled(Icon).attrs({ type: "chevron-down" })`
  width: 24px;
  height: auto;
`;

export const OptionIcon = styled(Icon)`
  width: 24px;
  height: auto;
`;

export const OptionLabel = styled.div`
  font-weight: 500;
`;
