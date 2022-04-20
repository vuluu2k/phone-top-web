import { combineReducers } from 'redux';
import authReducer from './auth';
import categoryReducer from './category';
import productReducer from './product';
import cartReducer from './cart';
import packageReducer from './package';

const rootReducers = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  package: packageReducer,
});

export default rootReducers;
