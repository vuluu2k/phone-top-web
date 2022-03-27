import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

export default function AuthLayout({ children }) {
  const [status, setStatus] = useState(true);
  const onChangeStatus = () => setStatus(!status);

  return (
    <div className="auth container">
      <div className="dark-overlay">
        <div className="auth-inner">
          <div style={{ backgroundColor: 'white', borderRadius: 8, padding: 16 }}>
            <h3>Chào mừng bạn tới cửa hàng của chúng tôi</h3>
            <div className="d-flex justify-content-center">
              <div className="d-flex" style={{ borderRadius: 14, boxShadow: '0 0 4px 1px #ff7e21' }}>
                <div className={(status && 'btn-switch on') || 'btn-switch'} onClick={onChangeStatus}>
                  Đăng nhập
                </div>
                <div className={(!status && 'btn-switch on') || 'btn-switch'} onClick={onChangeStatus}>
                  Đăng ký
                </div>
              </div>
            </div>
            <div className="mt-8">{(status && <Login />) || <Register />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
