import React, {Fragment} from 'react';
import {Route, Routes as Router} from 'react-router';
import Example from './pages/example/Example';
import { HOME } from './constants/routes';

const Routes: React.FC = () => {
  return (
    <Fragment>
      <Router>
        <Route element={<Example />} path={HOME} />
      </Router>
  </Fragment>
  );
};

export default Routes
