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

var columnChart;
var pieChart;


let columnChartOptions = {
  chart: {
    height: 400,
    type: "line",
    stacked: false
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#f9690e', '#663399'],
  series: [

    {
      name: 'PEOPLE',
      type: 'column',
      data: []
    },
    {
      name: "INDOOR",
      type: 'line',
      data: []
    },
  ],
  stroke: {
    width: [4, 4, 4]
  },
  plotOptions: {
    bar: {
      columnWidth: "20%"
    }
  },
  xaxis: {
    categories: []
  },
  yaxis: [
    {
      seriesName: 'People',
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
      },
      title: {
        text: "People"
      }
    }, {
      opposite: true,
      seriesName: 'Degree',
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
      },
      title: {
        text: "Degree"
      }
    }
  ],
  tooltip: {
    shared: false,
    intersect: true,
    x: {
      show: false
    }
  },
  legend: {
    horizontalAlign: "left",
    offsetX: 40
  }
};

var pieChartOptions = {
  chart: {
    width: 350,
    type: 'donut',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '55%'
      }
    }
  },
  customScale: 1.2,
  labels: ['Cold', 'Nice', 'Hot'],
  dataLabels: {
    enabled: true,
    enabledOnSeries: undefined,
    textAnchor: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      fontSize: '16px',
      fontFamily: 'Arial',
      colors: ['#000000', '#000000', '#000000'],
    }
  },
  series: [44, 33, 23],
  colors: ['#33B5FF', '#529A26', '#D32603'],
  legend: {
    show: true,
    showForSingleSeries: false,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: 'bottom',
    horizontalAlign: 'center',
    floating: false,
    fontSize: '18px',
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
      width: 12,
      height: 12,
      strokeWidth: 0,
      strokeColor: '#fff',
      radius: 12,
      customHTML: undefined,
      onClick: undefined,
      offsetX: 0,
      offsetY: 0
    },
    itemMargin: {
      horizontal: 20,
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


class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioSelected: 1,
      interval1: null,
      interval2: null,
      people: [],
      sensorData: []
    };
  }

  getcompVisionControllerData = async () => {
    return axios
      .get(urlServer + "/get-all")
      .then(res => {
        var people = res.data[res.data.length - 1].occupancy;

        this.setPeople(people);
        const numberOfPeople = res.data.map(p => p.occupancy);

        this.setState({ people: numberOfPeople });
        columnChartOptions.series[0].data = this.state.people;
        console.log('people:', numberOfPeople)
        //this.drawPeopleChart(res);
        //console.log('columnChartOptions:',columnChartOptions)


      })
      .catch(error => {
        console.log(error);
      });
  };

  getSlackData = async () => {
    return axios
      .get(urlServer + "/slack/get-poll-result-hot-cold-nice")
      .then(res => {
        var cold = res.data.cold;
        var nice = res.data.nice;
        var hot = res.data.hot;

        //console.log(cold);    // poll results from slack
        //console.log(nice);
        //console.log(hot);

        this.setSlack(cold, nice, hot);
        //this.drawSlackChart(res);
      });
  };

  getSensorAverageData = () => {
    return axios.get(urlServer + "/sensor/get-ave-degree").then(res => {
      this.props.setAvgTemp(res.data);
      //this.drawTempChart(res);    

      //console.log(res);     // average degree

      //  this.drawOutdoorChart()
    });
  };

  getSensorData = async () => {
    await Promise.all(
      urlArr.map(url =>
        axios(urlServer + "/sensor/get-zone/" + url).then(res => {
          this.props.sensorTemp[url] =
            res.data[res.data.length - 1].sensor_degree;
          this.props.sensorHum[url] =
            res.data[res.data.length - 1].sensor_humidity;
          const degrees = res.data.map(p => p.sensor_degree);
          this.setState({ sensorData: degrees });
          console.log('sensordata:', degrees);
          //console.log(res)
          columnChartOptions.series[1].data = this.state.sensorData;

        })
      )
    );
  };

  setSlack = (cold, nice, hot) => {
    this.props.setSlack(cold, nice, hot);
  };

  setPeople = people => {
    this.props.setPeople(people);
  };

  trigger() {
    const interval1 = setInterval(() => {
      this.getSensorData().then(data => { });
      this.getSensorAverageData().then(data => { });
      this.getSlackData().then(data => { });
      this.getcompVisionControllerData().then(data => { });
      this.drawColumnChart();

    }, 15000);

    this.setState(prevState => ({
      ...prevState,
      interval1
    }));
  }

  componentDidMount() {

    this.trigger();
  }

  drawColumnChart() {

    if (columnChart)
      columnChart.destroy();
    //var pieChart = new ApexCharts(document.querySelector("#pieChart"), pieChartOptions);
    columnChart = new ApexCharts(document.querySelector("#columnChart"), columnChartOptions);

    columnChart.render();
    //console.log('columnChartOptions', columnChartOptions);
    //pieChart.render();
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

      <div id="columnChart" ></div>

    );
  }
}


export default Charts;
