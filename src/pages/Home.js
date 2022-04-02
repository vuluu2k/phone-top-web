import React from 'react';
import { Layout, Menu, Carousel, Image, Row, Col } from 'antd';
import Icon, { MobileOutlined, LaptopOutlined, TabletOutlined } from '@ant-design/icons';
import { FaHeadphonesAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { selectCategory } from 'selectors';
import { Client } from 'components/layouts';
import { ProductItem } from 'components/product';
import { SilderCustom } from 'components/Common';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const item = [
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
  { name: 'iPhone SE 2022 | Chính hãng VN/A', value: 100000 },
];
function Home(props) {
  const {
    selectCategory: {
      selectCategoryInformation: { categorys },
    },
  } = props;

  return (
    <Client>
      <Layout className="layout-carousel site-layout-background">
        <Sider className="site-layout-background">
          <Menu mode="vertical">
            {categorys?.map(category => {
              const icon =
                (category.name === 'mobile' && MobileOutlined) ||
                (category.name === 'Laptop, PC' && LaptopOutlined) ||
                (category.name === 'Tablet' && TabletOutlined) ||
                (category.name === 'Music' && FaHeadphonesAlt);
              return (
                <SubMenu key={category._id} icon={<Icon component={icon} />} title={category.name_vi}>
                  {category.sub_name.map(item => (
                    <SubMenu key={item} title={item}></SubMenu>
                  ))}
                </SubMenu>
              );
            })}
          </Menu>
        </Sider>
        <Content>
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
        <Sider theme="light" className="d-flex flex-column justify-content-between" style={{ height: '100%' }}>
          <Image src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/S22_ultra_Right.png" />
          <Image src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/S22_ultra_Right.png" />
          <Image src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/S22_ultra_Right.png" />
        </Sider>
      </Layout>
      <Layout>
        <SilderCustom item={item} />

        <Row gutter={15}>
          {item.map((a, index) => (
            <Col key={index} span={4}>
              <ProductItem name={a.name} value={a.value} />
            </Col>
          ))}
        </Row>
      </Layout>
    </Client>
  );
}

const mapDispatchToProps = state => ({
  selectCategory: selectCategory(state),
});

export default connect(mapDispatchToProps, null)(Home);
