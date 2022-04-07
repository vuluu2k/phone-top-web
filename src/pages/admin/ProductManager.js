import React from 'react';
import { Table } from 'antd';

import { Admin } from 'components/layouts';
import { TableCustom } from 'components/Common';

export default function ProductManager(props) {
  const columns = [
    {
      title: 'Mã sản phẩm',
      key: 'id',
      dataIndex: 'id',
      // render: (_, item, index) => <div>{index + 1} </div>,
    },
    {
      title: 'Tên sản phẩm',
      key: 'name',
      dataIndex: 'name',
      // render: (_, item) => <div>{item.name_vi}</div>,
    },
    {
      title: 'Số lượng',
      key: 'length',
      align: 'center',
      dataIndex: 'length',
      // render: (_, item) => <div>{item.sub_name.length}</div>,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      dataIndex: 'actions',
      // render: (_, item) => (
      //   <div>
      //     <Button className="btn-green" size="small" icon={<EditOutlined />} onClick={() => onShowEdit(item)} />
      //     <Button className="btn-red ml-8" size="small" icon={<DeleteOutlined />} onClick={() => onShowDelete()} />
      //     <ComfirmModal visible={visibleDelete} onClose={() => onHideDelete()} onSubmit={() => onSubmitDelete(item._id)} />
      //   </div>
      // ),
    },
  ];
  return (
    <Admin>
      <TableCustom title="Danh sách sản phẩm">
        <Table className="data-custom" columns={columns} dataSource={[]} rowKey={record => record._id} />
      </TableCustom>
    </Admin>
  );
}
