import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_LIST_PACKAGE,
  LOAD_LIST_PACKAGE_SUCCESS,
  LOAD_LIST_PACKAGE_ERROR,
  CREATE_PACKAGE,
  CREATE_PACKAGE_SUCCESS,
  CREATE_PACKAGE_ERROR,
  CHECK_PACKAGE,
  CHECK_PACKAGE_SUCCESS,
  CHECK_PACKAGE_ERROR,
  ACCEPT_PACKAGE,
  ACCEPT_PACKAGE_SUCCESS,
  ACCEPT_PACKAGE_ERROR,
  DELETE_PACKAGE,
  DELETE_PACKAGE_SUCCESS,
  DELETE_PACKAGE_ERROR,
  GET_TURNOVER,
  GET_TURNOVER_SUCCESS,
  GET_TURNOVER_ERROR,
  SEND_REQUEST_CANCEL,
  SEND_REQUEST_CANCEL_SUCCESS,
  SEND_REQUEST_CANCEL_ERROR,
  SEND_SHIPPER,
  SEND_SHIPPER_SUCCESS,
  SEND_SHIPPER_ERROR,
  CREATE_ZALOPAY_PAYMENT,
  CREATE_ZALOPAY_PAYMENT_SUCCESS,
  CREATE_ZALOPAY_PAYMENT_ERROR,
  QUERY_ZALOPAY_STATUS,
  QUERY_ZALOPAY_STATUS_SUCCESS,
  QUERY_ZALOPAY_STATUS_ERROR,
  HANDLE_ZALOPAY_RETURN,
  HANDLE_ZALOPAY_RETURN_SUCCESS,
  HANDLE_ZALOPAY_RETURN_ERROR,
} from 'constants/package';

import { API_URL } from 'env_config';
import { message as messageAntd } from 'antd';

// eslint-disable-next-line
export default [packageSagas];

function* startRequest(payload) {
  switch (payload.type) {
    case LOAD_LIST_PACKAGE:
      yield call(loadList, payload);
      break;
    case CHECK_PACKAGE:
      yield call(checkPackage, payload);
      break;
    case CREATE_PACKAGE:
      yield call(createPackage, payload);
      break;
    case ACCEPT_PACKAGE:
      yield call(acceptPackage, payload);
      break;
    case GET_TURNOVER:
      yield call(getTurnover, payload);
      break;
    case DELETE_PACKAGE:
      yield call(deletePackage, payload);
      break;
    case SEND_REQUEST_CANCEL:
      yield call(sendRequest, payload);
      break;
    case SEND_SHIPPER:
      yield call(sendShipper, payload);
      break;
    case CREATE_ZALOPAY_PAYMENT:
      yield call(createZaloPayPayment, payload);
      break;
    case QUERY_ZALOPAY_STATUS:
      yield call(queryZaloPayStatus, payload);
      break;
    case HANDLE_ZALOPAY_RETURN:
      yield call(handleZaloPayReturn, payload);
      break;
    default:
      break;
  }
}

function* loadList({ payload }) {
  const { isAccess = '', phoneNumber, codePackage, userId } = payload;
  const url = `${API_URL}/package/view_package?isAccess=${isAccess}&phoneNumber=${phoneNumber || ''}&codePackage=${codePackage || ''}&userId=${
    userId || ''
  }`;

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
    yield put({ type: LOAD_LIST_PACKAGE_ERROR, message: error });
    return error;
  }
}

function* checkPackage({ payload }) {
  const { code_package, phone_number } = payload;

  const url = `${API_URL}/package/check_package?code_package=${code_package}&phone_number=${phone_number}`;

  try {
    const response = yield call(axios.get, url);
    if (!response.data.success) {
      yield put({ typ: CHECK_PACKAGE_ERROR, ...response.data });
      messageAntd.error(response.data.message || 'Thông tin bạn nhập không chính xác');
    } else {
      yield put({ type: CHECK_PACKAGE_SUCCESS, ...response.data });
      messageAntd.success('Tìm thấy đơn hàng của bạn');
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: CHECK_PACKAGE_ERROR, message: error });
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

  try {
    const response = yield call(axios.post, url, body);

    if (!response.data.success) {
      messageAntd.error(response.data.message);
      yield put({ typ: CREATE_PACKAGE_ERROR, ...response.data });
    } else {
      messageAntd.success(response.data.message);
      yield put({ type: CREATE_PACKAGE_SUCCESS, ...response.data });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: CREATE_PACKAGE_ERROR, message: error });
    return error;
  }
}

function* acceptPackage({ payload }) {
  const { package_id } = payload;
  const url = `${API_URL}/package/accept_package`;
  const body = {
    package_id,
  };
  try {
    const response = yield call(axios.post, url, body);

    if (!response.data.success) {
      yield put({ typ: ACCEPT_PACKAGE_ERROR, ...response.data });
      messageAntd.error(response.data.message);
    } else {
      yield put({ type: ACCEPT_PACKAGE_SUCCESS, ...response.data });
      messageAntd.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: ACCEPT_PACKAGE_ERROR, message: error });
    return error;
  }
}

function* deletePackage({ payload }) {
  const { id } = payload;
  const url = `${API_URL}/package/delete_package/${id}`;
  try {
    const response = yield call(axios.delete, url);
    if (!response.data.success) {
      messageAntd.error(response.data.message);
      yield put({ type: DELETE_PACKAGE_ERROR, ...response.data });
    } else {
      messageAntd.success(response.data.message);
      yield put({ type: DELETE_PACKAGE_SUCCESS, ...response.data });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: DELETE_PACKAGE_ERROR, error: error });
    return error;
  }
}

function* getTurnover({ payload }) {
  const { startDate, endDate } = payload;
  const url = `${API_URL}/package/view_turnover?startDate=${startDate}&endDate=${endDate}`;
  try {
    const response = yield call(axios.get, url);
    if (!response.data.success) {
      yield put({ type: GET_TURNOVER_ERROR, ...response.data });
    } else {
      yield put({ type: GET_TURNOVER_SUCCESS, ...response.data });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: GET_TURNOVER_ERROR, error: error });
    return error;
  }
}

function* sendRequest({ payload }) {
  const { codePackage, note, isTrash } = payload;
  const url = `${API_URL}/package/request_cancel_package`;
  const body = { codePackage, note, isTrash };
  try {
    const response = yield call(axios.post, url, body);
    if (!response.data.success) {
      messageAntd.error(response.data.message);
      yield put({ type: SEND_REQUEST_CANCEL_ERROR, ...response.data });
    } else {
      messageAntd.success(response.data.message);
      yield put({ type: SEND_REQUEST_CANCEL_SUCCESS, ...response.data });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: SEND_REQUEST_CANCEL_ERROR, error: error });
    return error;
  }
}

function* sendShipper({ payload }) {
  const { package_id } = payload;
  const url = `${API_URL}/package/send_shipper`;
  const body = {
    package_id,
  };
  try {
    const response = yield call(axios.post, url, body);
    if (!response.data.success) {
      messageAntd.error(response.data.message);
      yield put({ typ: SEND_SHIPPER_ERROR, ...response.data });
    } else {
      messageAntd.success(response.data.message);
      yield put({ type: SEND_SHIPPER_SUCCESS, ...response.data });
    }

    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: SEND_SHIPPER_ERROR, message: error });
    return error;
  }
}

function* createZaloPayPayment({ payload }) {
  const { package_id, amount } = payload;
  const url = `${API_URL}/payment/zalopay/create`;
  const body = { package_id, amount };

  console.log('Saga createZaloPayPayment called:', { package_id, amount, url }); // DEBUG

  try {
    const response = yield call(axios.post, url, body);

    console.log('ZaloPay API Response:', response.data); // DEBUG

    if (!response.data.success) {
      messageAntd.error(response.data.message);
      yield put({ type: CREATE_ZALOPAY_PAYMENT_ERROR, ...response.data });
    } else {
      messageAntd.success(response.data.message);
      yield put({ type: CREATE_ZALOPAY_PAYMENT_SUCCESS, ...response.data });
      // Popup will be opened by Pay.js component useEffect
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: CREATE_ZALOPAY_PAYMENT_ERROR, error: error });
    return error;
  }
}

function* queryZaloPayStatus({ payload }) {
  const { app_trans_id } = payload;
  const url = `${API_URL}/payment/zalopay/query?app_trans_id=${app_trans_id}`;

  try {
    const response = yield call(axios.get, url);

    if (!response.data.success) {
      yield put({ type: QUERY_ZALOPAY_STATUS_ERROR, ...response.data });
    } else {
      yield put({ type: QUERY_ZALOPAY_STATUS_SUCCESS, ...response.data });
      
      // If payment is successful, show success message
      if (response.data.data && response.data.data.return_code === 1) {
        messageAntd.success('Thanh toán thành công');
      }
    }
    return response.data;
  } catch (error) {
    console.log(error);
    yield put({ type: QUERY_ZALOPAY_STATUS_ERROR, error: error });
    return error;
  }
}

function* handleZaloPayReturn({ payload }) {
  const { app_trans_id, package_id } = payload;
  const url = `${API_URL}/payment/zalopay/return`;
  const body = { app_trans_id, package_id };

  try {
    const response = yield call(axios.post, url, body);

    if (!response.data.success) {
      // Payment failed - package has been deleted
      messageAntd.error(response.data.message || 'Thanh toán thất bại. Đơn hàng đã bị hủy.');
      yield put({ type: HANDLE_ZALOPAY_RETURN_ERROR, ...response.data });
      
      // Clear localStorage
      localStorage.removeItem('zalopay_transaction');
      
      // Redirect to home or cart after 2 seconds
      setTimeout(() => {
        window.location.href = '/cart';
      }, 2000);
    } else {
      // Payment successful
      messageAntd.success(response.data.message);
      yield put({ type: HANDLE_ZALOPAY_RETURN_SUCCESS, ...response.data });
      
      // Clear localStorage
      localStorage.removeItem('zalopay_transaction');
    }
    return response.data;
  } catch (error) {
    console.log(error);
    messageAntd.error('Lỗi khi kiểm tra trạng thái thanh toán');
    yield put({ type: HANDLE_ZALOPAY_RETURN_ERROR, error: error });
    return error;
  }
}

export function* packageSagas() {
  yield takeLatest(
    [
      LOAD_LIST_PACKAGE, 
      CREATE_PACKAGE, 
      CHECK_PACKAGE, 
      ACCEPT_PACKAGE, 
      DELETE_PACKAGE, 
      GET_TURNOVER, 
      SEND_REQUEST_CANCEL, 
      SEND_SHIPPER,
      CREATE_ZALOPAY_PAYMENT,
      QUERY_ZALOPAY_STATUS,
      HANDLE_ZALOPAY_RETURN
    ],
    startRequest
  );
}
