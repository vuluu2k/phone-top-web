import { combineReducers } from 'redux';
import authReducer from './auth';

const rootReducers = combineReducers({
  auth: authReducer,
});

export default rootReducers;
