import { createSelector } from 'reselect';

const selectProductDomain = () => state => state.product;

const selectProductInformation = createSelector(selectProductDomain(), substate => substate.productInfomation);

const selectProduct = createSelector(
  selectProductInformation,

  selectProductInformation => ({
    selectProductInformation,
  })
);

export { selectProductInformation };

export default selectProduct;
