import { LOAD_LIST_PRODUCT, CREATE_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT } from 'constants/product';

function loadListProduct(payload) {
  return {
    type: LOAD_LIST_PRODUCT,
    payload,
  };
}

function createProduct(payload) {
  return {
    type: CREATE_PRODUCT,
    payload,
  };
}

function editProduct(payload) {
  return {
    type: EDIT_PRODUCT,
    payload,
  };
}

function deleteProduct(payload) {
  return {
    type: DELETE_PRODUCT,
    payload,
  };
}

const productActions = { loadListProduct, createProduct, editProduct, deleteProduct };

export default productActions;
