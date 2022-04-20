import { createSelector } from 'reselect';

const selectPackageDomain = () => state => state.package;

const selectListPackage = createSelector(selectPackageDomain(), substate => substate.list_package);
const selectCheckPackage = createSelector(selectPackageDomain(), substate => substate.check_package);

const selectPackage = createSelector(
  selectListPackage,
  selectCheckPackage,

  (selectListPackage, selectCheckPackage) => ({
    selectListPackage,
    selectCheckPackage,
  })
);

export { selectListPackage, selectCheckPackage };

export default selectPackage;
