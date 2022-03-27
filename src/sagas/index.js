import { fork, all } from 'redux-saga/effects';
import authSagas from './auth';
import bookSagas from './book';

const rootSagas = function* () {
  yield all([fork(...bookSagas), fork(...authSagas)]);
};

export default rootSagas;
