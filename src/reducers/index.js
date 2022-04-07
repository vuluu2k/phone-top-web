import { combineReducers } from 'redux';
import authReducer from './auth';
import categoryReducer from './category';
import productReducer from './product';

const rootReducers = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
});

export default rootReducers;
