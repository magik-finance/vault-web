import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";

import clubs from "./clubs/reducer";

const reducers = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    clubs,
  });

export default reducers;
