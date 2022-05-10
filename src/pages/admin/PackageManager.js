import React, { useState, useEffect } from 'react';
import { Table, Button, message as messageAntd, Input } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RedoOutlined, LoadingOutlined, DeleteOutlined, PhoneOutlined, MailOutlined, CheckCircleOutlined } from '@ant-design/icons';

import { Admin } from 'components/layouts';
import { packageActions } from 'actions';
import { selectPackage } from 'selectors';
import { TableCustom } from 'components/Common';
import { SnyTabs } from 'components/Lib';

const options = [
  { value: '', label: 'Tất cả' },
  { value: true, label: 'Đã xác nhận' },
  { value: false, label: 'Chưa xác nhận' },
];

const { Search } = Input;

function PackageManager(props) {
  const {
    actions,
    selectListPackage: { viewPackage, requesting, message, success, dataSearch },
  } = props;

  const [selectTab, setSelectTab] = useState('');

  useEffect(() => {
    actions.loadListPackage({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (viewPackage?.length > 0) {
      if (message === 'Tải dữ liệu đơn hàng thành công') return;
      if (success && !requesting) return messageAntd.success(message || 'Cập nhật thành công');
      else if (!success && !requesting) return messageAntd.error(message || 'Cập nhật thất bại');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requesting]);

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
      render: (_, item) => <div>{item.full_name}</div>,
    },
    {
      title: 'Số điện thoại',
      key: 'phone_number',
      dataIndex: 'phone_number',
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
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
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

            {!item.isAccess && (
              <Button onClick={() => actions.deletePackage({ id: item._id })} className="btn-red ml-8" size="small" icon={<DeleteOutlined />} />
            )}
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
