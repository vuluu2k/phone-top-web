import React from 'react';
import { Layout, Menu, Carousel, Image, Row, Col } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export default function Client({ children }) {
  return (
    <Layout>
      <Header className="header">
        <div style={{ padding: '0 200px' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </div>
      </Header>
      <Content style={{ padding: '0 200px' }}>
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
        ©Copyright Created by Lưu Công Quang Vũ
      </Footer>
    </Layout>
  );
}
