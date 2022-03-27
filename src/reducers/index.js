import { combineReducers } from 'redux';
import bookReducer from './book';

const rootReducers = combineReducers({
  book: bookReducer,
});

export default rootReducers;
