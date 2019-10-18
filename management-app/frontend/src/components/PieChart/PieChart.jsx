import React, { Component } from "react";
import ApexCharts from 'apexcharts';
import * as PieChartActions from '../../services/session/PieChart/actions';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
const urlArr = Array.from(
  Array(parseInt(process.env.REACT_APP_LENGTH)).keys()
).map(x => (x + 1).toString());
const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

var pieChart;

let pieChartOptions = {
  chart: {
    width: 270,
    type: 'donut',
    position: 'center'
  },
  plotOptions: {
    pie: {
      donut: {
        size: '60%'
      }
    }
  },
  customScale: 1.2,
  labels: ['Cold', 'Nice', 'Hot'],
  dataLabels: {
    enabled: false,
    enabledOnSeries: undefined,
    textAnchor: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      fontSize: '14px',
      fontFamily: 'Arial',
      colors: ['#000000', '#000000', '#000000'],
    }
  },
  series: [],
  colors: ['#33B5FF', '#529A26', '#D32603'],
  legend: {
    show: true,
    showForSingleSeries: false,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: 'bottom',
    horizontalAlign: 'center',
    floating: false,
    fontSize: '13px',
    fontFamily: 'Helvetica, Arial',
    width: undefined,
    height: undefined,
    formatter: undefined,
    tooltipHoverFormatter: undefined,
    offsetX: 0,
    offsetY: 0,
    labels: {
      colors: undefined,
      useSeriesColors: false
    },
    markers: {
      width: 10,
      height: 10,
      strokeWidth: 0,
      strokeColor: '#fff',
      radius: 12,
      customHTML: undefined,
      onClick: undefined,
      offsetX: 0,
      offsetY: 0
    },
    itemMargin: {
      horizontal: 10,
      vertical: 5
    },
    onItemClick: {
      toggleDataSeries: true
    },
    onItemHover: {
      highlightDataSeries: true
    },
  },
  dropShadow: {
    enabled: true,
    top: 0,
    left: 0,
    blur: 3,
    opacity: 0.5
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 400
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
}

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensorData: null,
      slackResult: []
    };
  }




  trigger() {
    const interval1 = setInterval(() => {
      this.props.getSlackData().then(data => {
        pieChartOptions.series = data;

      });
      this.drawPieChart();
    }, 15000);
  }

  componentDidMount() {

    this.trigger();
  }

  drawPieChart() {
    if (pieChart)
      pieChart.destroy();
    pieChart = new ApexCharts(document.querySelector("#pieChart"), pieChartOptions);
    pieChart.render();
  }

  render() {
    return (

      <div id="pieChart" ></div>

    );
  }

}

const mapStatetoProps = (state) => {
  return { data: state.data, error: state.error }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...PieChartActions,
  }, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(PieChart);
