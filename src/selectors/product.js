import { createSelector } from 'reselect';

const selectProductDomain = () => state => state.product;

const selectProductInformation = createSelector(selectProductDomain(), substate => substate.productInfomation);
const selectProductInformationHome = createSelector(selectProductDomain(), substate => substate.productInfomationHome);

const selectProduct = createSelector(
  selectProductInformation,
  selectProductInformationHome,

  (selectProductInformation, selectProductInformationHome) => ({
    selectProductInformation,
    selectProductInformationHome,
  })
);

export { selectProductInformation, selectProductInformationHome };

export default selectProduct;
