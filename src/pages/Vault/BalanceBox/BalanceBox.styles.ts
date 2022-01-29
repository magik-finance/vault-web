import styled from "styled-components";

import { Icon } from "../../../components/Icon";

export const Label = styled.div`
  padding-left: 68px;
  font-size: 14px;
  margin-top: 6px;
`;

export const Currency = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.fadedOutFont};
  margin: 8px 0 0 8px;
`;

export const Amount = styled.div`
  margin-left: 24px;
  font-size: 28px;
  font-weight: 500;
`;

export const CurrencyIcon = styled(Icon)`
  width: 44px;
  height: auto;
`;

export const BalanceWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 20px 24px 14px;
`;
