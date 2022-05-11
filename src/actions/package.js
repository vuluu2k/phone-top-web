import {
  LOAD_LIST_PACKAGE,
  CREATE_PACKAGE,
  CHECK_PACKAGE,
  ACCEPT_PACKAGE,
  GET_TURNOVER,
  DELETE_PACKAGE,
  SEND_REQUEST_CANCEL,
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

const packageActions = { loadListPackage, createPackage, checkPackage, acceptPackage, getTurnover, deletePackage, sendRequest };

export default packageActions;
