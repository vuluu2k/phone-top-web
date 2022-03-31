import React from 'react';
import { Row, Col } from 'antd';

import { Client } from 'components/layouts';
import { ProductItem } from 'components/product';

export default function Home(props) {
  console.log(props);
  return (
    <Client>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Row gutter={15}>
          <Col span={4}>
            <ProductItem name="iPhone SE 2022 | Chính hãng VN/A" value={100000} />
          </Col>
          <Col span={4}>
            <ProductItem name="iPhone SE 2022 | Chính hãng VN/A" value={100000} />
          </Col>
          <Col span={4}>
            <ProductItem name="iPhone SE 2022 | Chính hãng VN/A" value={100000} />
          </Col>
          <Col span={4}>
            <ProductItem name="iPhone SE 2022 | Chính hãng VN/A" value={100000} />
          </Col>
          <Col span={4}>
            <ProductItem name="iPhone SE 2022 | Chính hãng VN/A" value={100000} />
          </Col>
          <Col span={4}>
            <ProductItem name="iPhone SE 2022 | Chính hãng VN/A" value={100000} />
          </Col>
          <Col span={4}>
            <ProductItem name="iPhone SE 2022 | Chính hãng VN/A" value={100000} />
          </Col>
          <Col span={4}>
            <ProductItem name="iPhone SE 2022 | Chính hãng VN/A" value={100000} />
          </Col>
        </Row>
      </div>
    </Client>
  );
}
