import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from 'actions';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

let keyMenu = 'dashboard';

function Admin({ children, ...props }) {
  const navigate = useNavigate();
  const [state, setState] = useState({ collapsed: false });
  const { collapsed } = state;

  const toggle = () => setState({ collapsed: !collapsed });

  const handleChangeMenu = key => (keyMenu = key);

  const handleLogOut = () => {
    props.actions.logout();
  };

  return (
    <Layout className="layout-admin">
      <Sider trigger={null} collapsible collapsed={collapsed} className="hf-100" style={{ position: 'fixed' }} width={200}>
        <div className="d-flex justify-content-center p-8">
          <img src="https://res.cloudinary.com/vuluu/image/upload/v1648835124/PhoneTop/Logo/logo_white_yhtbc6.png" alt="logo" width={150} />
        </div>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} selectedKeys={[keyMenu]} onClick={e => handleChangeMenu(e.key)}>
          <Menu.Item key="dashboard" icon={<UserOutlined />}>
            <Link to="/dashboard">Báo cáo - live</Link>
          </Menu.Item>
          <Menu.Item key="product-manager" icon={<VideoCameraOutlined />}>
            <Link to="/product-manager">Sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="category-manager" icon={<UploadOutlined />}>
            <Link to="/category-manager">Danh mục</Link>
          </Menu.Item>
        </Menu>

        <div
          className="text-white fw-500 d-flex align-items-center"
          style={{ position: 'absolute', bottom: 20, left: 20, cursor: 'pointer' }}
          onClick={() => handleLogOut()}>
          <div>
            <LogoutOutlined />
          </div>
          <div style={{ marginLeft: 8 }}>Đăng xuất</div>
        </div>
      </Sider>
      <Layout className="site-layout hf-100" style={collapsed ? { marginLeft: 80 } : { marginLeft: 200 }}>
        <Header className="site-layout-background w-100" style={{ position: 'fixed' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => toggle(),
          })}
        </Header>
        <Content
          style={{
            margin: '64px 16px',
            padding: '12px 0',
            minHeight: 280,
          }}>
          <h1>{props.title}</h1>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...authActions }, dispatch) });

export default connect(null, mapDispatchToProps)(Admin);
