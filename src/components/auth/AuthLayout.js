import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from './Login';
import Register from './Register';

import authActions from 'actions/auth';

function AuthLayout(props) {
  const [status, setStatus] = useState(true);
  const onChangeStatus = () => setStatus(!status);

  return (
    <div className="auth container">
      <div className="dark-overlay">
        <div className="auth-inner">
          <div style={{ backgroundColor: 'white', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column' }}>
            <h3>Chào mừng bạn tới cửa hàng của chúng tôi</h3>
            <div className="d-flex justify-content-center mt-16">
              <div className="d-flex" style={{ borderRadius: 14, boxShadow: '0 0 4px 1px #ff7e21' }}>
                <div className={(status && 'btn-switch on') || 'btn-switch'} onClick={onChangeStatus}>
                  Đăng nhập
                </div>
                <div className={(!status && 'btn-switch on') || 'btn-switch'} onClick={onChangeStatus}>
                  Đăng ký
                </div>
              </div>
            </div>
            <div className="mt-16" style={{ width: 400 }}>
              {(status && <Login {...props} />) || <Register {...props} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(authActions, dispatch) });

export default connect(null, mapDispatchToProps)(AuthLayout);
