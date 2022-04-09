import React, { useState } from 'react';
import { Layout, Menu, Avatar, Divider } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from 'actions';
import { Link } from 'react-router-dom';

import { selectAuth } from 'selectors';

const { Header, Sider, Content } = Layout;

function Admin({ children, ...props }) {
  const [state, setState] = useState({ collapsed: false, keyMenu: window.location.pathname || '/dashboard' });
  const { collapsed, keyMenu } = state;
  const {
    selectAuthStatus: { user },
  } = props;

  const toggle = () => setState({ ...state, collapsed: !collapsed });

  const handleChangeMenu = key => setState({ ...state, keyMenu: key });

  const handleLogOut = () => {
    props.actions.logout();
    window.location.reload(false);
  };

  return (
    <Layout className="layout-admin">
      <Sider trigger={null} theme="light" collapsible collapsed={collapsed} className="hf-100" style={{ position: 'fixed' }} width={200}>
        <div className="d-flex justify-content-center p-8">
          <img src="https://res.cloudinary.com/vuluu/image/upload/v1648835124/PhoneTop/Logo/logo_white_yhtbc6.png" alt="logo" width={150} />
        </div>
        <div className="logo" />
        <Divider style={{ backgroundColor: 'white', height: 1, margin: 4 }} />
        <div className="d-flex align-items-center w-100 mt-8 mb-8" style={{ marginLeft: !collapsed ? 16 : 24 }}>
          <Avatar size={30} icon={<UserOutlined />} />
          {!collapsed && (
            <div className="fw-500 ml-8" style={{ textTransform: 'capitalize' }}>
              {user?.name}
            </div>
          )}
        </div>
        <Menu theme="light" mode="inline" selectedKeys={[keyMenu]} onClick={e => handleChangeMenu(e.key)}>
          <Menu.Item key="/dashboard" icon={<VideoCameraOutlined />}>
            <Link to="/dashboard">Báo cáo - live</Link>
          </Menu.Item>
          <Menu.Item key="/product-manager" icon={<MobileOutlined />}>
            <Link to="/product-manager">Sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="/package-manager" icon={<OrderedListOutlined />}>
            <Link to="/package-manager">Đơn hàng</Link>
          </Menu.Item>
          <Menu.Item key="/category-manager" icon={<OrderedListOutlined />}>
            <Link to="/category-manager">Danh mục</Link>
          </Menu.Item>
          <Menu.Item key="/blog-manager" icon={<OrderedListOutlined />}>
            <Link to="/blog-manager">Tin tức</Link>
          </Menu.Item>
          <Menu.Item key="/account-manager" icon={<OrderedListOutlined />}>
            <Link to="/account-manager">Tài khoản</Link>
          </Menu.Item>
        </Menu>
        <div
          className="fw-500 d-flex align-items-center"
          style={{ position: 'absolute', bottom: 20, left: 20, cursor: 'pointer' }}
          onClick={() => handleLogOut()}>
          <div style={{ marginLeft: !collapsed ? 4 : 10 }}>
            <LogoutOutlined />
          </div>
          {!collapsed && <div style={{ marginLeft: 8 }}>Đăng xuất</div>}
        </div>
      </Sider>
      <Layout className="site-layout hf-100" style={collapsed ? { marginLeft: 80 } : { marginLeft: 200 }}>
        <Header className="site-layout-background w-100" style={{ position: 'fixed', zIndex: 1 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => toggle(),
          })}
        </Header>
        <Content
          style={{
            margin: '64px 16px',
            padding: '12px 0',
          }}>
          <h1>{props.title}</h1>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...authActions }, dispatch) });
const mapStateToProps = state => ({ ...selectAuth(state) });

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
