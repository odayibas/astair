import React, { Component } from "react";
import ApexCharts from 'apexcharts';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row
} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

import axios from "axios";

const urlArr = Array.from(
  Array(parseInt(process.env.REACT_APP_LENGTH)).keys()
).map(x => (x + 1).toString());
const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

var pieChart;

var pieChartOptions = {
  chart: {
    width: 270,
    type: 'donut',
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

  getSlackData = async () => {
    return axios
      .get(urlServer + "/slack/get-poll-result-hot-cold-nice")
      .then(res => {
        var cold = res.data.cold;
        var nice = res.data.nice;
        var hot = res.data.hot;

        console.log([cold,nice,hot]);    // poll results from slack

        this.setState({'slackResult':[cold,nice,hot]});
        pieChartOptions.series = this.state.slackResult;

      });
  };


  trigger() {
    const interval1 = setInterval(() => {
      this.getSlackData().then(data => { });
      this.drawPieChart();
    }, 15000);
  }

  componentDidMount() {

    this.trigger();
  }
  
  drawPieChart() {

    if (pieChart)
      pieChart.destroy();
    //var pieChart = new ApexCharts(document.querySelector("#pieChart"), pieChartOptions);
    pieChart = new ApexCharts(document.querySelector("#pieChart"), pieChartOptions);

    pieChart.render();
    //console.log('pieChart', pieChartOptions);
    //pieChart.render();
  }

  render() {
    return (

      <div id="pieChart" ></div>

    );
  }

}

export default PieChart;
