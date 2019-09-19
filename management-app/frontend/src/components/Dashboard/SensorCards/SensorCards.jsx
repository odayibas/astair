import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardBody, Row } from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";

import axios from "axios";

import AC from "@material-ui/icons/AcUnit";
import Humidity from "@material-ui/icons/Opacity";

const brandPrimary = getStyle("--primary");
const urlArr = Array.from(
  Array(parseInt(process.env.REACT_APP_LENGTH)).keys()
).map(x => (x + 1).toString());
const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

let orange = "rgba(214, 69, 65, 1)";
let red = "rgba(252, 214, 112, 1)";

const sensorData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Region 2",
      backgroundColor: brandPrimary,
      borderColor: "rgba(255,255,255,.55)",
      data: [23, 24, 22, 23, 23]
    }
  ]
};

const sensorOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent"
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent"
        }
      }
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, sensorData.datasets[0].data) - 5,
          max: Math.max.apply(Math, sensorData.datasets[0].data) + 5
        }
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

function interpolateColor(color1, color2, factor) {
  if (arguments.length < 3) {
    factor = 0.5;
  }
  let result = color1.slice();
  let color = "rgb(";
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    color += result[i];
    color += i != 2 ? "," : "";
  }
  color += ")";
  return color;
}

function interpolateColors(color1, color2, steps) {
  var stepFactor = 1 / ((steps.length == 1 ? 2 : steps.length) - 1),
    interpolatedColorArray = [];

  let newArr = [];

  color1 = color1.match(/\d+/g).map(Number);
  color2 = color2.match(/\d+/g).map(Number);

  for (var i = 0; i < steps.length; i++) {
    newArr.push({
      temp: steps[i] && steps[i][0],
      humidity: steps[i] && steps[i][1],
      region: steps[i] && steps[i][2],
      ac: steps[i] && steps[i][3],
      color: interpolateColor(color1, color2, stepFactor * i)
    });
  }
  return newArr;
}

class SensorCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null
    };
  }
  componentDidMount() {
    const interval = setInterval(() => {
      this.getacData().then(data => {});
    }, 5000);
    this.setState(prevState => ({
      ...prevState,
      interval
    }));
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  getacData = async () => {
    var ac = [];

    await Promise.all(
      urlArr.map(url =>
        axios(urlServer + "/AC/get-zone/" + url).then(res => {
          ac[parseInt(url) - 1] = {
            ac_id: res.data[res.data.length - 1].ac_id,
            ac_degree: res.data[res.data.length - 1].ac_degree,
            ac_mode: res.data[res.data.length - 1].ac_mode,
            ac_fan_speed: res.data[res.data.length - 1].ac_fan_speed,
            active: res.data[res.data.length - 1].active
          };
        })
      )
    );

    this.props.setAC(ac);
  };

  //creates the sensor cards
  getSensors = sensorArr => {
    return sensorArr
      .sort((sensor, sensor2) => sensor.region - sensor2.region)
      .map((sensor, i) => {
        return (
          <Row style={{ margin: 10, marginTop: 20 }}>
            <Card style={{ background: sensor.color }}>
              <CardBody className="pb-0">
                <div>
                  {" "}
                  <h3>INDOOR #{i + 1} </h3>
                </div>
                <div>
                  <h1>{Math.round( sensor.temp * 10 ) / 10}°C</h1>
                </div>
                <div>
                  <h4 style={{ textAlign: "right" }}>
                    {" "}
                    <AC /> : {sensor.ac} °C{" "}
                  </h4>{" "}
                </div>
                <div>
                  <h4 style={{ textAlign: "right" }}>
                    {" "}
                    <Humidity /> : {sensor.humidity} %{" "}
                  </h4>{" "}
                </div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "40px" }}>
                <Line
                  data={{
                    labels: ["", "", "", "", ""],
                    datasets: [
                      {
                        label: `Region ${i}`,
                        backgroundColor: sensor.color,
                        borderColor: "rgba(255,255,255,.55)",
                        data: [23, 24, 22, 23, 23]
                      }
                    ]
                  }}
                  options={sensorOpts}
                  height={40}
                />
              </div>
            </Card>
          </Row>
        );
      });
  };

  createArr() {
    return urlArr.map((sensor, i) => [
      this.props.sensorTemp[i + 1],
      this.props.sensorHum[i + 1],
      i + 1,
      this.props.ac[i] && this.props.ac[i].ac_degree
    ]);
  }
  render() {
    /* [
    [this.props.sensorTemp[1],this.props.sensorHum[1],1,this.props.ac[0] && this.props.ac[0].ac_degree],
    [this.props.sensorTemp[2],this.props.sensorHum[2],2,this.props.ac[1] && this.props.ac[1].ac_degree],
    [this.props.sensorTemp[3],this.props.sensorHum[3],3,this.props.ac[2] && this.props.ac[2].ac_degree],
    [this.props.sensorTemp[4],this.props.sensorHum[4],4,this.props.ac[3] && this.props.ac[3].ac_degree],
    // [this.props.sensorTemp[5],this.props.sensorHum[5],5,this.props.ac[5] && this.props.ac[5].ac_degree], 
  ] */
    const arr = this.createArr();
    const sensorArr = interpolateColors(
      red,
      orange,
      arr.sort((sensor, sensor2) => sensor[0] - sensor2[0])
    );

    return <div>{this.getSensors(sensorArr)}</div>;
  }
}

export default SensorCards;
