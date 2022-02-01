import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Routes from "./Routes";
import { Layout } from "./components/Layout";
import { WalletWrapper } from "./components/WalletWrapper";
import { MagikDataProvider } from "./state/magik";
import { GlobalStyle } from "./styles/global-style";
import { darkTheme } from "./styles/theme";

export const App: React.FC = () => {
  return (
    <WalletWrapper>
        <BrowserRouter>
          <ThemeProvider theme={darkTheme}>
            <MagikDataProvider>
              <GlobalStyle />
              <Layout>
                <Routes />
              </Layout>
            </MagikDataProvider>
          </ThemeProvider>
        </BrowserRouter>
    </WalletWrapper>
  );
};

export default App;
