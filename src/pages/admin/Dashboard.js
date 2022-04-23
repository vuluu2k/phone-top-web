import React from 'react';

import { Admin } from 'components/layouts';
import { Charts, PieChart } from 'components/Common';

export default function Dashboard() {
  return (
    <Admin title="Báo cáo - live">
      <Charts />
      <PieChart />
    </Admin>
  );
}
