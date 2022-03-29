import { fork, all } from 'redux-saga/effects';
import authSagas from './auth';

const rootSagas = function* () {
  yield all([fork(...authSagas)]);
};

export default rootSagas;
