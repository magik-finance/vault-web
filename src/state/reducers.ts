import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import clubs from "./clubs/reducer";

const reducers = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    clubs,
  });

export default reducers;
