import React, { Component } from "react";
import axios from "axios";
import { Col } from "reactstrap";
import { get as getCookie } from "es-cookie";
import { Redirect } from "react-router-dom";
import InfoCards from "./components/InfoCards/InfoCards";
import SensorCards from "./components/SensorCards/SensorCards";
import ACInfo from "./components/ACInfo/ACInfo";
import ColumnChart from "./components/ColumnChart/ColumnChart";
import { withStyles } from "@material-ui/core";
import { connect } from 'react-redux'
import * as SensorActions from "../../services/session/Dashboard/actions";
import { bindActionCreators } from "redux";


const styles = (theme) => ({
  sensorCards: {
    width: '400px !important',
    height: '90%'

  },
  [`@media screen and (max-width: 600px)`]: {
    sensorCards: {
      background: 'yellow',

    },
  },
  [`@media screen and (max-width: 900px)`]: {
    sensorCards: {
      background: 'yellow',

    },
  },
  [`@media screen and (max-width: 1100px)`]: {
    sensorCards: {
      background: 'yellow',

    },
  }
})



class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      temp: null,
      currentWeather: null,
      dailySummary: null,
      dew: null,
      humidity: null,
      visibility: null,
      timezone: null,
      sensorTemp: {},
      sensorHum: {},
      ac: [
        {
          ac_id: "",
          ac_degree: "",
          ac_mode: "",
          ac_fan_speed: "",
          active: ""
        }
      ],
      avgsensor: null,
      avgac: null,
      hot: null,
      nice: null,
      cold: null,
      people: null,
      interval: null,
      sensorData: null,
      columnChartOptions: {}
    };
  }

  componentDidMount() {
    var interval = setInterval(() => {
      this.props.getSensorData().then(sensorData => {
        this.setState({
          sensorTemp: sensorData[0][0],
          sensorHum: sensorData[0][1],
        })
      })
      this.props.getAcData().then(ac => this.setAC(ac));
      this.props.getAcAverage().then(acAvg => {
        this.setState({
          avgac: acAvg
        });

      })
      this.props.getSensorAverageData().then(sensorAvg => {
        this.setAvgTemp(sensorAvg)
      });
      this.props.getOutdoorData().then(outdoor => {
        this.setState({
          temp: outdoor
        })
      });
      this.props.getcompVisionControllerData().then(people => {
        this.setState({
          people: people[people.length - 1],
        })
      });
    }, 15000);
    this.setState({
      interval: interval
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  setSlack = (cold, nice, hot) => {
    this.setState({
      cold: cold,
      nice: nice,
      hot: hot
    });
  };

  setAvgTemp = avgsensor => {
    this.setState({
      avgsensor: avgsensor
    });
  };
  setAC = ac => {
    this.setState({
      ac: ac
    });
  };
  setPeople = people => {
    this.setState({
      people: people
    });
  };

  render() {

    const { classes } = this.props
    if (
      getCookie("usertoken") === "1" ||
      getCookie("usertoken") === "2" ||
      getCookie("usertoken") === "3"
    ) {
      return (
        <div className="page-main">
          <div className="page-body">
            <Col xs="4" sm="3">
              <SensorCards
                sensorHum={this.state.sensorHum}
                sensorTemp={this.state.sensorTemp}
                setAC={x => this.setAC(x)}
                ac={this.state.ac}
              />
            </Col>
            <Col>
              <div style={{ paddingTop: "30px" }}>
                <ColumnChart
                  sensorTemp={this.state.sensorTemp}
                  sensorHum={this.state.sensorHum}
                  temp={this.state.temp}
                  setSlack={this.setSlack}
                  setPeople={x => this.setPeople(x)}
                  setAvgTemp={x => this.setAvgTemp(x)}
                  ac={this.state.ac}
                  hot={this.state.hot}
                  nice={this.state.nice}
                  cold={this.state.cold}
                  people={this.state.people}
                />
                <div style={{ paddingTop: "30px" }}>
                  <InfoCards
                    temp={this.state.temp}
                    sensorTemp={this.state.sensorTemp}
                    hot={this.state.hot}
                    nice={this.state.nice}
                    cold={this.state.cold}
                    people={this.state.people}
                    avgsensor={this.state.avgsensor}
                  />
                </div>
                <div style={{ paddingTop: "30px" }}>
                  <ACInfo ac={this.state.ac} />
                </div>
              </div>
            </Col>
          </div>
          <div
            style={{
              height: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <img height={150} src="/assets/Logo-Astair-w.png" alt={"logo"} />
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStatetoProps = (state) => {
  return { data: state.data, error: state.error }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...SensorActions,
  }, dispatch);
}

export default withStyles(styles, { withTheme: true })(connect(mapStatetoProps, mapDispatchToProps)(Dashboard));

