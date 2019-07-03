import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import Profile from '../Profile';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'


const brandPrimary = getStyle('--primary')


let mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: brandPrimary,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: []
    },
  ],
};

const mainChartOpts = {
  animation : false,
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
          min: -10,
          maxTicksLimit: 5,
          stepSize: Math.ceil(40 / 5),
          max: 40,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};


export default class MainChart extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
        <Line ref="chart" data={mainChart} options={mainChartOpts}/>
      </div>
    );
  }

  componentDidMount() {
   // const { datasets } = this.props.datasets
   // console.log(datasets[0].data);
  }
}