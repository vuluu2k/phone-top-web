import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_LIST_LAYOUT,
  LOAD_LIST_LAYOUT_SUCCESS,
  LOAD_LIST_LAYOUT_ERROR,
  CREATE_LAYOUT,
  CREATE_LAYOUT_SUCCESS,
  CREATE_LAYOUT_ERROR,
  EDIT_LAYOUT,
  EDIT_LAYOUT_SUCCESS,
  EDIT_LAYOUT_ERROR,
  DELETE_LAYOUT,
  DELETE_LAYOUT_SUCCESS,
  DELETE_LAYOUT_ERROR,
} from 'constants/layout';

import { API_URL } from 'env_config';

// eslint-disable-next-line
export default [layoutSagas];

function* startRequest(payload) {
  switch (payload.type) {
    case LOAD_LIST_LAYOUT:
      yield call(loadList);
      break;
    case CREATE_LAYOUT:
      yield call(createLayout, payload);
      break;
    case EDIT_LAYOUT:
      yield call(editLayout, payload);
      break;
    case DELETE_LAYOUT:
      yield call(deleteLayout, payload);
      break;
    default:
      break;
  }
}

function* loadList() {
  const url = `${API_URL}/layout/view_layout`;

  try {
    const response = yield call(axios.get, url);
    if (!response.data.success) {
      yield put({ typ: LOAD_LIST_LAYOUT_ERROR, ...response.data });
    } else {
      yield put({ type: LOAD_LIST_LAYOUT_SUCCESS, ...response.data });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: LOAD_LIST_LAYOUT_ERROR, error: error });
    return error;
  }
}

function* createLayout({ payload }) {
  const { position, image } = payload;
  const url = `${API_URL}/layout/create_layout`;
  const body = {
    position,
    image,
  };
  try {
    const response = yield call(axios.post, url, body);
    if (!response.data.success) {
      yield put({ typ: CREATE_LAYOUT_ERROR, ...response.data });
    } else {
      yield put({ type: CREATE_LAYOUT_SUCCESS, ...response.data });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: CREATE_LAYOUT_ERROR, error: error });
    return error;
  }
}

function* editLayout({ payload }) {
  const { layout_id, position, image } = payload;
  const url = `${API_URL}/layout/edit_layout`;
  const body = {
    layout_id,
    position,
    image,
  };
  try {
    const response = yield call(axios.patch, url, body);
    if (!response.data.success) {
      yield put({ type: EDIT_LAYOUT_ERROR, ...response.data });
    } else {
      yield put({ type: EDIT_LAYOUT_SUCCESS, ...response.data });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: EDIT_LAYOUT_ERROR, error: error });
    return error;
  }
}

function* deleteLayout({ payload }) {
  const { layout_id } = payload;
  const url = `${API_URL}/layout/delete_layout/${layout_id}`;
  try {
    const response = yield call(axios.delete, url);
    if (!response.data.success) {
      yield put({ type: DELETE_LAYOUT_ERROR, ...response.data });
    } else {
      yield put({ type: DELETE_LAYOUT_SUCCESS, ...response.data });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: DELETE_LAYOUT_ERROR, error: error });
    return error;
  }
}

export function* layoutSagas() {
  yield takeLatest([LOAD_LIST_LAYOUT, CREATE_LAYOUT, EDIT_LAYOUT, DELETE_LAYOUT], startRequest);
}
