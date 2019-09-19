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

class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensorData: null,
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


  getSensorAverageData = () => {
    return axios.get(urlServer + "/sensor/get-ave-degree").then(res => {
      this.props.setAvgTemp(res.data);
      //this.drawTempChart(res);    

      //console.log(res);     // average degree

      //  this.drawOutdoorChart()
    });
  };

  trigger() {
    const interval1 = setInterval(() => {
      this.getcompVisionControllerData().then(data => { });
      this.getSensorData().then(data => { });
      this.drawColumnChart();
      this.getSensorAverageData();

    }, 15000);
  }
  componentDidMount() {

    this.trigger();
  }

  setPeople = people => {
    this.props.setPeople(people);
  };

  drawColumnChart() {

    if (columnChart)
      columnChart.destroy();
    //var pieChart = new ApexCharts(document.querySelector("#pieChart"), pieChartOptions);
    columnChart = new ApexCharts(document.querySelector("#columnChart"), columnChartOptions);

    columnChart.render();
    //console.log('columnChartOptions', columnChartOptions);
    //pieChart.render();
  }

  render() {
    return (

      <div id="columnChart" ></div>

    );
  }


}

export default ColumnChart;
