import React, { Component } from "react";
import ApexCharts from 'apexcharts';
import * as ColumnChartActions from '../../../../services/session/ColumnChart/actions';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

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
  }

  componentDidMount() {
    this.trigger();
  }

  trigger() {
    const interval1 = setInterval(() => {
      this.props.getCompVisionControllerData().then(people => {
        columnChartOptions.series[0].data = people;
      });
      this.props.getSensorData().then(sensorData => {
        var degrees = []
        var i = 0, j = 0;
        for (i = 0; i <= sensorData.length; i++) {
          var data = 0;
          for (j = 0; j < sensorData.length; j++) {
            data += sensorData[j][i];
          }
          degrees[i] = data / sensorData.length;
        }
        columnChartOptions.series[1].data = degrees;

      })
      this.drawColumnChart();
    }, 15000);
  }

  drawColumnChart() {
    if (columnChart)
      columnChart.destroy();
    columnChart = new ApexCharts(document.querySelector("#columnChart"), columnChartOptions);
    columnChart.render();

  }

  render() {
    return (
      <div id="columnChart" ></div>
    );
  }
}

const mapStatetoProps = (state) => {
  return { data: state.data, error: state.error }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...ColumnChartActions,
  }, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(ColumnChart);
