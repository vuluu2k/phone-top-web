import { LOAD_LIST_BOOK, LOAD_LIST_BOOK_SUCCESS, LOAD_LIST_BOOK_FAIL } from 'constants/book';
import update from 'immutability-helper';

const initialState = {
  listBook: {
    isLoading: false,
    pageNumber: 1,
    pageTotals: 0,
    pageSize: 0,
    pageEntries: 0,
    books: [],
  },
  dataSearch: {
    book_id: undefined,
    name: '',
    value: '',
    type: '',
    author: '',
  },
};

const bookReducer = (state = initialState, payload) => {
  //Đồng nghĩa response(sagas) = payload
  switch (payload.type) {
    case LOAD_LIST_BOOK:
      return update(state, {
        listBook: {
          isLoading: { $set: true },
          books: { $set: [] },
        },
      });
    case LOAD_LIST_BOOK_SUCCESS:
      console.log('success', payload.books);
      return {
        listBook: {
          ...payload,
        },
      };
    case LOAD_LIST_BOOK_FAIL:
      return update(state, {
        listBook: {
          isLoading: { $set: true },
          books: { $set: [] },
        },
      });
    default:
      return state;
  }
};

export default bookReducer;
