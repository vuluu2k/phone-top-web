import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_LIST_PACKAGE,
  LOAD_LIST_PACKAGE_SUCCESS,
  LOAD_LIST_PACKAGE_ERROR,
  CREATE_PACKAGE,
  CREATE_PACKAGE_SUCCESS,
  CREATE_PACKAGE_ERROR,
  // EDIT_PACKAGE,
  // EDIT_PACKAGE_SUCCESS,
  // EDIT_PACKAGE_ERROR,
  // DELETE_PACKAGE,
  // DELETE_PACKAGE_SUCCESS,
  // DELETE_PACKAGE_ERROR,
} from 'constants/package';

import { API_URL } from 'env_config';

export default [packageSagas];

function* startRequest(payload) {
  switch (payload.type) {
    case LOAD_LIST_PACKAGE:
      yield call(loadList);
      break;
    case CREATE_PACKAGE:
      yield call(createPackage, payload);
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

function* loadList() {
  const url = `${API_URL}/package/view_package`;

  try {
    const response = yield call(axios.get, url);
    if (!response.data.success) {
      yield put({ typ: LOAD_LIST_PACKAGE_ERROR, ...response.data });
    } else {
      yield put({ type: LOAD_LIST_PACKAGE_SUCCESS, ...response.data });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: LOAD_LIST_PACKAGE_ERROR, error: error });
    return error;
  }
}

function* createPackage({ payload }) {
  const { user_id, products, full_name, phone_number, email, voucher, value, address, is_access, note, is_pay } = payload;
  const url = `${API_URL}/package/create_package`;
  const body = {
    user_id,
    products,
    full_name,
    phone_number,
    email,
    voucher,
    value,
    address,
    is_access,
    note,
    is_pay,
  };

  console.log(payload);
  try {
    const response = yield call(axios.post, url, body);

    console.log('res', response.data);
    if (!response.data.success) {
      yield put({ typ: CREATE_PACKAGE_ERROR, ...response.data });
    } else {
      yield put({ type: CREATE_PACKAGE_SUCCESS, ...response.data });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: CREATE_PACKAGE_ERROR, error: error });
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

export function* packageSagas() {
  yield takeLatest([LOAD_LIST_PACKAGE, CREATE_PACKAGE], startRequest);
}
