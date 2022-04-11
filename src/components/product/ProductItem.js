import React from 'react';
import { Image } from 'antd';
import { Link } from 'react-router-dom';

import { moneyMask } from 'utils/number';

export default function ProductItem({ id, name, value, imageLink }) {
  return (
    <Link to={`/product-detail/${id}`}>
      <div className="product-item" style={{ minHeight: 230 }}>
        <Image src={imageLink} height="160" />
        <div style={{ color: '#000', fontWeight: 500, fontSize: 14, marginTop: 16 }}>{name}</div>
        <div style={{ color: 'red', fontWeight: 700 }}>{moneyMask(value)}</div>
      </div>
    </Link>
  );
}
