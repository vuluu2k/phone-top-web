import { fork, all } from 'redux-saga/effects';
import authSagas from './auth';
import categorySagas from './category';

const rootSagas = function* () {
  yield all([fork(...authSagas), fork(...categorySagas)]);
};

export default rootSagas;
