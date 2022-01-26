import React from 'react';
import Routes from './Routes';
import { Provider } from 'react-redux';
import configureStore from './state';

const store = configureStore();

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
