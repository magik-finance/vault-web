import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Routes from "./Routes";
import configureStore from "./state";
import { GlobalStyle } from "./styles/global-style";
import { darkTheme } from "./styles/theme";

const store = configureStore();

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <GlobalStyle />
          <Routes />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
