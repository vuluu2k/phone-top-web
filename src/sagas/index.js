import { fork, all } from 'redux-saga/effects';
import authSagas from './auth';
import categorySagas from './category';
import productSagas from './product';
import cartSagas from './cart';

const rootSagas = function* () {
  yield all([fork(...authSagas), fork(...categorySagas), fork(...productSagas), fork(...cartSagas)]);
};

export default rootSagas;
