import styled from "styled-components";

import { Icon } from "../Icon";

export const WalletIcon = styled(Icon).attrs({ type: "wallet" })`
  width: 12px;
  height: auto;
  color: ${({ theme }) => theme.colors.primaryAccent};
  transition: color 0.3s ease;
`;

export const WalletButton = styled.button`
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.border};
  padding: 0 12px;
  height: 36px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.selectedFont};

    & > ${WalletIcon} {
      color: inherit;
    }
  }
`;
