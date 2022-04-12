import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { message, Row, Col, Image, Button } from 'antd';
import axios from 'axios';

import { API_URL } from 'env_config';
import { Client } from 'components/layouts';
import { moneyMask } from 'utils/number';

export default function ProductDetail(props) {
  let { id } = useParams();
  const [state, setState] = useState({ productItem: {}, selectOption: -1, valueState: 0 });
  const { productItem, selectOption, valueState } = state;
  const { image_link, name, value, options, profile } = productItem;

  const hanldeOnSelectOptions = (idx, value) => {
    setState({ ...state, selectOption: idx, valueState: value });
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

  useEffect(() => {
    hanleGetProduct();
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
          <div className="product-item-money">{moneyMask((valueState !== 0 && valueState) || value)}</div>
          {options?.length > 0 && (
            <div className="d-flex align-items-center justify-content-between">
              <div
                className={(selectOption === -1 && 'option-item-activated') || 'option-item'}
                style={{ cursor: 'pointer' }}
                onClick={() => hanldeOnSelectOptions(-1, value)}>
                <div>{profile?.ram_capacity + 'GB ' + profile?.rom_capacity + 'GB'}</div>
                <div>{moneyMask(value)}</div>
              </div>
              {options?.length > 0 &&
                options.map((item, idx) => (
                  <div
                    key={idx}
                    className={(selectOption === idx && 'option-item-activated') || 'option-item'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => hanldeOnSelectOptions(idx, item.value_option)}>
                    <div>{item?.name_option.toUpperCase()}</div>
                    <div>{moneyMask(item?.value_option)}</div>
                  </div>
                ))}
            </div>
          )}
          <Button style={{ marginTop: 16 }} type="primary" block>
            Mua ngay
          </Button>
        </Col>
      </Row>
    </Client>
  );
}
