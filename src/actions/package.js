import {
  LOAD_LIST_PACKAGE,
  CREATE_PACKAGE,
  CHECK_PACKAGE,
  ACCEPT_PACKAGE,
  GET_TURNOVER,
  DELETE_PACKAGE,
  SEND_REQUEST_CANCEL,
  SEND_SHIPPER,
  CREATE_ZALOPAY_PAYMENT,
  QUERY_ZALOPAY_STATUS,
} from 'constants/package';

function loadListPackage(payload) {
  return {
    type: LOAD_LIST_PACKAGE,
    payload,
  };
}

function createPackage(payload) {
  return {
    type: CREATE_PACKAGE,
    payload,
  };
}

function checkPackage(payload) {
  return {
    type: CHECK_PACKAGE,
    payload,
  };
}

function acceptPackage(payload) {
  return {
    type: ACCEPT_PACKAGE,
    payload,
  };
}

function getTurnover(payload) {
  return {
    type: GET_TURNOVER,
    payload,
  };
}

function deletePackage(payload) {
  return {
    type: DELETE_PACKAGE,
    payload,
  };
}

function sendRequest(payload) {
  return {
    type: SEND_REQUEST_CANCEL,
    payload,
  };
}

function sendShipper(payload) {
  return {
    type: SEND_SHIPPER,
    payload,
  };
}

function createZaloPayPayment(payload) {
  return {
    type: CREATE_ZALOPAY_PAYMENT,
    payload,
  };
}

function queryZaloPayStatus(payload) {
  return {
    type: QUERY_ZALOPAY_STATUS,
    payload,
  };
}

const packageActions = { 
  loadListPackage, 
  createPackage, 
  checkPackage, 
  acceptPackage, 
  getTurnover, 
  deletePackage, 
  sendRequest, 
  sendShipper,
  createZaloPayPayment,
  queryZaloPayStatus
};

export default packageActions;
