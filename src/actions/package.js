import { LOAD_LIST_PACKAGE, CREATE_PACKAGE, CHECK_PACKAGE, ACCEPT_PACKAGE } from 'constants/package';

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

const packageActions = { loadListPackage, createPackage, checkPackage, acceptPackage };

export default packageActions;
