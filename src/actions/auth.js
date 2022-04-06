import { LOGIN, LOGOUT, REGISTER, LOAD_USER } from 'constants/auth';

function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

function logout(payload) {
  return {
    type: LOGOUT,
    payload,
  };
}

function register(payload) {
  return {
    type: REGISTER,
    payload,
  };
}

function loadUser(payload) {
  return {
    type: LOAD_USER,
    payload,
  };
}

const authActions = { login, register, loadUser, logout };

export { loadUser };

export default authActions;
