import { createSelector } from 'reselect';

const selectLayoutDomain = () => state => state.layout;

const selectLayoutInformation = createSelector(selectLayoutDomain(), substate => substate.layoutInfomation);

const selectLayout = createSelector(
  selectLayoutInformation,

  selectLayoutInformation => ({
    selectLayoutInformation,
  })
);

export { selectLayoutInformation };

export default selectLayout;
