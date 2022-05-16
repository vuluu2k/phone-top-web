import React, { useEffect, useState } from 'react';
import { Table, Button, Input, message as messageAntd, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RedoOutlined, LoadingOutlined, DeleteOutlined, PhoneOutlined, MailOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { Admin } from 'components/layouts';
import { TableCustom, ComfirmModal } from 'components/Common';
import { SnyTabs } from 'components/Lib';
import { selectAuth } from 'selectors';
import { authActions } from 'actions';
import { AccountModal } from 'components/auth';

const { Search } = Input;
const options = [
  {
    value: '',
    label: 'Tất cả',
  },
  {
    value: 0,
    label: 'Khách hàng',
  },
  {
    value: 1,
    label: 'Quản lí',
  },
  {
    value: 2,
    label: 'Nhân viên',
  },
];

function AccountManager(props) {
  const navigate = useNavigate();
  const {
    actions,
    selectAuthStatus: { user },
    selectListAuth: { requesting, auths, dataSearch },
  } = props;

  const [selectUser, setSelectUser] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [saveId, setSaveId] = useState('');

  const onShowCancel = () => setShowCancel(true);
  const onHiddenCancel = () => setShowCancel(false);

  const onShowModal = () => setShowModal(true);
  const onHiddenModal = () => setShowModal(false);

  useEffect(() => {
    actions.loadListUser(dataSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectUser = value => {
    actions.loadListUser({ ...dataSearch, role: value });
    setSelectUser(value);
  };

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      dataIndex: 'stt',
      render: (_, item, index) => <div>{index + 1}</div>,
    },
    {
      title: 'Tên tài khoản',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Họ tên',
      key: 'full_name',
      align: 'center',
      dataIndex: 'full_name',
    },
    {
      title: 'Số điện thoại',
      key: 'phone_number',
      dataIndex: 'phone_number',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'center',
      dataIndex: 'actions',
      render: (_, item) => (
        <div>
          <Tooltip title="Gọi cho chủ số tài khoản">
            <Button
              onClick={() => window.open(`tel:${item.phone_number}`, '_self')}
              className="btn-blue ml-8"
              size="small"
              icon={<PhoneOutlined />}
            />
          </Tooltip>
          <Tooltip title="Gửi mail cho chủ số tài khoản">
            <Button onClick={() => window.open(`mailto:${item.email}`, '_self')} className="btn-orange ml-8" size="small" icon={<MailOutlined />} />
          </Tooltip>
          <Tooltip title="Xóa tài khoản">
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
        </div>
      ),
    },
  ];

  if (user?.role === 0 || user?.role === 2) {
    messageAntd.error('Bạn không có quyền hạn truy cập vào đây!');
    navigate('/product-manager');
  }

  return (
    <Admin title="Quản lý tài khoản">
      <TableCustom
        title="Tài khoản khách hàng"
        refesh={
          <Button
            onClick={() => actions.loadListUser(dataSearch)}
            style={{ borderRadius: 8 }}
            icon={(requesting && <LoadingOutlined />) || <RedoOutlined />}
          />
        }
        search={
          <>
            <Button icon={<PlusOutlined />} style={{ backgroundColor: '#1890ff', color: '#fff', marginRight: 8 }} onClick={onShowModal}>
              Thêm tài khoản
            </Button>
            <Search
              placeholder={`Nhập tên tài khoản`}
              style={{ width: 400 }}
              onChange={e => actions.loadListUser({ ...dataSearch, name: e.target.value })}
              onSearch={e => actions.loadListUser({ name: e })}
              allowClear
            />
          </>
        }>
        <SnyTabs value={selectUser} options={options} onClick={(value, _) => handleSelectUser(value)} />
        <Table
          className="data-custom"
          scroll={{ y: 'calc(100vh - 308px)' }}
          size="small"
          dataSource={auths}
          columns={columns}
          loading={requesting}
          rowKey={record => record._id}
          pagination={{
            style: { width: '100%', textAlign: 'center' },
            pageSize: 20,
            showSizeChanger: false,
            showTotal: (total, range) => (
              <div>
                Hiển thị: {range[1]}/{total} tài khoản
              </div>
            ),
          }}
        />
      </TableCustom>
      <AccountModal visible={showModal} onCancel={onHiddenModal} />
      <ComfirmModal
        visible={showCancel}
        content={`Bạn chắc chắn muốn xóa tài khoản này`}
        onClose={onHiddenCancel}
        onSubmit={() => {
          actions.deleteUser({ id: saveId });
          onHiddenCancel();
        }}
      />
    </Admin>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...authActions }, dispatch) });
const mapStateToProps = state => ({ ...selectAuth(state) });

export default connect(mapStateToProps, mapDispatchToProps)(AccountManager);
