import { combineReducers } from 'redux';
import authReducer from './auth';
import categoryReducer from './category';
import productReducer from './product';
import cartReducer from './cart';
import packageReducer from './package';
import blogReducer from './blog';
import layoutReducer from './layout';

const rootReducers = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  package: packageReducer,
  blog: blogReducer,
  layout: layoutReducer,
});

export default rootReducers;
