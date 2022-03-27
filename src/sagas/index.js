import { fork, all } from 'redux-saga/effects';
import bookSagas from './book';

const rootSagas = function* () {
  yield all([fork(...bookSagas)]);
};

export default rootSagas;
