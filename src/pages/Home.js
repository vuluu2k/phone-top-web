import React from 'react';
import { Row, Col } from 'antd';

import { Client } from 'components/layouts';
import { ProductItem } from 'components/product';
import { Silder } from 'components/Common';

const item = [
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
];

export default function Home(props) {
  return (
    <Client>
      <Silder item={item} />

      <Row gutter={15}>
        {item.map((a, index) => (
          <Col key={index} span={4}>
            <ProductItem name={a.name} value={a.value} />
          </Col>
        ))}
      </Row>
    </Client>
  );
}
