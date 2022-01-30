import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Routes from "./Routes";
import { Layout } from "./components/Layout";
import { WalletWrapper } from "./components/WalletWrapper";
import configureStore from "./state";
import { GlobalStyle } from "./styles/global-style";
import { darkTheme } from "./styles/theme";

const store = configureStore();

export const App: React.FC = () => {
  return (
    <WalletWrapper>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={darkTheme}>
            <GlobalStyle />
            <Layout>
              <Routes />
            </Layout>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </WalletWrapper>
  );
};

export default App;
