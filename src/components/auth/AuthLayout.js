import React, { useEffect } from 'react';
import { Button } from 'antd'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons'

import Login from './Login';
import Register from './Register';

import authActions from 'actions/auth';
import { selectAuth } from 'selectors';

function AuthLayout(props) {
  const navigate = useNavigate();
  const { switchAuth, actions } = props

  useEffect(() => {
    actions.switchStateAuth({ status: true })
    // eslint-disable-next-line
  }, [])

  return (
    <div className="auth container">
      <div className="dark-overlay">
        <div className="auth-inner">
          <div style={{ backgroundColor: 'white', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column' }}>
            <h3>PhoneTop Nơi cuộc sống của công nghệ dành cho bạn!</h3>
            <div className="d-flex justify-content-center mt-16">
              <div className="d-flex" style={{ borderRadius: 14, boxShadow: '0 0 4px 1px #ff7e21' }}>
                <div className={(switchAuth && 'btn-switch on') || 'btn-switch'} onClick={() => actions.switchStateAuth({ status: true })}>
                  Đăng nhập
                </div>
                <div className={(!switchAuth && 'btn-switch on') || 'btn-switch'} onClick={() => actions.switchStateAuth({ status: false })}>
                  Đăng ký
                </div>
              </div>
            </div>
            <div className="mt-16" style={{ width: 400 }}>
              {(switchAuth && <Login {...props} />) || <Register {...props} />}
            </div>
          </div>
        </div>
      </div>
      <Button icon={<LeftOutlined />} className="btn-switch on" style={{ position: 'fixed', top: 12, left: 12, border: 'none' }} onClick={() => navigate('/home')}>Trang chủ</Button>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(authActions, dispatch) });

export default connect(selectAuth, mapDispatchToProps)(AuthLayout);
