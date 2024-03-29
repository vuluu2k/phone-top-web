import React, { useState, useEffect } from 'react';
import { Input, Form, message as messageAntd, Button } from 'antd';
import validator from 'validator';

export default function Register(props) {
  const [state, setState] = useState({ username: '', email: '', password: '', password_repeat: '', phone_number: '', full_name: '' });

  const { username, email, password, password_repeat, phone_number, full_name } = state;

  const {
    actions: { register },
    selectAuthStatus: { success, requesting },
  } = props;

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    notification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requesting]);

  const notification = () => {
    if (success && !requesting) onClear();
  };

  const onClear = () => {
    setState({ username: '', email: '', password: '', password_repeat: '', phone_number: '', full_name: '' });
  };

  const onSubmit = () => {
    if (password_repeat !== password) {
      return messageAntd.error('Mật khẩu nhập lại không chính xác', 1);
    }
    if (
      validator.isEmpty(username) ||
      validator.isEmpty(full_name) ||
      validator.isEmpty(email) ||
      validator.isEmpty(phone_number) ||
      validator.isEmpty(password) ||
      validator.isEmpty(password_repeat)
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
    register({ username, email, password, phone_number, full_name });
  };

  return (
    <div>
      <Form name="basic">
        <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}>
          <Input placeholder="Tài khoản" name="username" value={username} onChange={onChange} onPressEnter={() => onSubmit()} />
        </Form.Item>

        <Form.Item name="full_name" rules={[{ required: true, message: 'Vui lòng nhập họ tên đầy đủ của bạn!' }]}>
          <Input placeholder="Nhập họ tên đầy đủ" name="full_name" value={full_name} onChange={onChange} onPressEnter={() => onSubmit()} />
        </Form.Item>

        <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
          <Input placeholder="Email@gmail.com" name="email" value={email} onChange={onChange} onPressEnter={() => onSubmit()} />
        </Form.Item>

        <Form.Item name="phone_number" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
          <Input placeholder="Số điện thoại" name="phone_number" value={phone_number} onChange={onChange} onPressEnter={() => onSubmit()} />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
          <Input.Password placeholder="Mật khẩu" name="password" value={password} onChange={onChange} onPressEnter={() => onSubmit()} />
        </Form.Item>

        <Form.Item name="password_repeat" rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu!' }]}>
          <Input.Password
            placeholder="Nhập lại mật khẩu"
            name="password_repeat"
            value={password_repeat}
            onChange={onChange}
            onPressEnter={() => onSubmit()}
          />
        </Form.Item>

        <Form.Item>
          <Button className="btn-switch on" style={{ margin: '16px 12px 0' }} loading={requesting} onClick={() => onSubmit()} block>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
