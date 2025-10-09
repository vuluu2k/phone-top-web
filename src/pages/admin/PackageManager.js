import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Badge, Tooltip } from 'antd';
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
import { TableCustom, ComfirmModal } from 'components/Common';
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
  const [showCancel, setShowCancel] = useState(false);
  const [saveId, setSaveId] = useState('');

  const onShowCancel = () => setShowCancel(true);
  const onHiddenCancel = () => setShowCancel(false);

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
      render: (_, item) => <div>{item?.full_name}</div>,
    },
    {
      title: 'Số điện thoại',
      key: 'phone_number',
      dataIndex: 'phone_number',
      render: (_, item) => <div>{item?.phone_number}</div>,
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
      render: (value, item) => <div className="text-blue fw-500">{moneyMask(value || 0)}</div>,
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      render: (_, item) => <div>{item?.email}</div>,
    },
    {
      title: 'Hình thức thanh toán',
      key: 'isPay',
      dataIndex: 'isPay',
      render: (_, item) => <div>{item?.is_pay}</div>,
    },
    {
      title: 'Trạng thái',
      key: 'current_status_vi',
      dataIndex: 'current_status_vi',
      align: 'center',
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
              <Tooltip title="Xác nhận đơn hàng">
                <Button
                  onClick={() => actions.acceptPackage({ package_id: item._id })}
                  className="btn-green ml-8"
                  size="small"
                  icon={<CheckCircleOutlined />}
                />
              </Tooltip>
            )}

            {(!item.isAccess || item.isRequest?.isTrash) && (
              <Badge dot={item.isRequest?.isTrash}>
                <Tooltip title={(item.isRequest?.isTrash && 'Hủy đơn hàng theo yêu cầu') || 'Hủy đơn hàng'}>
                  <Button
                    onClick={() => {
                      setSaveId(item._id);
                      onShowCancel();
                    }}
                    className="btn-red ml-8"
                    size="small"
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
              </Badge>
            )}
            <Tooltip title="Chuyển đơn hàng cho shipper">
              <Button
                onClick={() => actions.sendShipper({ package_id: item._id })}
                className="btn-green ml-8"
                size="small"
                icon={<UserSwitchOutlined />}
              />
            </Tooltip>
          </div>
          <div className="mt-8">
            <Tooltip title="Gọi điện cho khách đặt hàng">
              <Button
                onClick={() => window.open(`tel:${item.phone_number}`, '_self')}
                className="btn-blue ml-8"
                size="small"
                icon={<PhoneOutlined />}
              />
            </Tooltip>
            <Tooltip title="Gửi mail cho khách đặt hàng">
              <Button onClick={() => window.open(`mailto:${item.email}`, '_self')} className="btn-orange ml-8" size="small" icon={<MailOutlined />} />
            </Tooltip>
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
      <ComfirmModal
        visible={showCancel}
        content={`Bạn chắc chắn muốn hủy đơn hàng ${saveId}`}
        onClose={onHiddenCancel}
        onSubmit={() => {
          actions.deletePackage({ id: saveId });
          onHiddenCancel();
        }}
      />
    </Admin>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...packageActions }, dispatch) });
const mapStateToProps = state => ({ ...selectPackage(state) });

export default connect(mapStateToProps, mapDispatchToProps)(PackageManager);
