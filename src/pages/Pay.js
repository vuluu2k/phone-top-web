import React, { useState, useEffect } from 'react';
import { Steps, Row, Col, Input, Radio, Select, Button, message as messageAntd } from 'antd';
import { ShoppingCartOutlined, IdcardOutlined, PercentageOutlined, CreditCardOutlined, LeftOutlined } from '@ant-design/icons';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { FiPackage } from 'react-icons/fi';
import { MdPayment } from 'react-icons/md';
import { SiZalo } from 'react-icons/si';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validator from 'validator';
import axios from 'axios';

import { Client } from 'components/layouts';
import { packageActions, cartActions } from 'actions';
import { selectAuth, selectCart, selectPackage } from 'selectors';
import { sumMoney, moneyMask, sumMoneyNumber } from 'utils/number';
import { API_URL } from 'env_config';

const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;
const color_disable = '#0e2431';

function Pay(props) {
  const navigate = useNavigate();
  const {
    actions: { createPackage, clearCart, createZaloPayPayment },
    selectAuthStatus: { user },
    selectCartInformation: { products },
    selectListPackage: { packageNew },
    selectZaloPayPayment: { data: zaloPayData },
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
    voucher: '',
    is_pay: undefined,
  });

  const { full_name, phone_number, email, full_address, provice, district, address, note, voucher, is_pay } = stateInfor;

  const sumPay = sumMoney(products?.map(item => item.quantity * item.value_option));

  const sumPayNumber = sumMoneyNumber(products?.map(item => item.quantity * item.value_option));

  const onChangeInput = e => setStateInfor({ ...stateInfor, [e.target.name]: e.target.value });
  
  // Auto-check payment status when user returns from ZaloPay
  useEffect(() => {
    const checkPaymentStatus = () => {
      const savedTransaction = localStorage.getItem('zalopay_transaction');
      if (savedTransaction && stateStep === 4 && is_pay === 'ZaloPay') {
        try {
          const transaction = JSON.parse(savedTransaction);
          const { app_trans_id, package_id, timestamp } = transaction;
          
          // Only check if transaction is within 30 minutes
          if (Date.now() - timestamp < 30 * 60 * 1000) {
            console.log('Auto-checking payment status...', { app_trans_id, package_id });
            // Call API to check status
            props.actions.handleZaloPayReturn({ app_trans_id, package_id });
          } else {
            // Transaction too old, clear it
            localStorage.removeItem('zalopay_transaction');
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
        }
      }
    };

    // Check after a short delay to ensure component is mounted
    const timer = setTimeout(checkPaymentStatus, 500);
    return () => clearTimeout(timer);
  }, [stateStep, is_pay, props.actions]);
  
  // Xử lý khi có dữ liệu thanh toán ZaloPay
  useEffect(() => {
    console.log('ZaloPay Data Full:', zaloPayData); // DEBUG
    
    // Backend returns: { success: true, data: { order_url, app_trans_id, ... }, packageNew: {...} }
    const orderUrl = zaloPayData?.data?.order_url;
    const appTransId = zaloPayData?.data?.app_trans_id;
    const packageId = zaloPayData?.data?.package_id || zaloPayData?.packageNew?._id;
    
    console.log('Extracted:', { orderUrl, appTransId, packageId }); // DEBUG
    
    if (orderUrl && appTransId && packageId) {
      console.log('Opening ZaloPay URL:', orderUrl); // DEBUG
      
      // Lưu thông tin giao dịch vào localStorage để kiểm tra sau
      localStorage.setItem('zalopay_transaction', JSON.stringify({
        app_trans_id: appTransId,
        package_id: packageId,
        timestamp: Date.now()
      }));
      
      // Mở URL thanh toán ZaloPay trong cửa sổ mới
      const newWindow = window.open(orderUrl, '_blank');
      
      if (!newWindow) {
        messageAntd.warning('Trình duyệt đã chặn popup. Vui lòng cho phép popup hoặc click vào nút "Thanh toán qua ZaloPay" bên dưới.');
      }
    }
  }, [zaloPayData]);

  // Kiểm tra trạng thái thanh toán khi component mount (user quay lại từ ZaloPay)
  useEffect(() => {
    const checkPaymentStatus = () => {
      const savedTransaction = localStorage.getItem('zalopay_transaction');
      if (savedTransaction && stateStep === 4) {
        try {
          const transaction = JSON.parse(savedTransaction);
          const { app_trans_id, package_id, timestamp } = transaction;
          
          // Chỉ kiểm tra nếu giao dịch trong vòng 30 phút
          if (Date.now() - timestamp < 30 * 60 * 1000) {
            // Gọi API để kiểm tra trạng thái
            props.actions.handleZaloPayReturn({ app_trans_id, package_id });
            
            // Xóa thông tin đã lưu
            localStorage.removeItem('zalopay_transaction');
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
        }
      }
    };

    checkPaymentStatus();
  }, [stateStep, props.actions]);

  const styleIconStep = { width: 36, height: 36, borderRadius: 18, border: '1px solid #000' };

  const handleGoBack = () => {
    if (stateStep === 1) navigate('/cart');
    else setStateStep(stateStep - 1);
  };

  const handleNext = async () => {
    // Validate product quantities
    const validateQuantities = async () => {
      for (const item of products) {
        try {
          const response = await axios.get(`${API_URL}/product/${item?.product_id}`);
          if (!response.data?.success) {
            messageAntd.error(response.data.message);
            return true;
          }

          const result = response.data?.product;
          if (result.quantity < item.quantity) {
            messageAntd.error(
              `Sản phẩm ${item.name} số lượng chỉ còn ${result.quantity} quý khách thông cảm điều chỉnh lại số lượng hoặc liên hệ với PhoneTop`
            );
            return true;
          }
        } catch (error) {
          console.error(error);
          return true;
        }
      }
      return false;
    };

    // Kiểm tra số lượng sản phẩm nếu đang ở bước thanh toán
    if (stateStep === 3) {
      const hasQuantityError = await validateQuantities();
      if (hasQuantityError) {
        return;
      }
    }
    
    // Basic validations
    if (!full_name || !phone_number || !email) {
      return messageAntd.error('Bạn chưa nhập đủ trường thông tin cá nhân');
    }
    if (!validator.isMobilePhone(String(phone_number), 'vi-VN')) {
      return messageAntd.error('Bạn chưa nhập đúng số điện thoại');
    }
    if (!validator.isEmail(String(email))) {
      return messageAntd.error('Bạn chưa nhập đúng tài khoản email');
    }
    if ((stateRadio === 1 && !stateStore) || (stateRadio === 2 && !provice && !district && !address)) {
      return messageAntd.error('Bạn chưa nhập đầy đủ/lựa chọn địa chỉ nhận hàng');
    }

    // Update address
    setStateInfor({ ...stateInfor, full_address: stateRadio === 1 ? stateStore : `${address}-${district}-${provice}` });
    
    // Handle payment step
    if (stateStep === 3) {
      if (!is_pay) {
        return messageAntd.error('Vui lòng chọn phương thức thanh toán');
      }
      
      // If ZaloPay payment, create package + payment in one call
      if (is_pay === 'ZaloPay') {
        console.log('Creating package with ZaloPay payment...');
        createZaloPayPayment({
          user_id: user._id,
          products,
          full_name,
          phone_number,
          email,
          voucher,
          value: sumPayNumber,
          address: full_address || (stateRadio === 1 ? stateStore : `${address}-${district}-${provice}`),
          note,
        });
      } else {
        // For other payment methods, create package normally
        const resultCreatePackage = await createPackage({
          user_id: user._id,
          products,
          full_name,
          phone_number,
          email,
          voucher,
          value: sumPayNumber,
          address: full_address || (stateRadio === 1 ? stateStore : `${address}-${district}-${provice}`),
          is_access: false,
          note,
          is_pay,
        });

        console.log('resultCreatePackage::::::::', resultCreatePackage)

        // Note: resultCreatePackage is a Redux action, not the actual result
        // The actual package will be available in packageNew after Redux updates
      }
      
      // Clear cart
      clearCart({ user_id: user._id });
    }

    return setStateStep(stateStep + 1);
  };

  const renderItemPay = (text, icon) => {
    return (
      <div
        className="box-shadow d-flex flex-column align-items-center justify-content-center p-8 border-radius-16 cursor-pointer"
        style={(is_pay && is_pay === text && { border: '1px solid #f5222d', color: '#f5222d' }) || {}}
        onClick={() => setStateInfor({ ...stateInfor, is_pay: text })}>
        <div>{text}</div>
        <div>{icon}</div>
      </div>
    );
  };

  const renderItemProduct = item => {
    return (
      <div className="box-shadow p-16 mt-16 cart-detail" style={{ borderRadius: 16 }}>
        <div className="d-flex">
          <div>
            <img src={item.image_link} alt={item.name} width={160} height={160} />
          </div>
          <div className="ml-8 w-100">
            <div className="d-flex justify-content-between w-100 fw-700 fz-16">
              {item.name} ({item.name_option})
            </div>
            <div className="text-blue fw-700 fz-16">{moneyMask(item.value_option)}</div>
            <div className="d-flex align-items-center">
              <div className="fw-500">Số lượng: {item.quantity}</div>
            </div>
            <div className="d-flex align-items-center">
              <div className="fw-500">Tổng tiền: {moneyMask(item.quantity * item.value_option)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Client footer={false}>
      <div className="d-flex justify-content-center">
        <div style={{ padding: '16px', maxWidth: 644 }}>
          <div>
            <div className="  d-flex text-blue fz-18 fw-700 align-items-center justify-content-center mb-16" style={{ position: 'relative' }}>
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
          </div>

          <div style={{ backgroundColor: '#fef2f2', borderRadius: 16 }}>
            <Steps current={stateStep} className="step-custom p-16" direction="horizontal" labelPlacement="vertical" onChange={e => setStateStep(e)}>
              <Step
                disabled
                title="Chọn sản phẩm"
                icon={
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ ...styleIconStep, borderColor: (stateStep >= 0 && '#5684D1') || color_disable }}>
                    <ShoppingCartOutlined style={{ color: (stateStep >= 0 && '#5684D1') || color_disable, fontSize: 16 }} />
                  </div>
                }
              />
              <Step
                disabled
                title="Thông tin"
                icon={
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ ...styleIconStep, borderColor: (stateStep >= 1 && '#5684D1') || color_disable }}>
                    <IdcardOutlined style={{ color: (stateStep >= 1 && '#5684D1') || color_disable, fontSize: 16 }} />
                  </div>
                }
              />
              <Step
                disabled
                title="Phiếu giảm giá"
                icon={
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ ...styleIconStep, borderColor: (stateStep >= 2 && '#5684D1') || color_disable }}>
                    <PercentageOutlined style={{ color: (stateStep >= 2 && '#5684D1') || color_disable, fontSize: 16 }} />
                  </div>
                }
              />
              <Step
                disabled
                title="Thanh toán"
                icon={
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ ...styleIconStep, borderColor: (stateStep >= 3 && '#5684D1') || color_disable }}>
                    <CreditCardOutlined style={{ color: (stateStep >= 3 && '#5684D1') || color_disable, fontSize: 16 }} />
                  </div>
                }
              />
              <Step
                disabled
                title="Hoàn tất"
                icon={
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ ...styleIconStep, borderColor: (stateStep >= 4 && '#5684D1') || color_disable }}>
                    <FiPackage style={{ color: (stateStep >= 4 && '#5684D1') || color_disable, fontSize: 16 }} />
                  </div>
                }
              />
            </Steps>

            {stateStep === 2 && (
              <div className="p-16">
                <div className="box-shadow p-16 border-radius-16 d-flex" style={{ background: 'white' }}>
                  <Input name="voucher" value={voucher} onChange={onChangeInput} placeholder="Nhập phiếu giảm giá" />
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
                    <TextArea rows={2} name="note" value={note} onChange={onChangeInput} placeholder="Yêu cầu khác" />
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

              {stateStep === 3 && (
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
                  <div className="p-16">
                    <div className="mt-8 mb-8 fz-16 fw-500">Chọn hình thức thanh toán</div>
                    <Row gutter={4}>
                      <Col span={8}>{renderItemPay('Thanh toán tại cửa hàng', <SiHomeassistantcommunitystore />)}</Col>
                      <Col span={8}>{renderItemPay('Thanh toán chuyển khoản', <MdPayment />)}</Col>
                      <Col span={8}>{renderItemPay('ZaloPay', <SiZalo />)}</Col>
                    </Row>
                  </div>
                </>
              )}
              {stateStep === 4 && (
                <>
                  <div className="mb-8">
                    Cảm ơn Quý khách hàng đã chọn mua hàng tại PhoneTop. Trong 15 phút, PhoneTop sẽ SMS hoặc gọi để xác nhận đơn hàng. * Các đơn hàng
                    từ 21h30 tối tới 8h sáng hôm sau. PhoneTop sẽ liên hệ với Quý khách trước 10h trưa cùng ngày
                  </div>
                  <div className="box-shadow p-16 border-radius-16" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
                    <div className="fz-16 fw-700 text-upper text-center mb-b ">ĐẶT HÀNG THÀNH CÔNG</div>
                    <div>
                      Mã đơn hàng: <strong>{packageNew?._id || '#000'}</strong>
                    </div>
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
                      Hình thức thanh toán: <strong>{is_pay}</strong>
                    </div>
                    <div>
                      Tổng tiền: <strong>{moneyMask(packageNew.value)}</strong>
                    </div>
                    {is_pay === 'Thanh toán chuyển khoản' && (
                      <div className="p-8 border-radius-16 mt-8" style={{ backgroundColor: 'white', color: '#155724' }}>
                        <div className="fw-700">Thông tin chuyển khoản:</div>
                        <ul style={{ marginBottom: 0 }}>
                          <li>Công ty TNHH Thương mại và dịch vụ kỹ thuật PanCake</li>
                          <li>Ngân hàng ViettinBank - Sở giao dịch 2</li>
                          <li>
                            Số tài khoản: <strong>104870361932</strong>
                          </li>
                          <li>
                            <strong>Hotline hỗ trợ: 0898709170</strong>
                          </li>
                          <li>
                            <strong>Cú pháp chuyển khoản:</strong> [Tên cá nhân/tổ chức] + [SĐT mua hàng] + [mã thanh toán 6 kí tự] (nếu có)
                          </li>
                        </ul>
                      </div>
                    )}
                    {is_pay === 'ZaloPay' && (
                      <div className="p-8 border-radius-16 mt-8" style={{ backgroundColor: 'white', color: '#155724' }}>
                        <div className="fw-700">Thông tin thanh toán ZaloPay:</div>
                        <ul style={{ marginBottom: 0 }}>
                          <li>Mã đơn hàng: <strong>{packageNew?._id}</strong></li>
                          <li>Số tiền: <strong>{moneyMask(packageNew.value)}</strong></li>
                          <li>
                            <strong>Trạng thái:</strong> {packageNew?.zalopay_transaction?.status === 'completed' ? '✅ Đã thanh toán' : '⏳ Chờ thanh toán'}
                          </li>
                          <li className="mt-8">
                            {zaloPayData && zaloPayData.data && zaloPayData.data.order_url && (
                              <div className="d-flex" style={{ gap: '8px' }}>
                                <Button 
                                  type="primary" 
                                  onClick={() => window.open(zaloPayData.data.order_url, '_blank')}
                                >
                                  Thanh toán qua ZaloPay
                                </Button>
                                <Button 
                                  onClick={() => {
                                    const transaction = localStorage.getItem('zalopay_transaction');
                                    if (transaction) {
                                      const { app_trans_id, package_id } = JSON.parse(transaction);
                                      props.actions.handleZaloPayReturn({ app_trans_id, package_id });
                                    } else {
                                      messageAntd.warning('Không tìm thấy thông tin giao dịch');
                                    }
                                  }}
                                >
                                  Kiểm tra trạng thái
                                </Button>
                              </div>
                            )}
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  {packageNew?.products?.length > 0 && packageNew?.products?.map((item, idx) => <div key={idx}>{renderItemProduct(item)}</div>)}
                  <div className="d-flex mt-16">
                    <Button className="btn-primary" block onClick={() => navigate('/check_package')}>
                      <div>Kiểm tra đơn hàng</div>
                      <div>
                        <AiOutlineCheckCircle />
                      </div>
                    </Button>
                    <Button className="btn-buy ml-8" block onClick={() => navigate('/home')}>
                      <div>Tiếp tục mua hàng</div>
                      <div>
                        <BsFillCartPlusFill />
                      </div>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
          {stateStep !== 4 && (
            <div>
              <div className="box-shadow p-16 border-radius-16 mt-16 bg-white">
                <div className="d-flex justify-content-between mb-16 fw-700 fz-16">
                  <div>Tổng tiền tạm tính</div>
                  <div className="text-blue">{sumPay}</div>
                </div>
                <Button className="btn-buy fw-500 fz-16 mb-8" style={{ height: 60, textTransform: 'uppercase' }} block onClick={() => handleNext()}>
                  Tiếp tục
                </Button>
                <Button className="btn-red fw-500 fz-16" style={{ height: 60, textTransform: 'uppercase' }} block>
                  <Link to="/home">Chọn sản phẩm khác</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Client>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...packageActions, ...cartActions }, dispatch) });
const mapStateToProps = state => ({ 
  ...selectCart(state), 
  ...selectAuth(state), 
  ...selectPackage(state),
  selectZaloPayPayment: state.package.zalopay_payment,
  selectZaloPayStatus: state.package.zalopay_status,
});

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
