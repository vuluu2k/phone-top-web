import React from 'react';
import ReactHighcharts from 'react-highcharts';

function PieChart(props) {
  const config = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Thông kê mặt số lượng',
      align: 'left',
      style: {
        color: '#003a9b',
        fontFamily: 'Roboto',
      },
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
          format: `{point.name}: {point.y:.f} đơn vị`,
          style: {
            color: '#003a9b',
            fontFamily: 'Roboto',
          },
        },
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.data.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> của tất cả<br/>',
      style: {
        color: '#003a9b',
        fontFamily: 'Roboto',
      },
    },
    series: props.series,
  };

  return <ReactHighcharts config={config} />;
}

export default PieChart;
