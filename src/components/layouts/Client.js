import React, { useEffect } from 'react';
import { Layout, Menu, Row, Col, BackTop, Input } from 'antd';
import { UserOutlined, VerticalAlignTopOutlined, PhoneOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { ImTruck } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authActions, cartActions } from 'actions';
import { USER } from 'constants';

const { Header, Content, Footer } = Layout;

function Client({ children, ...props }) {
  const {
    actions: { initCart },
  } = props;
  const user = localStorage.getItem(USER);
  const userParse = JSON.parse(user);
  console.log(userParse);

  useEffect(() => {
    initCart({ user_id: userParse?.user?._id });
  }, [userParse]);

  // console.log(props);

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="d-flex align-items-center justify-content-between" style={{ height: 64 }}>
          <Link to="/home">
            <img src="https://res.cloudinary.com/vuluu/image/upload/v1648835124/PhoneTop/Logo/logo_white_yhtbc6.png" height={64} alt="logo" />
          </Link>
          <Input placeholder="Bạn muốn tìm kiếm sản phẩm nào?" allowClear onChange style={{ width: 200, marginLeft: 16 }} />

          <div className="d-flex align-items-center" style={{ marginLeft: 16, textAlign: 'center' }}>
            <PhoneOutlined className="icon-header" style={{ marginRight: 8 }} />
            <a href="tel:0898709170">
              <div className="fw-500">Gọi mua hàng</div>
              <div className="fw-700">0898709170</div>
            </a>
          </div>
          <Link to="/tracking" style={{ marginRight: 8 }}>
            <div className="text-center">
              <ImTruck className="icon-header" />
              <div className="fw-500">Tra Cứu đơn hàng</div>
            </div>
          </Link>
          <div className="text-center">
            <ShoppingCartOutlined className="icon-header" />
            <div className="fw-500 text-white">Giỏ hàng</div>
          </div>
          <Link to={(user && '/accout') || '/login'}>
            <div className="text-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 16 }}>
              <UserOutlined className="icon-header" />
              <div className="fw-500 text-white">{userParse.user.name || 'Tài khoản'}</div>
            </div>
          </Link>
        </div>
      </Header>
      <Content style={{ padding: '0 200px', marginTop: 64 }}>
        {children}
        <BackTop>
          <div className="back-top">
            <VerticalAlignTopOutlined />
          </div>
        </BackTop>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Row>
          <Col span={6}>
            <h4>Tìm cửa hàng</h4>
          </Col>
          <Col span={6}>
            <h4>Tìm cửa hàng</h4>
          </Col>
          <Col span={6}>
            <h4>Tìm cửa hàng</h4>
          </Col>
          <Col span={6}>
            <h4>Tìm cửa hàng</h4>
          </Col>
        </Row>
      </Footer>
      <div className="w-100 d-flex justify-content-center " style={{ backgroundColor: 'red', color: 'white', padding: '8px 0', fontWeight: 500 }}>
        ©Copyright Created by Lưu Công Quang Vũ
      </div>
    </Layout>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...authActions, ...cartActions }, dispatch) });

export default connect(null, mapDispatchToProps)(Client);
