import { call, put, takeLatest, fork } from 'redux-saga/effects';
import axios from 'axios';

import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, REGISTER, REGISTER_SUCCESS, REGISTER_ERROR } from 'constants/auth';
import { API_URL } from 'env_config';
import { request, objectToFormData } from 'utils/request';

export default [authSagas];

function* startRequest(payload) {
  switch (payload.type) {
    case REGISTER:
      yield call(register, payload);
      break;
    default:
      break;
  }
}

function* register({ payload }) {
  const { username, email, password } = payload;
  console.log('payload', payload);

  const url = `${API_URL}/auth/register`;
  const body = {
    name: username,
    email: email,
    password: password,
  };

  try {
    const response = yield axios.post(url, body);

    if (!response.data.success) {
      yield put({ type: REGISTER_ERROR, ...response.data.message });
    }
    yield put({ type: REGISTER_SUCCESS, ...response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: REGISTER_ERROR, error: error });
    return error;
  }
}

export function* authSagas() {
  yield takeLatest([REGISTER], startRequest);
}
