import {
  LOAD_LIST_PRODUCT,
  LOAD_LIST_PRODUCT_SUCCESS,
  LOAD_LIST_PRODUCT_ERROR,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from 'constants/product';

import { handleRequest, handleSuccess, handleError } from 'utils/handleReducer';
import update from 'immutability-helper';
import { converObjToCamelKeys } from 'utils';

const initialState = {
  productInfomation: {
    success: false,
    message: '',
    products: [],
  },
  productStatusDel: {
    success: false,
    message: '',
  },
  productStatusCreate: {
    success: false,
    message: '',
  },
  productStatusEdit: {
    success: false,
    message: '',
  },
};

const handleDelete = (state, payload) => {
  const { id } = payload;
  const listCurrent = state.categoryInfomation.categorys;
  const listFilter = listCurrent.filter(item => item._id !== id);
  return update(state, {
    categoryStatusDel: {
      requesting: { $set: false },
      success: { $set: true },
      $merge: converObjToCamelKeys(payload),
    },
    categoryInfomation: {
      categorys: { $set: listFilter },
    },
  });
};

const handleEdit = (state, payload) => {
  const { id, category } = payload;
  console.log(id, category);
  const listCurrent = state.categoryInfomation.categorys;
  const listAfterEdit = listCurrent.map(item => {
    if (item._id === id) {
      return category;
    }
    return item;
  });

  return update(state, {
    categoryStatusDel: {
      requesting: { $set: false },
      success: { $set: true },
      $merge: converObjToCamelKeys(payload),
    },
    categoryInfomation: {
      categorys: { $set: listAfterEdit },
    },
  });
};

const handleCreate = (state, payload) => {
  const { category } = payload;
  const listCurrent = state.categoryInfomation.categorys;
  return update(state, {
    categoryStatusDel: {
      requesting: { $set: false },
      success: { $set: true },
      $merge: converObjToCamelKeys(payload),
    },
    categoryInfomation: {
      categorys: { $set: listCurrent.concat(category) },
    },
  });
};

const productReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case LOAD_LIST_PRODUCT:
      return handleRequest(state, 'productInfomation', payload);
    case LOAD_LIST_PRODUCT_SUCCESS:
      return handleSuccess(state, 'productInfomation', payload);
    case LOAD_LIST_PRODUCT_ERROR:
      return handleError(state, 'productInfomation', payload.message);

    // case CREATE_CATEGORY:
    //   return handleRequest(state, 'categoryStatusCreate', payload);
    // case CREATE_CATEGORY_SUCCESS:
    //   return handleCreate(state, payload);
    // case CREATE_CATEGORY_ERROR:
    //   return handleError(state, 'categoryStatusCreate', payload.message);

    // case EDIT_CATEGORY:
    //   return handleRequest(state, 'categoryStatusEdit');
    // case EDIT_CATEGORY_SUCCESS:
    //   return handleEdit(state, payload);
    // case EDIT_CATEGORY_ERROR:
    //   return handleError(state, 'categoryStatusEdit', payload.message);

    // case DELETE_CATEGORY:
    //   return handleRequest(state, 'categoryStatusDel');
    // case DELETE_CATEGORY_SUCCESS:
    //   return handleDelete(state, payload);
    // case DELETE_CATEGORY_ERROR:
    //   return handleError(state, 'categoryStatusDel', payload.message);

    default:
      return state;
  }
};

export default productReducer;
