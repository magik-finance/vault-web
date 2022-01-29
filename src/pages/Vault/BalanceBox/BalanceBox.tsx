import { VFC } from "react";

import { IconName } from "../../../components/Icon";

import {
  Amount,
  BalanceWrapper,
  Container,
  Currency,
  CurrencyIcon,
  Label,
} from "./BalanceBox.styles";

interface Props {
  currencyIcon: IconName;
  amount: string;
  currency: string;
  label: string;
}

export const BalanceBox: VFC<Props> = ({
  currencyIcon,
  amount,
  currency,
  label,
}) => (
  <Container>
    <BalanceWrapper>
      <CurrencyIcon type={currencyIcon} />
      <Amount>{amount}</Amount>
      <Currency>{currency}</Currency>
    </BalanceWrapper>
    <Label>{label}</Label>
  </Container>
);
