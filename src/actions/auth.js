import { LOGIN, REGISTER } from 'constants/auth';

function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

function register(payload) {
  return {
    type: REGISTER,
    payload,
  };
}

const authActions = { login, register };

export default authActions;
