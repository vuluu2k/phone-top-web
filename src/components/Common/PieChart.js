import React from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';

function PieChart(props) {
  const config = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Browser market shares. January, 2018',
    },
    subtitle: {
      text: 'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
    },

    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: '%',
      },
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:.1f}%',
        },
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
    },

    series: [
      {
        name: 'Browsers',
        colorByPoint: true,
        data: [
          {
            name: 'Chrome',
            y: 62.74,
            drilldown: 'Chrome',
          },
          {
            name: 'Firefox',
            y: 10.57,
            drilldown: 'Firefox',
          },
          {
            name: 'Internet Explorer',
            y: 7.23,
            drilldown: 'Internet Explorer',
          },
          {
            name: 'Safari',
            y: 5.58,
            drilldown: 'Safari',
          },
          {
            name: 'Edge',
            y: 4.02,
            drilldown: 'Edge',
          },
          {
            name: 'Opera',
            y: 1.92,
            drilldown: 'Opera',
          },
          {
            name: 'Other',
            y: 7.62,
            drilldown: null,
          },
        ],
      },
    ],
    series: [
      {
        innerSize: '50%',
        data: [
          {
            name: 'Sản phẩm',
            y: 50,
          },
          {
            name: 'Đơn hàng',
            y: 10,
          },
          {
            name: 'Khách hàng',
            y: 120,
          },
        ],
      },
    ],
  };

  return <ReactHighcharts config={config} />;
}

export default PieChart;
