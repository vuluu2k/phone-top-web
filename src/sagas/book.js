import { call, takeLatest, put } from 'redux-saga/effects';

import { LOAD_LIST_BOOK, LOAD_LIST_BOOK_SUCCESS, LOAD_LIST_BOOK_FAIL } from 'constants/book';
import { API_URL } from 'constants';
import { request } from 'utils/request';

export default [bookSagas];

function* startRequest(payload) {
  switch (payload.type) {
    case LOAD_LIST_BOOK:
      yield call(loadList, payload);
      break;
    // case CREATE_BOOK:
    //   yield call(createBook, payload);
    default:
      break;
  }
}

function* loadList({ payload }) {
  const { book_id, name, type, value, author } = payload;

  const queryParams = `book_id=${book_id}&name=${name}&type=${type}&value=${value}&author=${author}`;

  const url = `${API_URL}/book/view?${queryParams}`;
  try {
    const response = yield call(request, url);
    if (!response.success) {
      yield put({
        type: LOAD_LIST_BOOK_FAIL,
        error: response.message,
      });
    } else {
      yield put({
        type: LOAD_LIST_BOOK_SUCCESS,
        ...response,
      });
    }
    return response;
  } catch (error) {
    yield put({
      type: LOAD_LIST_BOOK_FAIL,
      error: error,
    });
    return error;
  }
}

export function* bookSagas() {
  yield takeLatest([LOAD_LIST_BOOK], startRequest);
}
