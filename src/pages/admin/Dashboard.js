import React, { useEffect } from 'react';
import { DatePicker, Spin, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import moment from 'moment';
import { groupBy } from 'lodash';
import locale from 'antd/lib/date-picker/locale/vi_VN';

import { Admin } from 'components/layouts';
import { Charts, PieChart, TableCustom } from 'components/Common';
import { packageActions } from 'actions';
import { selectPackage } from 'selectors';
import { sumMoneyNumber } from 'utils/number';
import { moneyMask } from 'utils/number';

moment.locale('vi');
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm';
const startDate = dayjs().subtract(7, 'day').startOf().format(dateFormat);
const endDate = dayjs().startOf().format(dateFormat);

const subtractDate = (subtract, date = moment()) => date.subtract(subtract, 'days');

const yesterday = subtractDate(1);
const before07day = subtractDate(7);
const before30Day = subtractDate(30);
const before60Day = subtractDate(60);

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
          ranges={{
            'Hôm nay': [moment().startOf('day'), moment().endOf('day')],
            'Hôm qua': [yesterday.startOf('day'), moment().endOf('day')],
            'Tháng này': [moment().startOf('month').startOf('day'), moment().endOf('month').endOf('day')],
            '7 ngày trước': [before07day.startOf('day'), moment().endOf('day')],
            '30 ngày trước': [before30Day.startOf('day'), moment().endOf('day')],
            '60 ngày trước': [before60Day.startOf('day'), moment().endOf('day')],
          }}
          locale={{
            ...locale,
            lang: {
              ...locale.lang,
              now: 'Current Time',
              ok: 'Đặt ngày',
            },
          }}
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
