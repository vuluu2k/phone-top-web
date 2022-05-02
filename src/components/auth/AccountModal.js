import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button, message as messageAntd } from 'antd';
import { RollbackOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validator from 'validator';

import { authActions } from 'actions';
import { selectAuth } from 'selectors';

const { Option } = Select;

function AccountModal(props) {
  const {
    visible,
    onCancel,
    actions,
    selectAuthStatus: { success, requesting },
  } = props;

  const [account, setAccount] = useState({ username: '', password: '', re_password: '', role: 0, phone_number: '', email: '', full_name: '' });
  const { username, full_name, password, re_password, role, phone_number, email } = account;

  const onChangeInput = e => setAccount({ ...account, [e.target.name]: e.target.value });

  useEffect(() => {
    notification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requesting]);

  const notification = () => {
    if (success && !requesting) {
      onClear();
      onCancel();
    }
  };

  const onClear = () => {
    setAccount({ username: '', password: '', re_password: '', role: 0, phone_number: '', email: '', full_name: '' });
  };

  const onSubmit = () => {
    if (re_password !== password) {
      return messageAntd.error('Mật khầu nhập lại không đúng');
    }
    if (
      validator.isEmpty(username) ||
      validator.isEmpty(full_name) ||
      validator.isEmpty(email) ||
      validator.isEmpty(phone_number) ||
      validator.isEmpty(password) ||
      validator.isEmpty(re_password)
    ) {
      return messageAntd.error('Bạn chưa nhập đủ trường dữ liệu');
    }
    if (!validator.isEmail(String(email))) {
      return messageAntd.error('Kiểu email không chính xác ', 1);
    }
    if (!validator.isMobilePhone(phone_number)) {
      return messageAntd.error('Số điện thoại không đúng định dạng');
    }
    if (!validator.isLength(String(password), { min: 8 })) {
      return messageAntd.error('Mật khẩu tối thiểu là 8 kí tự ', 1);
    }
    actions.register(account);
  };

  const style = { marginTop: 8 };

  return (
    <Modal
      title="TẠO TÀI KHOẢN"
      visible={visible}
      onCancel={onCancel}
      footer={
        <>
          <Button icon={<RollbackOutlined />} className="btn-orange" onClick={onCancel}>
            Quay lại
          </Button>
          <Button className="btn-blue" icon={<PlusOutlined />} onClick={() => onSubmit()}>
            Thêm sản phẩm
          </Button>
        </>
      }>
      <Input name="username" style={style} placeholder="Tên tài khoản" value={username} onChange={onChangeInput} />
      <Input name="full_name" style={style} placeholder="Họ và tên" value={full_name} onChange={onChangeInput} />
      <Input name="phone_number" style={style} placeholder="Số điện thoại" value={phone_number} onChange={onChangeInput} />
      <Input name="email" style={style} placeholder="Example@gmail.com" value={email} onChange={onChangeInput} />

      <Select name="role" value={role} onChange={e => setAccount({ ...account, role: e })} style={{ width: '100%', marginTop: 8 }}>
        <Option value={0}>Tài khoản thường</Option>
        <Option value={2}>Tài khoản nhân viên</Option>
        <Option value={1}>Tài khoản Quản lý</Option>
      </Select>

      <Input.Password name="password" style={style} placeholder="Mật khẩu" value={password} onChange={onChangeInput} />
      <Input.Password name="re_password" style={style} placeholder="Nhập lại mật khẩu" value={re_password} onChange={onChangeInput} />
    </Modal>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...authActions }, dispatch) });
const mapStateToProps = state => ({ ...selectAuth(state) });

export default connect(mapStateToProps, mapDispatchToProps)(AccountModal);
