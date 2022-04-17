import { combineReducers } from 'redux';
import authReducer from './auth';
import categoryReducer from './category';
import productReducer from './product';
import cartReducer from './cart';

const rootReducers = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
});

export default rootReducers;
