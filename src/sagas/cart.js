import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  INIT_CART,
  INIT_CART_SUCCESS,
  INIT_CART_ERROR,
  CHANGE_CART,
  CHANGE_CART_SUCCESS,
  CHANGE_CART_ERROR,
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_ERROR,
} from 'constants/cart';

import { API_URL } from 'env_config';

export default [cartSagas];

function* startRequest(payload) {
  switch (payload.type) {
    // case LOAD_LIST_CATEGORY:
    //   yield call(loadList);
    //   break;
    case INIT_CART:
      yield call(initCart, payload);
      break;
    // case EDIT_CATEGORY:
    //   yield call(editCategory, payload);
    //   break;
    // case DELETE_CATEGORY:
    //   yield call(deleteCategory, payload);
    //   break;
    default:
      break;
  }
}

// function* loadList() {
//   const url = `${API_URL}/category/view`;

//   try {
//     const response = yield call(axios.get, url);
//     if (!response.data.success) {
//       yield put({ typ: LOAD_LIST_CATEGORY_ERROR, ...response.data });
//     } else {
//       yield put({ type: LOAD_LIST_CATEGORY_SUCCESS, ...response.data });
//     }
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     yield put({ type: LOAD_LIST_CATEGORY_ERROR, error: error });
//     return error;
//   }
// }

function* initCart({ payload }) {
  const { user_id } = payload;
  const url = `${API_URL}/cart/init`;
  const body = {
    user_id,
  };
  try {
    const response = yield call(axios.post, url, body);
    if (!response.data.success) {
      yield put({ typ: INIT_CART_ERROR, ...response.data });
    } else {
      yield put({ type: INIT_CART_SUCCESS, ...response.data });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: INIT_CART_ERROR, error: error });
    return error;
  }
}

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

export function* cartSagas() {
  yield takeLatest([GET_CART, INIT_CART, CHANGE_CART], startRequest);
}
