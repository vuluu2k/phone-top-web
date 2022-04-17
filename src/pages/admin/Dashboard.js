import React from 'react';
import { Table } from 'antd';

import { Admin } from 'components/layouts';

export default function Dashboard() {
  return (
    <Admin>
      <h1>Báo cáo - live</h1>
      <div className="data-table"></div>
    </Admin>
  );
}
