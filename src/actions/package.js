import { LOAD_LIST_PACKAGE, CREATE_PACKAGE } from 'constants/package';

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

const packageActions = { loadListPackage, createPackage };

export default packageActions;
