import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CloseCircleOutlined } from '@ant-design/icons';
import { bindActionCreators } from 'redux';

import { selectCart } from 'selectors';
import { cartActions } from 'actions';
import { moneyMask } from 'utils/number';

function CartDetail(props) {
  const {
    actions: { deleteCart },
    selectCartInformation: { products },
    user_id,
  } = props;
  return (
    <>
      {(products.length > 0 &&
        products.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 8, backgroundColor: '#f0f0f0', padding: 4 }}>
            <div className="d-flex w-100">
              <div>
                <img src={item.image_link} alt={item.name_option} width="80" height="80" />
              </div>
              <div className="ml-4 w-100">
                <div className="d-flex justify-content-between fw-500 w-100">
                  <div>
                    {item.name} x {item.quantity}
                  </div>
                  <div>
                    <CloseCircleOutlined
                      className="cursor-pointer"
                      onClick={() => deleteCart({ product_id: item.product_id, name_option: item.name_option, user_id })}
                    />
                  </div>
                </div>
                <div>{item.name_option}</div>
                <div className="fw-500" style={{ color: '#D70018 ' }}>
                  {moneyMask(item.value_option)}
                </div>
              </div>
            </div>
          </div>
        ))) || <div className="h-100 d-flex align-items-center w-100 justify-content-center">Chưa có sản phẩm nào trong giỏ hàng</div>}
    </>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...cartActions }, dispatch) });
const mapStateToProps = state => ({ ...selectCart(state) });

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
