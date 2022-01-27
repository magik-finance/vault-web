import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Example from "./pages/example/Example";
import { HOME } from "./constants/routes";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={HOME}>
          <Example />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
