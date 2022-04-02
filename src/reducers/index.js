import { combineReducers } from 'redux';
import authReducer from './auth';
import categoryReducer from './category';

const rootReducers = combineReducers({
  auth: authReducer,
  category: categoryReducer,
});

export default rootReducers;
