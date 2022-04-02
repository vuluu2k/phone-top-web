import {
  LOAD_LIST_CATEGORY,
  LOAD_LIST_CATEGORY_SUCCESS,
  LOAD_LIST_CATEGORY_ERROR,
  CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,
  EDIT_CATEGORY,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_ERROR,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
} from 'constants/category';

import { handleRequest, handleSuccess, handleError } from 'utils/handleReducer';

const initialState = {
  categoryInfomation: {
    success: false,
    message: '',
    categorys: [],
  },
};

const categoryReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case LOAD_LIST_CATEGORY:
      return handleRequest(state, 'categoryInfomation', payload);

    case LOAD_LIST_CATEGORY_SUCCESS:
      return handleSuccess(state, 'categoryInfomation', payload);

    case LOAD_LIST_CATEGORY_ERROR:
      return handleError(state, 'categoryInfomation', payload.message);

    // case LOGIN:
    //   return handleRequest(state, 'statusLogin', payload);
    // case LOGIN_SUCCESS:
    //   return handleSuccess(state, 'statusLogin', payload);
    // case LOGIN_ERROR:
    //   return handleError(state, 'statusLogin', payload.message);

    // case LOAD_USER:
    //   return handleRequest(state, 'auth', payload);
    // case LOAD_USER_SUCCESS:
    //   return handleSuccess(state, 'auth', payload);
    // case LOAD_USER_ERROR:
    //   return handleError(state, 'auth', payload.message);
    default:
      return state;
  }
};

export default categoryReducer;
