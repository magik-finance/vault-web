import React from "react";
import { Route, Switch } from "react-router-dom";

import { HOME } from "./constants/routes";
import Example from "./pages/example/Example";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={HOME}>
        <Example />
      </Route>
    </Switch>
  );
};

export default Routes;
