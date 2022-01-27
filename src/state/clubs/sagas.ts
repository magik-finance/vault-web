import { SagaIterator } from "redux-saga";
import { all, takeLatest } from "redux-saga/effects";

import * as actions from "./actions";

export function* fetchClubs$(): SagaIterator {
  try {
    // @ts-ignore
    yield console.log("Try placeholder");
  } catch {
    // @ts-ignore
    console.log("Catch placeholder");
  }
}

const sagas = function* (): SagaIterator {
  yield all([takeLatest(actions.fetchClubs, fetchClubs$)]);
};

export default sagas;
