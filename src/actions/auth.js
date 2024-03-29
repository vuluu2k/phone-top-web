import { LOGIN, LOGOUT, REGISTER, LOAD_USER, EDIT_USER, LOAD_LIST_USER, DELETE_USER, SWITCH_AUTH } from 'constants/auth';

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

function loadListUser(payload) {
  return {
    type: LOAD_LIST_USER,
    payload,
  };
}

function editUser(payload) {
  return {
    type: EDIT_USER,
    payload,
  };
}

function deleteUser(payload) {
  return {
    type: DELETE_USER,
    payload,
  };
}

function switchStateAuth(payload) {
  return {
    type: SWITCH_AUTH,
    payload,
  };
}

const authActions = { login, register, loadUser, logout, editUser, loadListUser, deleteUser, switchStateAuth };

export { loadUser };

export default authActions;
