import React, { useState, useEffect } from 'react';
import { Table, Button, Input } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  RedoOutlined,
  LoadingOutlined,
  DeleteOutlined,
  PhoneOutlined,
  MailOutlined,
  CheckCircleOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';

import { Admin } from 'components/layouts';
import { packageActions } from 'actions';
import { selectPackage } from 'selectors';
import { TableCustom } from 'components/Common';
import { SnyTabs } from 'components/Lib';
import { moneyMask } from 'utils/number';

const options = [
  { value: '', label: 'Tất cả' },
  { value: true, label: 'Đã xác nhận' },
  { value: false, label: 'Chưa xác nhận' },
];

const { Search } = Input;

function PackageManager(props) {
  const {
    actions,
    selectListPackage: { viewPackage, requesting, dataSearch },
  } = props;

  const [selectTab, setSelectTab] = useState('');

  useEffect(() => {
    actions.loadListPackage({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectTab = (value, _) => {
    actions.loadListPackage({ isAccess: value });
    setSelectTab(value);
  };

  const columns = [
    {
      title: 'Mã đơn',
      key: '_id',
      dataIndex: '_id',
      render: (_, item) => <div>{item._id}</div>,
    },
    {
      title: 'Tên khách hàng',
      key: 'full_name',
      dataIndex: 'full_name',
      render: (_, item) => <div>{item?.user_id?.full_name}</div>,
    },
    {
      title: 'Số điện thoại',
      key: 'phone_number',
      dataIndex: 'phone_number',
      render: (_, item) => <div>{item?.user_id?.phone_number}</div>,
    },
    {
      title: 'Sản phẩm',
      key: 'products',
      dataIndex: 'products',
      render: (_, item) => {
        return (
          <div>
            {item.products.map((a, idx) => (
              <span key={idx}>{`${a.name}(${a.quantity}) ,`}</span>
            ))}
          </div>
        );
      },
    },
    {
      title: 'Giá trị',
      key: 'value',
      dataIndex: 'value',
      render: (value, item) => <div className="text-red fw-500">{moneyMask(value || 0)}</div>,
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      render: (_, item) => <div>{item?.user_id?.email}</div>,
    },
    {
      title: 'Trạng thái',
      key: 'current_status_vi',
      dataIndex: 'current_status_vi',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'center',
      dataIndex: 'actions',
      render: (_, item) => (
        <div>
          <div>
            {!item.isAccess && (
              <Button
                onClick={() => actions.acceptPackage({ package_id: item._id })}
                className="btn-green ml-8"
                size="small"
                icon={<CheckCircleOutlined />}
              />
            )}

            {!item.isAccess ||
              (item.isRequest?.isTrash && (
                <Button onClick={() => actions.deletePackage({ id: item._id })} className="btn-red ml-8" size="small" icon={<DeleteOutlined />} />
              ))}
            <Button
              onClick={() => actions.sendShipper({ package_id: item._id })}
              className="btn-green ml-8"
              size="small"
              icon={<UserSwitchOutlined />}
            />
          </div>
          <div className="mt-8">
            <Button
              onClick={() => window.open(`tel:${item.phone_number}`, '_self')}
              className="btn-blue ml-8"
              size="small"
              icon={<PhoneOutlined />}
            />
            <Button onClick={() => window.open(`mailto:${item.email}`, '_self')} className="btn-orange ml-8" size="small" icon={<MailOutlined />} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Admin title="Quản lý đơn hàng">
      <TableCustom
        title="Thông tin đơn hàng"
        refesh={
          <Button
            onClick={() => actions.loadListPackage(dataSearch)}
            style={{ borderRadius: 8 }}
            icon={(requesting && <LoadingOutlined />) || <RedoOutlined />}
          />
        }
        search={
          <>
            <Search
              placeholder="Nhập số điện thoại hoặc mã đơn hàng"
              style={{ width: 400 }}
              onChange={e => actions.loadListPackage({ ...dataSearch, codePackage: e.target.value, phoneNumber: e.target.value })}
              onSearch={e => actions.loadListPackage({ ...dataSearch, codePackage: e, phoneNumber: e })}
              allowClear
            />
          </>
        }>
        <SnyTabs options={options} value={selectTab} onClick={handleSelectTab} />
        <Table
          columns={columns}
          dataSource={viewPackage}
          loading={requesting}
          rowKey={record => record._id}
          size="small"
          scroll={{ y: 'calc(100vh - 292px)' }}
          pagination={{
            style: { width: '100%', textAlign: 'center' },
            pageSize: 20,
            showSizeChanger: false,
            showTotal: (total, range) => (
              <div>
                Hiển thị: {range[1]}/{total} đơn
              </div>
            ),
          }}
        />
      </TableCustom>
    </Admin>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...packageActions }, dispatch) });
const mapStateToProps = state => ({ ...selectPackage(state) });

export default connect(mapStateToProps, mapDispatchToProps)(PackageManager);
