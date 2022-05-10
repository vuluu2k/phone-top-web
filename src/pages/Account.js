import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, Button, Input, message as messageAntd } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SaveOutlined, UserOutlined } from '@ant-design/icons';

import { Client } from 'components/layouts';
import { selectAuth, selectPackage } from 'selectors';
import { authActions, packageActions } from 'actions';

function Account(props) {
  const {
    actions: { editUser, loadListPackage },
    selectAuthStatus: { user, requesting, success, message },
    selectListPackage: { viewPackage },
  } = props;

  const [state, setState] = useState({
    statusChange: 'information',
    fullName: user?.full_name,
    Email: user?.email,
    phoneNumber: user?.phone_number,
    password: '',
    newPassword: '',
    newPasswordRepeat: '',
  });

  const { statusChange, fullName, Email, phoneNumber, password, newPassword, newPasswordRepeat } = state;
  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setState({
      statusChange: 'information',
      fullName: user?.full_name,
      Email: user?.email,
      phoneNumber: user?.phone_number,
      password: '',
      newPassword: '',
      newPasswordRepeat: '',
    });
    loadListPackage({ userId: user.user_id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  console.log(viewPackage);

  useEffect(() => {
    notification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requesting]);

  const notification = () => {
    if (success && !requesting) {
      return messageAntd.success(message || 'Cập nhật thành công');
    } else if (!success && !requesting) return messageAntd.error(message || 'Cập nhật thất bại');
  };

  const onSubmitChangeInfor = () => {
    editUser({ user_id: user._id, email: Email, phone_number: phoneNumber, full_name: fullName });
  };

  const onSubmitChangePassword = () => {
    editUser({ user_id: user._id, new_password: newPassword, password: password, change_password: true });
  };

  return (
    <Client>
      <Row style={{ margin: '16px 0' }}>
        <Col span={6} style={{ padding: 16 }}>
          <div className="d-flex align-items-center justify-content-center">
            <Avatar icon={<UserOutlined />} size={60} />
            <div className="ml-8 fw-500">{user?.name}</div>
          </div>
          <div className="mt-16">
            <Button
              type={(statusChange === 'information' && 'danger') || 'text'}
              block
              onClick={() => setState({ ...state, statusChange: 'information' })}>
              Thông tin tài khoản
            </Button>
          </div>
          <div>
            <Button
              type={(statusChange === 'changePassword' && 'danger') || 'text'}
              block
              onClick={() => setState({ ...state, statusChange: 'changePassword' })}>
              Đổi mật khẩu
            </Button>
          </div>
          <div>
            <Button
              type={(statusChange === 'myPackage' && 'danger') || 'text'}
              block
              onClick={() => setState({ ...state, statusChange: 'myPackage' })}>
              Đơn hàng của bạn
            </Button>
          </div>
        </Col>
        <Col span={18} style={{ backgroundColor: 'white', padding: 16, minHeight: 'calc(100vh - 298px)' }}>
          {(statusChange === 'information' && (
            <>
              <div>
                <h1>Hồ Sơ Của Tôi</h1>
                <h4>Quản lý thông tin hồ sơ để bảo mật tài khoản</h4>
              </div>

              <div className="text">
                Tên đăng nhập: <span className="fw-500">{user?.name}</span>
              </div>
              <Row>
                <div className="text">Họ và Tên</div>
                <Input name="fullName" value={fullName} onChange={onChange} />
              </Row>
              <Row>
                <div className="text">Email</div>
                <Input name="Email" value={Email} onChange={onChange} />
              </Row>
              <Row>
                <div className="text">Số điện thoại</div>
                <Input name="phoneNumber" value={phoneNumber} onChange={onChange} />
              </Row>
              <Row className="mt-16">
                <Button className="btn-blue" icon={<SaveOutlined />} style={{ minWidth: 112 }} onClick={() => onSubmitChangeInfor()}>
                  Lưu
                </Button>
              </Row>
            </>
          )) ||
            (statusChange === 'changePassword' && (
              <>
                <Row>
                  <div className="text">Nhập mật khẩu cũ</div>
                  <Input type="password" name="password" value={password} onChange={onChange} />
                </Row>
                <Row>
                  <div className="text">Mật khẩu mới</div>
                  <Input type="password" name="newPassword" value={newPassword} onChange={onChange} />
                </Row>
                <Row>
                  <div className="text">Nhập lại mật khẩu mới</div>
                  <Input type="password" name="newPasswordRepeat" value={newPasswordRepeat} onChange={onChange} />
                </Row>
                <Row className="mt-16">
                  <Button className="btn-blue" icon={<SaveOutlined />} style={{ minWidth: 112 }} onClick={() => onSubmitChangePassword()}>
                    Thay đổi mật khẩu
                  </Button>
                </Row>
              </>
            )) || (
              <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                {viewPackage?.length > 0 &&
                  viewPackage.map((item, idx) => (
                    <div key={idx} className="box-shadow mt-16 p-8">
                      <div className="d-flex">
                        {item.products?.length > 0 &&
                          item.products?.map((pr, idx) => (
                            <div key={idx} className="d-flex flex-column justify-content-center align-items-center">
                              <div>
                                <img src={pr.image_link} alt={pr.name} width="150" />
                              </div>
                              <div>{pr.name}</div>
                            </div>
                          ))}
                      </div>
                      <div>
                        <strong>Trạng thái đơn hàng :</strong>
                        {item.current_status_vi}
                        {item.isAccess || <span>| Đơn hàng chưa được xác nhận vui lòng liên hệ với PhoneTop để được xác nhận ngay</span>}
                      </div>
                    </div>
                  ))}
              </div>
            )}
        </Col>
      </Row>
    </Client>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...authActions, ...packageActions }, dispatch) });
const mapStateToProps = state => ({ ...selectAuth(state), ...selectPackage(state) });

export default connect(mapStateToProps, mapDispatchToProps)(Account);
