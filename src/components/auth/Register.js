import React, { useState } from 'react';
import { Input, Form, message } from 'antd';

export default function Register(props) {
  const [state, setState] = useState({ username: '', email: '', password: '', phone_number: '', full_name: '' });

  const { username, email, password, password_repeat, phone_number, full_name } = state;

  const {
    actions: { register },
  } = props;

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (password_repeat !== password) {
      return message.error('Mật khẩu nhập lại không chính xác', 1);
    }
    register({ username, email, password, phone_number, full_name });
  };

  return (
    <div>
      <Form name="basic">
        <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}>
          <Input placeholder="Tài khoản" name="username" value={username} onChange={onChange} />
        </Form.Item>

        <Form.Item name="full_name" rules={[{ required: true, message: 'Vui lòng nhập họ tên đầy đủ của bạn!' }]}>
          <Input placeholder="Nhập họ tên đầy đủ" name="full_name" value={full_name} onChange={onChange} />
        </Form.Item>

        <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
          <Input placeholder="Email@gmail.com" name="email" value={email} onChange={onChange} />
        </Form.Item>

        <Form.Item name="phone_number" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
          <Input placeholder="Số điện thoại" name="phone_number" value={phone_number} onChange={onChange} />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
          <Input.Password placeholder="Mật khẩu" name="password" value={password} onChange={onChange} />
        </Form.Item>

        <Form.Item name="password_repeat" rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu!' }]}>
          <Input.Password placeholder="Nhập lại mật khẩu" name="password_repeat" value={password_repeat} onChange={onChange} />
        </Form.Item>

        <Form.Item>
          <div className="btn-switch on" style={{ margin: '16px 12px 0' }} onClick={onSubmit}>
            Đăng ký
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
