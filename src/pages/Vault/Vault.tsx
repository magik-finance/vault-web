import { VFC } from "react";
import { Redirect, Route, Switch } from "react-router";

import { BORROW, DEPOSIT, LIQUIDATE } from "../../constants/routes";

import { Borrow } from "./Borrow";
import { Deposit } from "./Deposit";
import { Liquidate } from "./Liquidate";

export const Vault: VFC = () => (
  <Switch>
    <Route path={DEPOSIT} exact={true}>
      <Deposit />
    </Route>
    <Route path={BORROW} exact={true}>
      <Borrow />
    </Route>
    <Route path={LIQUIDATE} exact={true}>
      <Liquidate />
    </Route>
    <Route path="*">
      <Redirect to={DEPOSIT} />
    </Route>
  </Switch>
);
