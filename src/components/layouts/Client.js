import React from 'react';
import { Layout, Menu, Carousel, Image, Row, Col, BackTop, Input } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, VerticalAlignTopOutlined, PhoneOutlined } from '@ant-design/icons';
import { ImTruck } from 'react-icons/im';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

export default function Client({ children }) {
  const onSearch = value => console.log(value);
  return (
    <Layout className="layout">
      <Header className="header">
        <div className="d-flex align-items-center justify-content-between" style={{ height: 64 }}>
          <Link to="/home">
            <img src="https://res.cloudinary.com/vuluu/image/upload/v1648835124/PhoneTop/Logo/logo_white_yhtbc6.png" height={64} alt="logo" />
          </Link>
          <Search placeholder="Bạn muốn tìm kiếm sản phẩm nào?" allowClear onSearch={() => onSearch()} style={{ width: 200, marginLeft: 16 }} />

          <div className="d-flex align-items-center" style={{ marginLeft: 16, textAlign: 'center' }}>
            <PhoneOutlined style={{ fontSize: 28, color: 'white', marginRight: 8 }} />
            <a href="tel:0898709170">
              <div className="fw-500">Gọi mua hàng</div>
              <div className="fw-700">0898709170</div>
            </a>
          </div>
          <Link to="/tracking" style={{ marginRight: 8 }}>
            <div className="d-flex align-items-center" style={{ maxWidth: 100 }}>
              <ImTruck style={{ fontSize: 28, color: 'white', marginRight: 8 }} />
              <div className="fw-500">Tra Cứu đơn hàng</div>
            </div>
          </Link>
        </div>
      </Header>
      <Content style={{ padding: '0 200px', marginTop: 64 }}>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200}>
            <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Carousel autoplay>
              <div>
                <Image src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/iPhone_11.png" width={'100%'} />
              </div>
              <div>
                <Image src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/iPhone_11.png" width={'100%'} />
              </div>
              <div>
                <Image src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/iPhone_11.png" width={'100%'} />
              </div>
              <div>
                <Image src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/iPhone_11.png" width={'100%'} />
              </div>
            </Carousel>
          </Content>
          <Sider width={250}>
            <Image src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/S22_ultra_Right.png" />
            <Image src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/S22_ultra_Right.png" />
            <Image src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/S22_ultra_Right.png" />
          </Sider>
        </Layout>
        <Layout>{children}</Layout>
        <BackTop>
          <div className="back-top">
            <VerticalAlignTopOutlined />
          </div>
        </BackTop>
      </Content>
      <Footer style={{ textAlign: 'center', borderTop: '1px solid #003c75' }}>
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
        ©Copyright Created by Lưu Công Quang Vũ
      </Footer>
    </Layout>
  );
}
