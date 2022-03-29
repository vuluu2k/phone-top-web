import { createSelector } from 'reselect';

const selectAuthDomain = () => state => state.auth;

const selectRegisterStatus = createSelector(selectAuthDomain(), substate => substate.statusRegister);
const selectLoginStatus = createSelector(selectAuthDomain(), substate => substate.statusLogin);
const selectAuthStatus = createSelector(selectAuthDomain(), substate => substate.auth);

const selectAuth = createSelector(
  selectRegisterStatus,
  selectLoginStatus,
  selectAuthStatus,

  (selectRegisterStatus, selectLoginStatus, selectAuthStatus) => ({
    selectRegisterStatus,
    selectLoginStatus,
    selectAuthStatus,
  })
);

export { selectRegisterStatus, selectLoginStatus, selectAuthStatus };

export default selectAuth;
