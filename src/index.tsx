import { render } from "react-dom";

import { App } from "./App";
import reportWebVitals from "./reportWebVitals";

const renderApp = () => {
  render(<App />, document.getElementById("root"));
};

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./App", renderApp);
}

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
