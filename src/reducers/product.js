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
  LOAD_LIST_PRODUCT_HOME,
  LOAD_LIST_PRODUCT_HOME_SUCCESS,
  LOAD_LIST_PRODUCT_HOME_ERROR,
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
  productInfomationHome: {
    success: false,
    message: '',
    hot: [],
    mobile: [],
    laptop: [],
    watch: [],
    tablet: [],
    accessory: [],
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
  const listCurrent = state.productInfomation.products;
  const listFilter = listCurrent.filter(item => item._id !== id);
  return update(state, {
    productStatusDel: {
      requesting: { $set: false },
      success: { $set: true },
      $merge: converObjToCamelKeys(payload),
    },
    productInfomation: {
      products: { $set: listFilter },
    },
  });
};

const handleEdit = (state, payload) => {
  const { id, product } = payload;
  console.log('test', id, product);
  const listCurrent = state.productInfomation.products;
  const listAfterEdit = listCurrent.map(item => {
    if (item._id === id) {
      return product;
    }
    return item;
  });

  return update(state, {
    productStatusEdit: {
      requesting: { $set: false },
      success: { $set: true },
      $merge: converObjToCamelKeys(payload),
    },
    productInfomation: {
      products: { $set: listAfterEdit },
    },
  });
};

const handleCreate = (state, payload) => {
  const { product } = payload;
  const listCurrent = state.productInfomation.products;
  return update(state, {
    productStatusCreate: {
      requesting: { $set: false },
      success: { $set: true },
      $merge: converObjToCamelKeys(payload),
    },
    productInfomation: {
      products: { $set: listCurrent.concat(product) },
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

    case LOAD_LIST_PRODUCT_HOME:
      return handleRequest(state, 'productInfomationHome', payload);
    case LOAD_LIST_PRODUCT_HOME_SUCCESS:
      return handleSuccess(state, 'productInfomationHome', payload);
    case LOAD_LIST_PRODUCT_HOME_ERROR:
      return handleError(state, 'productInfomationHome', payload.message);

    case CREATE_PRODUCT:
      return handleRequest(state, 'productInfomation', payload);
    case CREATE_PRODUCT_SUCCESS:
      return handleCreate(state, payload);
    case CREATE_PRODUCT_ERROR:
      return handleError(state, 'productInfomation', payload.message);

    case EDIT_PRODUCT:
      return handleRequest(state, 'productInfomation');
    case EDIT_PRODUCT_SUCCESS:
      console.log(payload);
      return handleEdit(state, payload);
    case EDIT_PRODUCT_ERROR:
      return handleError(state, 'productInfomation', payload.message);

    case DELETE_PRODUCT:
      return handleRequest(state, 'productInfomation');
    case DELETE_PRODUCT_SUCCESS:
      return handleDelete(state, payload);
    case DELETE_PRODUCT_ERROR:
      return handleError(state, 'productInfomation', payload.message);
    default:
      return state;
  }
};

export default productReducer;
