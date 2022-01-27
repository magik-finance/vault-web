import { Action } from "redux-actions";

import * as actions from "./actions";
import initialState from "./initialState";
import { ClubsT } from "./types";

const reducer = (state: ClubsT = initialState, action: Action<any>): ClubsT => {
  const { type } = action;
  switch (type) {
    case actions.FETCH_CLUBS:
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
};

export default reducer;
