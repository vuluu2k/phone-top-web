import React, { useEffect } from 'react';
import { Layout, Menu, Carousel, Image, Row, Col } from 'antd';
import Icon, { MobileOutlined, LaptopOutlined, TabletOutlined, HomeOutlined } from '@ant-design/icons';
import { IoWatchOutline } from 'react-icons/io5';
import { CgUsb } from 'react-icons/cg';
import { FaHeadphonesAlt, FaRegNewspaper } from 'react-icons/fa';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectCategory, selectProduct, selectLayout } from 'selectors';
import { productActions, layoutActions } from 'actions';
import { Client } from 'components/layouts';
import { ProductItem } from 'components/product';
import { SilderCustom } from 'components/Common';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

function renderProductArray(product, title) {
  if (product?.length > 0)
    return (
      <>
        <h1 style={{ marginBottom: 16 }} className="text-upper">
          {title}
        </h1>
        <Row gutter={15}>
          {product.map((a, index) => (
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 4 }} key={index} span={4}>
              <ProductItem name={a.name} value={a.value} imageLink={a.image_link} id={a._id} />
            </Col>
          ))}
        </Row>
      </>
    );
  return null;
}

function Home(props) {
  const {
    selectCategory: {
      selectCategoryInformation: { categorys },
    },
    selectProductInformation: { products, dataSearch },
    actions: { loadListProductHome, loadListProduct, loadListLayout },
    selectProductInformationHome: { hot, productOther },
    selectLayoutInformation: { layouts },
  } = props;

  useEffect(() => {
    loadListProductHome();
    loadListLayout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadListProductWithCategory = key => {
    const keys = key.split('/');
    loadListProduct({ ...dataSearch, category: keys[0], sub_category: keys[1] });
  };

  return (
    <Client>
      {(products.length > 0 && (
        <div>
          <Row>
            {products.map(item => (
              <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 4 }} style={{ padding: '4px' }}>
                <ProductItem id={item._id} name={item.name} imageLink={item.image_link} value={item.value} />
              </Col>
            ))}
          </Row>
        </div>
      )) || (
        <>
          <Layout className="layout-carousel site-layout-background" style={{ marginBottom: 16 }}>
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
                        <SubMenu key={category._id + '/' + item} title={item} onTitleClick={e => loadListProductWithCategory(e.key)}></SubMenu>
                      ))}
                    </SubMenu>
                  );
                })}
                <Menu.Item key="/blog" icon={<FaRegNewspaper />}>
                  <Link to="/blog">Tin công nghệ</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content>
              <Carousel autoplay>
                {layouts.length > 0 &&
                  layouts.map(item => (
                    <div key={item._id}>
                      <Image src={item.image_link} width={'100%'} height={'100%'} />
                    </div>
                  ))}
              </Carousel>
            </Content>
          </Layout>
          <Layout>
            <SilderCustom item={hot} title="Sản phẩm bán chạy nhất" />

            {productOther.map((item, idx) => (
              <div key={idx}>{renderProductArray(item.products, item.category)}</div>
            ))}
          </Layout>
        </>
      )}
    </Client>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...productActions, ...layoutActions }, dispatch) });

const mapStateToProps = state => ({
  selectCategory: selectCategory(state),
  ...selectProduct(state),
  ...selectLayout(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
