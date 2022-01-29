import styled from "styled-components";

import { Icon } from "../../../components/Icon";

export const MenuItem = styled.button`
  width: 100%;
  display: flex;
  padding: 18px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:first-child {
    border-top-left-radius: calc(58px / 2);
    border-top-right-radius: calc(58px / 2);
  }

  &:last-child {
    border-bottom: 0px;
    border-bottom-left-radius: calc(58px / 2);
    border-bottom-right-radius: calc(58px / 2);
  }
`;

export const Menu = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.pageBackground};
  outline: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: calc(58px / 2);
  margin-top: 4px;

  &.fade-enter {
    opacity: 0;
    margin-top: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    margin-top: 4px;
    transition: opacity 300ms, margin 300ms;
  }

  &.fade-exit {
    opacity: 1;
    margin-top: 4px;
  }

  &.fade-exit-active {
    opacity: 0;
    margin-top: 8px;
    transition: opacity 300ms, margin 300ms;
  }
`;

export const ChevronDownIcon = styled(Icon).attrs({ type: "chevron-down" })`
  width: 24px;
  height: auto;
  padding: 0 24px;
`;

export const VaultIcon = styled(Icon).attrs({ type: "vault" })`
  width: 24px;
  height: auto;
`;

export const SelectVaultButton = styled.button`
  width: 350px;
  height: 58px;
  outline: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
  font-weight: 500;
  overflow: hidden;
`;
