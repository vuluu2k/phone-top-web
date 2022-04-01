import React from 'react';
import { Image } from 'antd';

import { moneyMask } from 'utils/number';

export default function ProductItem({ name, value }) {
  return (
    <div className="product-item">
      <Image src="https://image.cellphones.com.vn/220x/media/catalog/product/y/e/yellow_final_2.jpg" height="160" />
      <div style={{ color: '#000', fontWeight: 500, fontSize: 15 }}>{name}</div>
      <div style={{ color: 'red', fontWeight: 700 }}>{moneyMask(value)}</div>
    </div>
  );
}
