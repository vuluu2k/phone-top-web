import React, { Component } from 'react';
import { Tabs, Button, Upload, message as messageAntd, Image, Row, Col, Spin } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Admin } from 'components/layouts';
import { TableCustom } from 'components/Common';
import { layoutActions } from 'actions';
import { selectLayout } from 'selectors';
import { getBase64 } from 'utils/file';

const { TabPane } = Tabs;

class LayoutManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      fileList: [],
      visibleLayout: false,
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.loadListLayout();
  }

  onShowModalConfirm = () => this.setState({ visibleLayout: true });
  onHiddenModalConfirm = () => this.setState({ visibleLayout: false });

  onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await getBase64(file);
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  onChangeImage = ({ fileList }) => this.setState({ fileList });

  onCreate = () => {
    const { fileList } = this.state;
    const { actions } = this.props;
    if (fileList?.length > 0) {
      actions.createLayout({ image: fileList[0].thumbUrl, position: 'carousel_home' });
      this.setState({ fileList: [] });
    } else {
      messageAntd.error('Vui lòng thêm ảnh');
    }
  };

  onRemove = layout_id => {
    const { actions } = this.props;
    actions.deleteLayout({ layout_id });
  };

  render() {
    const { fileList } = this.state;
    const { selectLayoutInformation } = this.props;

    return (
      <Admin title="Quản lý giao diện">
        <TableCustom disable>
          <div style={{ paddingBottom: 12, minWidth: 100 }}>
            <Spin spinning={selectLayoutInformation?.requesting}>
              <Tabs tabPosition="left">
                <TabPane tab="Bản trình chiếu " key="1">
                  <div className="p-16">
                    <div>
                      <Row gutter={8}>
                        {selectLayoutInformation.layouts
                          .filter(item => item.position === 'carousel_home')
                          .map((item, idx) => (
                            <Col key={idx} xs={24} md={12} xl={8}>
                              <div className="box-shadow">
                                <Image src={item.image_link} width="100%" />
                                <div className="d-flex">
                                  <Button onClick={() => this.onRemove(item._id)} type="primary" danger block>
                                    Xóa
                                  </Button>
                                  {/* <Button type="primary" block>
                                    Thay
                                  </Button> */}
                                </div>
                              </div>
                            </Col>
                          ))}
                      </Row>
                    </div>
                    <div className="mt-8">
                      <Upload
                        accept="image/*"
                        method="get"
                        action={false}
                        listType="picture-card"
                        fileList={fileList}
                        onChange={this.onChangeImage}
                        onDrop={this.onChangeImage}
                        onPreview={this.onPreview}
                        maxCount={0}>
                        + Thêm ảnh
                      </Upload>
                      <Button onClick={this.onCreate} type="primary" style={{ minWidth: 102 }}>
                        Tải lên
                      </Button>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </Spin>
          </div>
        </TableCustom>
      </Admin>
    );
  }
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...layoutActions }, dispatch) });
const mapStateToProps = state => ({ ...selectLayout(state) });

export default connect(mapStateToProps, mapDispatchToProps)(LayoutManager);
