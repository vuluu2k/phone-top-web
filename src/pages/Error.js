import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate();
  return (
    <div className="wf-100 hf-100 d-flex align-items-center justify-content-center">
      <img src={require('static/images/image_error.png')} alt="error_image" />
      <div className="d-flex flex-column justify-content-center">
        <h1>Có gì đó không ổn :(</h1>
        <h4>Có vẻ trang web này không tồn tại hoặc đã bị xóa</h4>
        <Button type="primary" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </div>
    </div>
  );
}
