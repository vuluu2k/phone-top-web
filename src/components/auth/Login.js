import React from 'react';
import { Input } from 'antd';

import AuthLayout from './AuthLayout';

export default function Login() {
  return (
    <AuthLayout>
      <Input placeholder="Tài khoản" />
      <Input placeholder="Mật khẩu" className="mt-8" />
    </AuthLayout>
  );
}
