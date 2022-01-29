import styled from "styled-components";

export const MenuItem = styled.button`
  width: 100%;
  display: flex;
  padding: 18px 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 0;

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    border-top-left-radius: calc(58px / 2);
    border-top-right-radius: calc(58px / 2);
  }

  &:last-child {
    border-bottom-left-radius: calc(58px / 2);
    border-bottom-right-radius: calc(58px / 2);
  }
`;

export const Menu = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.pageBackground};
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

export const SelectFieldButton = styled.button`
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
