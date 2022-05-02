import { createSelector } from 'reselect';

const selectAuthDomain = () => state => state.auth;

const selectRegisterStatus = createSelector(selectAuthDomain(), substate => substate.statusRegister);
const selectLoginStatus = createSelector(selectAuthDomain(), substate => substate.statusLogin);
const selectAuthStatus = createSelector(selectAuthDomain(), substate => substate.auth);
const selectListAuth = createSelector(selectAuthDomain(), substate => substate.list_auth);
const switchAuth = createSelector(selectAuthDomain(), substate => substate.switch_auth);

const selectAuth = createSelector(
  selectRegisterStatus,
  selectLoginStatus,
  selectAuthStatus,
  selectListAuth,
  switchAuth,

  (selectRegisterStatus, selectLoginStatus, selectAuthStatus, selectListAuth, switchAuth) => ({
    selectRegisterStatus,
    selectLoginStatus,
    selectAuthStatus,
    selectListAuth,
    switchAuth
  })
);

export { selectRegisterStatus, selectLoginStatus, selectAuthStatus, selectListAuth, switchAuth };

export default selectAuth;
