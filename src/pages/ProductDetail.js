import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { message, Row, Col, Image, Button } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { cartActions } from 'actions';
import { selectAuth, selectCart } from 'selectors';
import { API_URL } from 'env_config';
import { Client } from 'components/layouts';
import { moneyMask } from 'utils/number';

function ProductDetail(props) {
  let { id } = useParams();
  const [state, setState] = useState({ productItem: {}, selectOption: -1, nameState: '', valueState: null });

  const {
    actions: { addCart },
  } = props;
  const { productItem, selectOption, nameState, valueState } = state;
  const { image_link, name, value, options, profile, _id } = productItem;

  useEffect(() => {
    setState({ ...state, nameState: name, valueState: value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, value]);

  const hanldeOnSelectOptions = (idx, name, value) => {
    setState({ ...state, selectOption: idx, nameState: name, valueState: value });
  };

  const hanleGetProduct = async () => {
    const url = `${API_URL}/product/view?product_id=${id}`;

    try {
      const response = await axios.get(url);

      if (!response.data.success) {
        message.error(response.data.message);
        setState({ ...state, productItem: {} });
      } else {
        setState({ ...state, productItem: response.data.products[0] });
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCart = () => {
    addCart({ product_id: _id, name_option: nameState, value_option: valueState });
  };

  useEffect(() => {
    hanleGetProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Client>
      <Row gutter={30} style={{ padding: '16px 0' }}>
        <Col span={8}>
          <div className="product-item-detail d-flex align-item-center justify-content-center">
            <Image src={image_link} />
          </div>
        </Col>
        <Col span={16}>
          <h2>{name?.toUpperCase()}</h2>
          <div>Giá chính thức:</div>
          <div className="product-item-money">{moneyMask(valueState || value)}</div>
          {options?.length > 0 && (
            <div className="d-flex align-items-center justify-content-between">
              <div
                className={(selectOption === -1 && 'option-item-activated') || 'option-item'}
                style={{ cursor: 'pointer' }}
                onClick={() => hanldeOnSelectOptions(-1, name, value)}>
                <div>{profile?.ram_capacity + 'GB ' + profile?.rom_capacity + 'GB'}</div>
                <div>{moneyMask(value)}</div>
              </div>
              {options?.length > 0 &&
                options.map((item, idx) => (
                  <div
                    key={idx}
                    className={(selectOption === idx && 'option-item-activated') || 'option-item'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => hanldeOnSelectOptions(idx, item?.name_option, item?.value_option)}>
                    <div>{item?.name_option.toUpperCase()}</div>
                    <div>{moneyMask(item?.value_option)}</div>
                  </div>
                ))}
            </div>
          )}
          <Button style={{ marginTop: 16 }} type="primary" onClick={() => handleAddCart()} block>
            Mua ngay
          </Button>
        </Col>
      </Row>
    </Client>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...cartActions }, dispatch) });
const mapStateToProps = state => ({ ...selectAuth(state), ...selectCart(state) });

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
