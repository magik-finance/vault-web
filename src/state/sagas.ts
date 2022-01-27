import { all } from "redux-saga/effects";

import clubsSaga from "./clubs/sagas";

const sagas = function* () {
  yield all([clubsSaga()]);
};

export default sagas;
