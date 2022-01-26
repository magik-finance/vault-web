import { all } from 'redux-saga/effects';
import clubsSaga from './clubs/sagas';

export default function* () {
  yield all([
    clubsSaga(),
  ])
}
