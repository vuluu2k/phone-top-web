import React, { useState } from 'react';
import { Layout, Menu, Avatar, Divider } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MobileOutlined,
  LayoutOutlined,
} from '@ant-design/icons';
import { FiPackage } from 'react-icons/fi';
import { BiNews } from 'react-icons/bi';
import { BiCategory } from 'react-icons/bi';
import { MdSupervisorAccount } from 'react-icons/md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from 'actions';
import { Link } from 'react-router-dom';

import { selectAuth } from 'selectors';

const { Header, Sider, Content } = Layout;

function Admin({ children, ...props }) {
  const [state, setState] = useState({ collapsed: false, keyMenu: window.location.pathname || '/product-manager' });
  const { collapsed, keyMenu } = state;
  const {
    selectAuthStatus: { user },
  } = props;

  document.title = props.title;

  const toggle = () => setState({ ...state, collapsed: !collapsed });

  const handleChangeMenu = key => setState({ ...state, keyMenu: key });

  const handleLogOut = () => {
    props.actions.logout();
  };

  return (
    <Layout className="layout-admin">
      <Sider
        trigger={null}
        collapsible
        theme="dark"
        collapsed={collapsed}
        className="hf-100"
        style={{ position: 'fixed', filter: 'drop-shadow(0px 3px 8px rgba(0, 0, 0, 0.15))', zIndex: 2 }}
        width={200}>
        <div className="d-flex justify-content-center align-items-center p-8">
          <div className="text-white" style={{ fontSize: 18, fontWeight: 'bold', padding: '3px 0' }}>
            {collapsed ? 'P' : 'PhoneTop'}
          </div>
        </div>
        <div className="logo" />
        <Divider style={{ backgroundColor: '#f0f0f0', height: 1, margin: 0 }} />
        <div className="d-flex align-items-center w-100 mt-8 mb-8" style={{ marginLeft: !collapsed ? 16 : 24 }}>
          <Avatar size={30} icon={<UserOutlined style={{ color: '#000' }} />} style={{ backgroundColor: '#FFD600' }} />
          {!collapsed && (
            <div className="fw-500  ml-8" style={{ textTransform: 'capitalize', color: '#FFD600' }}>
              {user?.name}
            </div>
          )}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[keyMenu]} onClick={e => handleChangeMenu(e.key)}>
          <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Thống kê</Link>
          </Menu.Item>
          <Menu.Item key="/product-manager" icon={<MobileOutlined />}>
            <Link to="/product-manager">Sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="/package-manager" icon={<FiPackage />}>
            <Link to="/package-manager">Đơn hàng</Link>
          </Menu.Item>
          <Menu.Item key="/category-manager" icon={<BiCategory />}>
            <Link to="/category-manager">Danh mục</Link>
          </Menu.Item>
          <Menu.Item key="/blog-manager" icon={<BiNews />}>
            <Link to="/blog-manager">Tin tức</Link>
          </Menu.Item>
          <Menu.Item key="/layout-manager" icon={<LayoutOutlined />}>
            <Link to="/layout-manager">Giao diện</Link>
          </Menu.Item>
          {user?.role === 1 && (
            <Menu.Item key="/account-manager" icon={<MdSupervisorAccount />}>
              <Link to="/account-manager">Tài khoản</Link>
            </Menu.Item>
          )}
        </Menu>
        <div className="w-100" style={{ position: 'absolute', bottom: 20, left: 20, cursor: 'pointer' }} onClick={() => handleLogOut()}>
          <div className="fw-500 d-flex align-items-center">
            <div style={{ marginLeft: !collapsed ? 4 : 10 }}>
              <LogoutOutlined className="text-white" />
            </div>
            {!collapsed && (
              <div className="text-white" style={{ marginLeft: 8 }}>
                Đăng xuất
              </div>
            )}
          </div>
        </div>
      </Sider>
      <Layout className="site-layout hf-100" style={collapsed ? { marginLeft: 80 } : { marginLeft: 200 }}>
        <Header
          className="site-layout-background w-100 d-flex align-items-center"
          style={{ position: 'fixed', zIndex: 1, filter: 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.15))' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => toggle(),
          })}
          <div className="fw-700 ml-8  fz-18">{props.title}</div>
        </Header>
        <Content
          style={{
            margin: '50px 16px',
            padding: '12px 0',
          }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...authActions }, dispatch) });
const mapStateToProps = state => ({ ...selectAuth(state) });

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
