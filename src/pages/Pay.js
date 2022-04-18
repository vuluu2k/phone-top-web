import React, { useState } from 'react';
import { Steps, Row, Col, Input, Radio, Select, Button } from 'antd';
import { ShoppingCartOutlined, IdcardOutlined, PercentageOutlined, CreditCardOutlined, LeftOutlined } from '@ant-design/icons';
import { FiPackage } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Client } from 'components/layouts';
import { selectAuth, selectCart } from 'selectors';
import { sumMoney } from 'utils/number';

const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;
const color_disable = '#0e2431';

function Pay(props) {
  const navigate = useNavigate();
  const {
    selectAuthStatus: { user },
    selectCartInformation: { products },
  } = props;
  const [stateStep, setStateStep] = useState(1);
  const [stateRadio, setStateRadio] = useState(1);
  const [stateStore, setStateStore] = useState('');
  const [stateInfor, setStateInfor] = useState({
    full_name: user?.full_name || '',
    phone_number: user?.phone_number || '',
    email: user?.email || '',
    full_address: '',
    provice: '',
    district: '',
    address: '',
    note: '',
  });

  const onChangeInput = e => setStateInfor({ ...stateInfor, [e.target.name]: e.target.value });

  const styleIconStep = { width: 36, height: 36, borderRadius: 18, border: '1px solid #000' };
  const { full_name, phone_number, email, provice, district, address, note } = stateInfor;
  const sumPay = sumMoney(products.map(item => item.quantity * item.value_option));

  const handleGoBack = () => {
    if (stateStep === 0) navigate('/cart');
    else setStateStep(stateStep - 1);
  };

  return (
    <Client footer={false}>
      <div style={{ padding: '16px' }}>
        <Row>
          <Col span={7}></Col>
          <Col span={10}>
            <div className="  d-flex text-red fz-18 fw-700 align-items-center justify-content-center mb-16" style={{ position: 'relative' }}>
              <div
                className="d-flex align-items-center justify-content-center cursor-pointer"
                onClick={() => handleGoBack()}
                style={{ position: 'absolute', left: 0 }}>
                <LeftOutlined style={{ fontSize: 14 }} />
                Trở về
              </div>
              <div>
                {stateStep === 1
                  ? 'Thông tin đặt hàng'
                  : stateStep === 2
                  ? 'Phiếu giảm giá'
                  : stateStep === 3
                  ? 'Chọn phương thức thanh toán'
                  : 'Hoàn tất'}
              </div>
            </div>
          </Col>
          <Col span={7}></Col>
        </Row>

        <Row>
          <Col span={7}></Col>
          <Col span={10} style={{ backgroundColor: '#fef2f2', borderRadius: 16 }}>
            <Steps current={stateStep} className="step-custom p-16" direction="horizontal" labelPlacement="vertical" onChange={e => setStateStep(e)}>
              <Step
                title="Chọn sản phẩm"
                icon={
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ ...styleIconStep, borderColor: (stateStep >= 0 && '#d70018') || color_disable }}>
                    <ShoppingCartOutlined style={{ color: (stateStep >= 0 && '#d70018') || color_disable, fontSize: 16 }} />
                  </div>
                }
              />
              <Step
                title="Thông tin"
                icon={
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ ...styleIconStep, borderColor: (stateStep >= 1 && '#d70018') || color_disable }}>
                    <IdcardOutlined style={{ color: (stateStep >= 1 && '#d70018') || color_disable, fontSize: 16 }} />
                  </div>
                }
              />
              <Step
                title="Phiếu giảm giá"
                icon={
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ ...styleIconStep, borderColor: (stateStep >= 2 && '#d70018') || color_disable }}>
                    <PercentageOutlined style={{ color: (stateStep >= 2 && '#d70018') || color_disable, fontSize: 16 }} />
                  </div>
                }
              />
              <Step
                title="Thanh toán"
                icon={
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ ...styleIconStep, borderColor: (stateStep >= 3 && '#d70018') || color_disable }}>
                    <CreditCardOutlined style={{ color: (stateStep >= 3 && '#d70018') || color_disable, fontSize: 16 }} />
                  </div>
                }
              />
              <Step
                title="Hoàn tất"
                icon={
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ ...styleIconStep, borderColor: (stateStep >= 4 && '#d70018') || color_disable }}>
                    <FiPackage style={{ color: (stateStep >= 4 && '#d70018') || color_disable, fontSize: 16 }} />
                  </div>
                }
              />
            </Steps>

            {stateStep === 2 && (
              <div className="p-16">
                <div className="box-shadow p-16 border-radius-16 d-flex" style={{ background: 'white' }}>
                  <Input name="voucher" placeholder="Nhập phiếu giảm giá" />
                  <Button className="btn-buy ml-8" style={{ height: 36 }}>
                    Áp dụng
                  </Button>
                </div>
              </div>
            )}

            <div className="box-shadow border-radius-16 p-16" style={{ backgroundColor: 'white' }}>
              {stateStep === 1 && (
                <>
                  <div className="fz-16 fw-700">Thông tin khách hàng</div>
                  <div className="mt-8">
                    <Input name="full_name" value={full_name} onChange={onChangeInput} placeholder="Họ và tên (bắt buộc)" />
                  </div>
                  <div className="mt-8">
                    <Input name="phone_number" value={phone_number} onChange={onChangeInput} placeholder="Số điện thoại (bắt buộc)" />
                  </div>
                  <div className="mt-8">
                    <Input name="email" value={email} onChange={onChangeInput} placeholder="Email (Vui lòng điền email để nhận hóa đơn VAT)" />
                  </div>

                  <div className="fz-16 fw-700 mt-8">Chọn cách thức giao hàng</div>
                  <div className="mt-4">
                    <Radio.Group onChange={e => setStateRadio(e.target.value)} value={stateRadio}>
                      <Radio value={1}>Nhận tại cửa hàng</Radio>
                      <Radio value={2}>Giao hàng tận nơi</Radio>
                    </Radio.Group>
                  </div>

                  <div className="border-radius-16 p-16 mt-8" style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb' }}>
                    <Row gutter={8}>
                      {(stateRadio === 2 && (
                        <>
                          <Col span={12}>
                            <Input name="provice" value={provice} onChange={onChangeInput} placeholder="Tỉnh/Thành Phố" />
                          </Col>
                          <Col span={12}>
                            <Input name="district" value={district} onChange={onChangeInput} placeholder="Quận/Huyện" />
                          </Col>
                          <Col span={24} className="mt-8">
                            <Input name="address" value={address} onChange={onChangeInput} placeholder="Địa chỉ người nhận" />
                          </Col>
                        </>
                      )) || (
                        <Select defaultValue="" className="w-100" value={stateStore} onChange={e => setStateStore(e)}>
                          <Option value="">Chọn cơ sơ muốn nhận máy</Option>
                          <Option value="CS1-Xuân Phương-Nam Từ Liêm-Hà Nội">CS1-Xuân Phương-Nam Từ Liêm-Hà Nội</Option>
                          <Option value="CS2-Thường Tín-Thanh Xuân-Hà Nội">CS2-Thường Tín-Thanh Xuân-Hà Nội</Option>
                        </Select>
                      )}
                    </Row>
                  </div>
                  <div className="mt-8">
                    <TextArea rows={2} name="note" value={note} onChange={onChangeInput} placeholder="Yêu cầu khác" maxLength={6} />
                  </div>
                </>
              )}

              {stateStep === 2 && (
                <>
                  <div className="box-shadow p-16 border-radius-16">
                    <div className="fz-16 fw-500 text-upper text-center ">THÔNG TIN ĐẶT HÀNG</div>
                    <div>
                      Người nhận: <strong>{full_name}</strong>
                    </div>
                    <div>
                      Số điện thoại: <strong>{phone_number}</strong>
                    </div>
                    <div>
                      Email: <strong>{email}</strong>
                    </div>
                    <div>
                      Nhận sản phẩm tại: <strong>{(stateRadio === 1 && stateStore) || `${address}-${district}-${provice}`}</strong>
                    </div>
                    <div>
                      Tổng tiền: <strong>{sumPay}</strong>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Col>
          <Col span={7}></Col>
        </Row>
        <Row className="mt-16">
          <Col span={7}></Col>
          <Col span={10}>
            <div className="cart-detail box-shadow p-16 border-radius-16">
              <div className="d-flex justify-content-between mb-16 fw-700 fz-16">
                <div>Tổng tiền tạm tính</div>
                <div className="text-red">{sumPay}</div>
              </div>
              <Button
                className="btn-buy fw-500 fz-16 mb-8"
                style={{ height: 60, textTransform: 'uppercase' }}
                block
                onClick={() => setStateStep(stateStep + 1)}>
                Tiếp tục
              </Button>
              <Button className="btn-red fw-500 fz-16" style={{ height: 60, textTransform: 'uppercase' }} block>
                <Link to="/home">Chọn sản phẩm khác</Link>
              </Button>
            </div>
          </Col>
          <Col span={7}></Col>
        </Row>
      </div>
    </Client>
  );
}

const mapStateToProps = state => ({ ...selectCart(state), ...selectAuth(state) });

export default connect(mapStateToProps, null)(Pay);
