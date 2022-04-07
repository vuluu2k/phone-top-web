import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_LIST_PRODUCT,
  LOAD_LIST_PRODUCT_SUCCESS,
  LOAD_LIST_PRODUCT_ERROR,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from 'constants/product';

import { API_URL } from 'env_config';

export default [productSagas];

function* startRequest(payload) {
  switch (payload.type) {
    case LOAD_LIST_PRODUCT:
      yield call(loadList);
      break;
    // case CREATE_PRODUCT:
    //   yield call(createCategory, payload);
    //   break;
    // case EDIT_PRODUCT:
    //   yield call(editCategory, payload);
    //   break;
    // case DELETE_PRODUCT:
    //   yield call(deleteCategory, payload);
    //   break;
    default:
      break;
  }
}

function* loadList() {
  const url = `${API_URL}/product/view`;

  try {
    const response = yield call(axios.get, url);
    if (!response.data.success) {
      yield put({ typ: LOAD_LIST_PRODUCT_ERROR, ...response.data });
    } else {
      yield put({ type: LOAD_LIST_PRODUCT_SUCCESS, ...response.data });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: LOAD_LIST_PRODUCT_ERROR, error: error });
    return error;
  }
}

// function* createCategory({ payload }) {
//   const { name, name_vi, sub_name } = payload;
//   const url = `${API_URL}/category/create`;
//   const body = {
//     name: name,
//     name_vi: name_vi || name,
//     sub_name: sub_name,
//   };
//   try {
//     const response = yield call(axios.post, url, body);
//     if (!response.data.success) {
//       yield put({ typ: CREATE_CATEGORY_ERROR, ...response.data });
//     } else {
//       yield put({ type: CREATE_CATEGORY_SUCCESS, ...response.data });
//     }
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     yield put({ type: CREATE_CATEGORY_ERROR, error: error });
//     return error;
//   }
// }

// function* editCategory({ payload }) {
//   const { id, name, name_vi, sub_name } = payload;
//   const url = `${API_URL}/category/edit/${id}`;
//   const body = {
//     name: name,
//     name_vi: name_vi || name,
//     sub_name: sub_name,
//   };
//   try {
//     const response = yield call(axios.patch, url, body);
//     if (!response.data.success) {
//       yield put({ type: EDIT_CATEGORY_ERROR, ...response.data });
//     } else {
//       yield put({ type: EDIT_CATEGORY_SUCCESS, ...response.data });
//     }
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     yield put({ type: EDIT_CATEGORY_ERROR, error: error });
//     return error;
//   }
// }

// function* deleteCategory({ payload }) {
//   const { id } = payload;
//   console.log(id);
//   const url = `${API_URL}/category/delete/${id}`;
//   try {
//     const response = yield call(axios.delete, url);
//     if (!response.data.success) {
//       yield put({ type: DELETE_CATEGORY_ERROR, ...response.data });
//     } else {
//       yield put({ type: DELETE_CATEGORY_SUCCESS, ...response.data });
//     }
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     yield put({ type: DELETE_CATEGORY_ERROR, error: error });
//     return error;
//   }
// }

export function* productSagas() {
  yield takeLatest([LOAD_LIST_PRODUCT, CREATE_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT], startRequest);
}
