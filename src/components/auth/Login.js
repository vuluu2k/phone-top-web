import React from 'react';
import { Input, Checkbox, Form } from 'antd';

export default function Login() {
  return (
    <div>
      <Form name="basic" initialValues={{ remember: false }} autoComplete="off">
        <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}>
          <Input placeholder="Tài khoản" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox className="d-flex mt-8">Nhớ mật khẩu</Checkbox>
        </Form.Item>

        <Form.Item>
          <div className="btn-switch on" style={{ margin: '16px 12px 0' }}>
            Đăng nhập
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
