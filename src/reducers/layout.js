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

import { handleRequest, handleSuccess, handleError } from 'utils/handleReducer';
import update from 'immutability-helper';
import { converObjToCamelKeys } from 'utils';

const initialState = {
  layoutInfomation: {
    success: false,
    message: '',
    requesting: true,
    layouts: [],
  },
};

const handleDelete = (state, payload) => {
  const { layout } = payload;
  const listCurrent = state.layoutInfomation.layouts;
  const listFilter = listCurrent.filter(item => item._id !== layout._id);
  return update(state, {
    layoutInfomation: {
      requesting: { $set: false },
      success: { $set: true },
      $merge: converObjToCamelKeys(payload),
      layouts: { $set: listFilter },
    },
  });
};

const handleEdit = (state, payload) => {
  const { layout } = payload;
  const listCurrent = state.layoutInfomation.layouts;
  const listAfterEdit = listCurrent.map(item => {
    if (item._id === layout._id) {
      return layout;
    }
    return item;
  });

  return update(state, {
    layoutInfomation: {
      requesting: { $set: false },
      success: { $set: true },
      $merge: converObjToCamelKeys(payload),
      layouts: { $set: listAfterEdit },
    },
  });
};

const handleCreate = (state, payload) => {
  const { layout } = payload;
  const listCurrent = state.layoutInfomation.layouts;
  return update(state, {
    layoutInfomation: {
      requesting: { $set: false },
      success: { $set: true },
      $merge: converObjToCamelKeys(payload),
      layouts: { $set: [layout].concat(listCurrent) },
    },
  });
};

const layoutReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case LOAD_LIST_LAYOUT:
      return handleRequest(state, 'layoutInfomation', payload);
    case LOAD_LIST_LAYOUT_SUCCESS:
      return handleSuccess(state, 'layoutInfomation', payload);
    case LOAD_LIST_LAYOUT_ERROR:
      return handleError(state, 'layoutInfomation', payload.message);

    case CREATE_LAYOUT:
      return handleRequest(state, 'layoutInfomation', payload);
    case CREATE_LAYOUT_SUCCESS:
      return handleCreate(state, payload);
    case CREATE_LAYOUT_ERROR:
      return handleError(state, 'layoutInfomation', payload.message);

    case EDIT_LAYOUT:
      return handleRequest(state, 'layoutInfomation');
    case EDIT_LAYOUT_SUCCESS:
      return handleEdit(state, payload);
    case EDIT_LAYOUT_ERROR:
      return handleError(state, 'layoutInfomation', payload.message);

    case DELETE_LAYOUT:
      return handleRequest(state, 'layoutInfomation');
    case DELETE_LAYOUT_SUCCESS:
      return handleDelete(state, payload);
    case DELETE_LAYOUT_ERROR:
      return handleError(state, 'layoutInfomation', payload.message);

    default:
      return state;
  }
};

export default layoutReducer;
