import React, { useEffect } from 'react';
import { DatePicker, Spin, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import moment from 'moment';
import { groupBy } from 'lodash';

import { Admin } from 'components/layouts';
import { Charts, PieChart, TableCustom } from 'components/Common';
import { packageActions } from 'actions';
import { selectPackage } from 'selectors';
import { sumMoneyNumber } from 'utils/number';
import { moneyMask } from 'utils/number';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm';
const startDate = dayjs().subtract(7, 'day').startOf().format(dateFormat);
const endDate = dayjs().startOf().format(dateFormat);

function Dashboard(props) {
  const {
    actions: { getTurnover },
    selectListTurnover: { packages, productCount, productCountOld, packageAcceptCount, packageNotAcceptCount, userCount, requesting },
  } = props;

  useEffect(() => {
    getTurnover({
      startDate: startDate,
      endDate: endDate,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChange(value, dateString) {
    getTurnover({ startDate: dateString[0], endDate: dateString[1] });
  }

  const turnoverArray = groupBy(packages, item => {
    const updatedAt = dayjs(item.updatedAt);
    return updatedAt?.format('YYYY-MM-DD');
  });

  const keyArray = Object.keys(turnoverArray);

  const valueArray = keyArray.map(key => sumMoneyNumber(turnoverArray[key].map(item => item.value)));

  const sumTurnover = valueArray.reduce((prev, next) => prev + next, 0);

  return (
    <Admin title="Thông kê dữ liệu PhoneTop">
      <TableCustom title="Thông kê dữ liệu">
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          onChange={onChange}
          defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
          placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
          format={dateFormat}
        />
        <Spin spinning={requesting}>
          <Row>
            <Col span={24}>
              <Charts
                series={[
                  { name: 'Doanh thu', data: valueArray.reverse() },
                  { name: 'Tiền COD', data: [] },
                ]}
                categoriesX={keyArray.reverse()}
              />
            </Col>
            <Col span={24}>
              <Row>
                <Col xs={24} md={12}>
                  <PieChart
                    series={[
                      {
                        innerSize: '50%',
                        data: [
                          {
                            name: 'Sản phẩm',
                            y: productCount,
                          },
                          {
                            name: 'Sản phẩm tồn kho',
                            y: productCountOld,
                          },
                          {
                            name: 'Đơn hàng xác thực thanh toán',
                            y: packageAcceptCount,
                          },
                          {
                            name: 'Đơn hàng chưa xác thực thanh toán',
                            y: packageNotAcceptCount,
                          },
                          {
                            name: 'Khách hàng',
                            y: userCount,
                          },
                        ],
                      },
                    ]}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <TableCustom disable style={{ width: '100%' }}>
                    <Row gutter={8}>
                      <Col xs={24} md={12}>
                        <div className="p-8" style={{ background: '#bddaf5' }}>
                          <div className="fw-700 fz-18">Tổng doanh thu</div>
                          <div className="fw-500 fz-16">{moneyMask(sumTurnover || 0)}</div>
                        </div>
                      </Col>
                      <Col xs={24} md={12}>
                        <div className="p-8" style={{ background: '#a9ff96' }}>
                          <div className="fw-700 fz-18">Tổng phí ship</div>
                          <div className="fw-500 fz-16">{moneyMask(0)}</div>
                        </div>
                      </Col>
                    </Row>
                  </TableCustom>
                </Col>
              </Row>
            </Col>
          </Row>
        </Spin>
      </TableCustom>
    </Admin>
  );
}
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ ...packageActions }, dispatch) });
const mapStateToProps = state => ({ ...selectPackage(state) });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
