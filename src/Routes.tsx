import React from "react";
import { Route, Switch } from "react-router-dom";

import { HOME } from "./constants/routes";
import { Dashboard } from "./pages/Dashboard";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={HOME}>
        <Dashboard />
      </Route>
    </Switch>
  );
};

export default Routes;
