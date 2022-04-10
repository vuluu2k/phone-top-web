import { INIT_CART, CHANGE_CART, GET_CART } from 'constants/cart';

function initCart(payload) {
  return {
    type: INIT_CART,
    payload,
  };
}

function changeCart(payload) {
  return {
    type: CHANGE_CART,
    payload,
  };
}

function getCart(payload) {
  return {
    type: GET_CART,
    payload,
  };
}

const cartActions = { initCart, changeCart, getCart };

export default cartActions;
