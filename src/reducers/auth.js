import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  LOGOUT,
} from 'constants/auth';
import { update } from 'lodash';
import { handleRequest, handleSuccess, handleError } from 'utils/handleReducer';

const initialState = {
  statusRegister: {
    message: '',
    success: false,
  },
  statusLogin: {
    message: '',
    success: false,
    accessToken: '',
  },
  auth: {
    requesting: true,
    isAuthenticated: false,
    user: null,
  },
};

const authReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case REGISTER:
      return handleRequest(state, 'statusRegister', payload);

    case REGISTER_SUCCESS:
      return handleSuccess(state, 'statusRegister', payload);

    case REGISTER_ERROR:
      return handleError(state, 'statusRegister', payload.message);

    case LOGIN:
      return handleRequest(state, 'statusLogin', payload);
    case LOGIN_SUCCESS:
      return handleSuccess(state, 'statusLogin', payload);
    case LOGIN_ERROR:
      return handleError(state, 'statusLogin', payload.message);

    case LOGOUT:
      return update(state, {
        auth: {
          requesting: { $set: true },
          isAuthenticated: { $set: false },
          user: { $set: null },
        },
      });

    case LOAD_USER:
      return handleRequest(state, 'auth', payload);
    case LOAD_USER_SUCCESS:
      return handleSuccess(state, 'auth', payload);
    case LOAD_USER_ERROR:
      return handleError(state, 'auth', payload.message);
    default:
      return state;
  }
};

export default authReducer;
