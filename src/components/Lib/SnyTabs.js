import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

export default class SnyTabs extends Component {
  render() {
    const { options, onClick, style, styleTab, className, value } = this.props;

    return (
      <Row className={`sny-tabs ${className}`} style={style}>
        {options.map(item => (
          <Col
            key={item.value}
            onClick={() => onClick(item.value, item.label)}
            className={`tab ${item.value === value && 'tab-active'}`}
            style={styleTab}>
            {item.label}
          </Col>
        ))}
      </Row>
    );
  }
}

SnyTabs.propTypes = {
  options: PropTypes.array,
  onClick: PropTypes.func,
  style: PropTypes.object,
  styleTab: PropTypes.object,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SnyTabs.defaultProps = {
  options: [
    { value: 1, label: 'SnappyExpress1' },
    { value: 2, label: 'SnappyExpress2' },
    { value: 3, label: 'SnappyExpress3' },
    { value: 4, label: 'SnappyExpress4' },
  ],
  onClick: (value, label) => console.log(value, label),
  style: {},
  styleTab: {},
  className: '',
  value: 1,
};
