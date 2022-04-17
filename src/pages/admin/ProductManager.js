import React, { useEffect, useState } from 'react';
import { Table, Image, Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Admin } from 'components/layouts';
import { TableCustom } from 'components/Common';
import { ProductAddModal } from 'components/product';
import { productActions } from 'actions';
import { selectProduct, selectCategory } from 'selectors';

function ProductManager(props) {
  const [state, setState] = useState({ visibleAdd: false, visibleProduct: false, productItem: {} });

  const {
    actions: { loadListProduct, createProduct, editProduct, deleteProduct },
    selectProductInformation: { products },
    selectCategoryInformation: { categorys },
  } = props;

  const { visibleAdd, visibleProduct, productItem } = state;

  const onShowAdd = () => setState({ ...state, visibleAdd: true });
  const onHidenAdd = () => setState({ ...state, visibleAdd: false, visibleProduct: false });

  useEffect(() => {
    loadListProduct();
  }, []);

  const columns = [
    {
      title: 'Mã',
      key: '_id',
      dataIndex: '_id',
      render: (_, item) => <div>{item._id.slice(item._id.length - 4).toUpperCase()}</div>,
    },
    {
      title: 'Ảnh sản phẩm',
      key: 'length',
      dataIndex: 'length',
      render: (_, item) => (
        <div>
          <Image width={90} src={item.image_link} />
        </div>
      ),
    },
    {
      title: 'Tên sản phẩm',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Danh mục',
      key: 'category',
      dataIndex: 'category',
      render: (_, item) => {
        const category = categorys.find(c => c._id === item.category);
        return <div>{category?.name_vi}</div>;
      },
    },
    {
      title: 'Danh mục con',
      key: 'sub_category',
      dataIndex: 'sub_category',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Số lượng',
      key: 'quantity',
      align: 'center',
      dataIndex: 'quantity',
    },
  ];
  return (
    <Admin title="Quản lí sản phẩm">
      <TableCustom title="Danh sách sản phẩm">
        <div style={{ position: 'fixed', bottom: 20, right: 16 }}>
          <Tooltip placement="left" title="Thêm sản phẩm">
            <Button shape="circle" icon={<PlusOutlined />} size="large" style={{ backgroundColor: '#1890ff', color: '#fff' }} onClick={onShowAdd} />
          </Tooltip>
        </div>
        <Table
          className="data-custom"
          columns={columns}
          scroll={{ y: 'calc(100vh - 350px)' }}
          dataSource={products}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                setState({ ...state, productItem: record, visibleProduct: true });
              },
            };
          }}
          rowKey={record => record._id}
          size="small"
          pagination={{ position: ['bottomLeft'] }}
        />
      </TableCustom>
      {visibleAdd && <ProductAddModal visible={visibleAdd} onClose={onHidenAdd} categorys={categorys} createProduct={createProduct} />}

      {visibleProduct && (
        <ProductAddModal
          visible={visibleProduct}
          onClose={onHidenAdd}
          categorys={categorys}
          productItem={productItem}
          editProduct={editProduct}
          deleteProduct={deleteProduct}
          modalName="detail"
        />
      )}
    </Admin>
  );
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...productActions }, dispatch) });
const mapStateToProps = state => ({ ...selectProduct(state), ...selectCategory(state) });

export default connect(mapStateToProps, mapDispatchToProps)(ProductManager);
