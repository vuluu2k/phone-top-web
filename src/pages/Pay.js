import React from 'react';
import { Steps, Row, Col } from 'antd';
import { ShoppingCartOutlined, IdcardOutlined, PercentageOutlined, CreditCardOutlined } from '@ant-design/icons';
import { FiPackage } from 'react-icons/fi';

import { Client } from 'components/layouts';

const { Step } = Steps;

export default function Pay() {
  const styleIconStep = { width: 36, height: 36, borderRadius: 18, border: '1px solid #000' };

  return (
    <Client footer={false}>
      <div style={{ padding: '16px' }}>
        <div className="text-red fw-700 fz-18 text-center mb-16">Thông tin đặt hàng</div>
        <Row>
          <Col span={6}></Col>
          <Col span={12} style={{ backgroundColor: '#fef2f2', padding: 16, borderRadius: 16 }}>
            <Steps current={0} direction="horizontal" labelPlacement="vertical">
              <Step
                title="Chọn sản phẩm"
                icon={
                  <div className="d-flex align-items-center justify-content-center" style={styleIconStep}>
                    <ShoppingCartOutlined style={{ color: '#000', fontSize: 16 }} />
                  </div>
                }
              />
              <Step
                title="Thông tin"
                icon={
                  <div className="d-flex align-items-center justify-content-center" style={styleIconStep}>
                    <IdcardOutlined style={{ color: '#000', fontSize: 16 }} />
                  </div>
                }
              />
              <Step
                title="Phiếu giảm giá"
                icon={
                  <div className="d-flex align-items-center justify-content-center" style={styleIconStep}>
                    <PercentageOutlined style={{ color: '#000', fontSize: 16 }} />
                  </div>
                }
              />
              <Step
                title="Thanh toán"
                icon={
                  <div className="d-flex align-items-center justify-content-center" style={styleIconStep}>
                    <CreditCardOutlined style={{ color: '#000', fontSize: 16 }} />
                  </div>
                }
              />
              <Step
                title="Hoàn tất"
                icon={
                  <div className="d-flex align-items-center justify-content-center" style={styleIconStep}>
                    <FiPackage style={{ color: '#000', fontSize: 16 }} />
                  </div>
                }
              />
            </Steps>
          </Col>
          <Col span={6}></Col>
        </Row>
      </div>
    </Client>
  );
}
