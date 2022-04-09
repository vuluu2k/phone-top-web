import React, { useState } from 'react';
import { Modal, Button, Row, Col, Input, Select, Upload } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import { TableCustom } from 'components/Common';
import { getBase64 } from 'utils/file';
import { moneyMask } from 'utils/number';

const { Option } = Select;

export default function ProductAddModal(props) {
  const { visible, onClose, categorys } = props;

  const [state, setState] = useState({
    name: '',
    category: '',
    sub_category: '',
    status: 'Mới',
    value: 0,
    options: [],
    name_option: '',
    value_option: '',
    profile: {
      screen_size: '',
      screen_technology: '',
      camera_font: '',
      camera_back: '',
      chipset: '',
      ram_capacity: 0,
      rom_capacity: 0,
      baterry: 0,
      sim_card: '',
      os: '',
      screen_pixel: '',
      weight: 0,
      bluetooth: '',
      scan_frequency: '',
    },
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
    sub_categorys: [],
  });

  const {
    name,
    category,
    sub_category,
    status,
    value,
    options,
    profile,
    name_option,
    value_option,
    fileList,
    profile: {
      screen_size,
      screen_technology,
      camera_font,
      camera_back,
      chipset,
      ram_capacity,
      rom_capacity,
      baterry,
      sim_card,
      os,
      screen_pixel,
      weight,
      bluetooth,
      scan_frequency,
    },
    sub_categorys,
  } = state;

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onChangeObj = e => {
    setState({ ...state, profile: { ...profile, [e.target.name]: e.target.value } });
  };

  const onAddOption = () => {
    setState({ ...state, options: options.concat([{ name: name_option, value: value_option }]), name_option: '', value_option: '' });
  };

  const closeAddOption = item => {
    const option_filter = options.filter(option => option !== item);
    setState({ ...state, options: option_filter });
  };

  const onChangeSelect = (e, option) => {
    setState({ ...state, [option.name]: e });
    if (option.name === 'category') {
      const { sub_name } = categorys.find(item => item._id === e);
      setState({ ...state, [option.name]: e, sub_categorys: sub_name });
    }
  };

  const onChangeImage = ({ fileList: newFileList }) => {
    setState({ ...state, fileList: newFileList });
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await getBase64(file);
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  console.log(state);

  const styleTable = { padding: '4px 16px' };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      title="THÊM SẢN PHẨM MỚI"
      width="95%"
      style={{ top: 20 }}
      footer={
        <>
          <Button className="btn-orange" onClick={onClose}>
            Quay lại
          </Button>
          <Button className="btn-blue">Thêm sản phẩm</Button>
        </>
      }>
      <div>
        <Row gutter={8} style={{ overflow: 'auto scroll', maxHeight: 'calc(100vh - 200px)' }}>
          <Col span={12}>
            <div style={{ marginBottom: 16 }}>
              <TableCustom title="Thông tin cơ bản sản phẩm" style={styleTable}>
                <div className="text" style={{ marginTop: 0 }}>
                  Tên sản phẩm
                </div>
                <Input placeholder="Nhập tên sản phẩm" name="name" value={name} onChange={onChange} />
                <div className="text">Ảnh sản phẩm</div>
                <Upload listType="picture-card" fileList={fileList} onChange={onChangeImage} onPreview={onPreview} maxCount={1}>
                  {fileList.length < 5 && '+ Tải lên'}
                </Upload>
                <div className="text">Giá trị sản phẩm</div>
                <Input placeholder="Nhập giá trị sản phẩm" name="value" value={value} onChange={onChange} />
                <div className="text">Trạng thái</div>
                <Select value={status} onChange={onChangeSelect} style={{ width: '100%', marginBottom: 16 }}>
                  <Option value="Mới" name="status">
                    Mới
                  </Option>
                  <Option value="Like New" name="status">
                    Like New
                  </Option>
                  <Option value="OTA" name="status">
                    OTA
                  </Option>
                </Select>
              </TableCustom>
            </div>
            <div>
              <TableCustom title="Thông số sản phẩm" style={styleTable}>
                <div className="text" style={{ marginTop: 0 }}>
                  Kích thước màn hình
                </div>
                <Input placeholder="Nhập kích thước màn hình" name="screen_size" value={screen_size} onChange={onChangeObj} />
                <div className="text">Công nghệ màn hình</div>
                <Input placeholder="Nhập công nghệ màn hình" name="screen_technology" value={screen_technology} onChange={onChangeObj} />
              </TableCustom>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ marginBottom: 16 }}>
              <TableCustom title="Các cấu hình khác" style={styleTable}>
                <div className="text" style={{ marginTop: 0 }}>
                  Tên cấu hình
                </div>
                <Input placeholder="Nhập tên cấu hình" name="name_option" value={name_option} onChange={onChange} />
                <div>Giá trị</div>
                <Input placeholder="Nhập giá trị" name="value_option" value={value_option} onChange={onChange} style={{ marginBottom: 8 }} />
                <Button onClick={onAddOption} type="primary" block>
                  Thêm
                </Button>

                <Row gutter={15} style={{ marginBottom: 16, marginTop: 8 }}>
                  {options.map((item, idx) => (
                    <Col key={idx} span={8} style={{ marginBottom: 4 }}>
                      <div
                        className="d-flex align-items-center justify-content-between"
                        style={{ backgroundColor: '#ff2653', color: '#fff', padding: '4px 16px', borderRadius: 8 }}>
                        <div className="d-flex align-items-center justify-content-center flex-column">
                          <div className="fw-500">{item.name}</div>
                          <div>{moneyMask(item.value || 0)}</div>
                        </div>
                        <CloseCircleOutlined onClick={() => closeAddOption(item)} />
                      </div>
                    </Col>
                  ))}
                </Row>
              </TableCustom>
            </div>
            <div>
              <TableCustom title="Danh mục" style={styleTable}>
                <div className="text" style={{ marginTop: 0 }}>
                  Danh mục cha
                </div>
                <Select fieldNames="category" value={category} onChange={onChangeSelect} style={{ width: '100%', marginBottom: 16 }}>
                  {categorys.map(item => (
                    <Option key={item._id} value={item._id} name="category">
                      {item.name_vi}
                    </Option>
                  ))}
                </Select>
                <div>Danh mục con</div>
                <Select value={sub_category} onChange={onChangeSelect} style={{ width: '100%', marginBottom: 16 }}>
                  {sub_categorys.map((item, idx) => (
                    <Option key={idx} value={item} name="sub_category">
                      {item}
                    </Option>
                  ))}
                </Select>
              </TableCustom>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
