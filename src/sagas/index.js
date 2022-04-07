import { fork, all } from 'redux-saga/effects';
import authSagas from './auth';
import categorySagas from './category';
import productSagas from './product';

const rootSagas = function* () {
  yield all([fork(...authSagas), fork(...categorySagas), fork(...productSagas)]);
};

export default rootSagas;
