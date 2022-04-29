import { LOAD_LIST_LAYOUT, CREATE_LAYOUT, EDIT_LAYOUT, DELETE_LAYOUT } from 'constants/layout';

function loadListLayout(payload) {
  return {
    type: LOAD_LIST_LAYOUT,
    payload,
  };
}

function createLayout(payload) {
  return {
    type: CREATE_LAYOUT,
    payload,
  };
}

function editLayout(payload) {
  return {
    type: EDIT_LAYOUT,
    payload,
  };
}

function deleteLayout(payload) {
  return {
    type: DELETE_LAYOUT,
    payload,
  };
}

const layoutActions = {
  loadListLayout,
  createLayout,
  editLayout,
  deleteLayout,
};

export default layoutActions;
