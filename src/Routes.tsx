import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { HOME, VAULT } from "./constants/routes";
import { Dashboard } from "./pages/Dashboard";
import { Vault } from "./pages/Vault";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={HOME} exact={true}>
        <Dashboard />
      </Route>
      <Route path={VAULT}>
        <Vault />
      </Route>
      <Route path="*">
        <Redirect to={HOME} />
      </Route>
    </Switch>
  );
};

export default Routes;
