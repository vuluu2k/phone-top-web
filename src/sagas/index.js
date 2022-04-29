import { fork, all } from 'redux-saga/effects';
import authSagas from './auth';
import categorySagas from './category';
import productSagas from './product';
import cartSagas from './cart';
import packageSagas from './package';
import blogSagas from './blog';
import layoutSagas from './layout';

const rootSagas = function* () {
  yield all([
    fork(...authSagas),
    fork(...categorySagas),
    fork(...productSagas),
    fork(...cartSagas),
    fork(...packageSagas),
    fork(...blogSagas),
    fork(...layoutSagas),
  ]);
};

export default rootSagas;
