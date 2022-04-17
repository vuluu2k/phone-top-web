import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { BsEmojiFrownFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { Client } from 'components/layouts';
import { CartDetail } from 'components/cart';
import { selectCart } from 'selectors';

function Cart(props) {
  const {
    selectCartInformation: { products },
  } = props;

  return (
    <Client footer={false}>
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ padding: '16px 0' }}>
        <div className="text-red fz-18 fw-700 text-center">Giỏ hàng</div>
        {(products?.length > 0 && (
          <>
            <CartDetail screen="page" />
            <div className="cart-detail box-shadow p-16 border-radius-16">
              <Button className="btn-buy fw-500 fz-16 mb-8" style={{ height: 60, textTransform: 'uppercase' }} block>
                <Link to="/pay">Tiến hành đặt hàng</Link>
              </Button>
              <Button className="btn-red fw-500 fz-16" style={{ height: 60, textTransform: 'uppercase' }} block>
                <Link to="/home">Chọn sản phẩm khác</Link>
              </Button>
            </div>
          </>
        )) || (
          <div className="text-center" style={{ margin: '100px 0' }}>
            <BsEmojiFrownFill style={{ fontSize: 50, marginBottom: 50 }} />

            <div className="fz-16 fw-500" style={{ marginBottom: 50 }}>
              Không có sản phẩm nào trong giỏ hàng, vui lòng quay lại
            </div>
            <Button className="btn-buy fw-500 fz-16 mb-8" style={{ height: 40, textTransform: 'uppercase' }}>
              <Link to="/home">Quay lại trang chủ</Link>
            </Button>
          </div>
        )}
      </div>
    </Client>
  );
}

const mapStateToProps = state => ({ ...selectCart(state) });

export default connect(mapStateToProps, null)(Cart);
