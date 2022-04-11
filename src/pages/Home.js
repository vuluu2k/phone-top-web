import React, { useEffect } from 'react';
import { Layout, Menu, Carousel, Image, Row, Col } from 'antd';
import Icon, { MobileOutlined, LaptopOutlined, TabletOutlined, HomeOutlined } from '@ant-design/icons';
import { IoWatchOutline } from 'react-icons/io5';
import { CgUsb } from 'react-icons/cg';
import { FaHeadphonesAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectCategory, selectProduct } from 'selectors';
import { productActions } from 'actions';
import { Client } from 'components/layouts';
import { ProductItem } from 'components/product';
import { SilderCustom } from 'components/Common';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

function renderProductArray(product, title) {
  return (
    <>
      <h1 style={{ marginBottom: 16 }} className="text-upper">
        {title}
      </h1>
      <Row gutter={15}>
        {product.map((a, index) => (
          <Col key={index} span={4}>
            <ProductItem name={a.name} value={a.value} imageLink={a.image_link} id={a._id} />
          </Col>
        ))}
      </Row>
    </>
  );
}

function Home(props) {
  const {
    selectCategory: {
      selectCategoryInformation: { categorys },
    },
    actions: { loadListProductHome },
    selectProductInformationHome: { hot, mobile, laptop, watch, tablet, accessory },
  } = props;

  useEffect(() => {
    loadListProductHome();
  }, []);

  return (
    <Client>
      <Layout className="layout-carousel site-layout-background">
        <Sider className="site-layout-background">
          <Menu mode="vertical">
            {categorys?.map(category => {
              const icon =
                (category.name_vi === 'Điện thoại' && MobileOutlined) ||
                (category.name_vi === 'Laptop, PC, Màn hình' && LaptopOutlined) ||
                (category.name_vi === 'Máy tỉnh bảng' && TabletOutlined) ||
                (category.name_vi === 'Âm thanh' && FaHeadphonesAlt) ||
                (category.name_vi === 'Nhà thông minh' && HomeOutlined) ||
                (category.name_vi === 'Đồng hồ' && IoWatchOutline) ||
                (category.name_vi === 'Phụ kiện' && CgUsb);
              return (
                <SubMenu key={category._id} icon={<Icon component={icon} />} title={category.name_vi}>
                  {category.sub_name.map((item, idx) => (
                    <SubMenu key={item + category._id} title={item}></SubMenu>
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
        <SilderCustom item={hot} title="Sản phẩm bán chạy nhất" />

        {renderProductArray(mobile, 'Điện thoại')}
        {renderProductArray(laptop, 'Laptop, PC, Màn hình')}
        {renderProductArray(watch, 'Đồng hồ')}
        {renderProductArray(tablet, 'Máy tính bảng')}
        {renderProductArray(accessory, 'Phụ kiện')}
      </Layout>
    </Client>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...productActions }, dispatch) });

const mapStateToProps = state => ({
  selectCategory: selectCategory(state),
  ...selectProduct(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
