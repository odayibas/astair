import React, { Component } from 'react';
import axios from 'axios';
import { Col } from 'reactstrap';
import { get as getCookie } from 'es-cookie';
import { Redirect } from 'react-router-dom';

import InfoCards from './InfoCards/InfoCards';
import Charts from './Charts/Charts';
import SensorCards from './SensorCards/SensorCards';
import ACInfo from './ACInfo/ACInfo';

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

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
          ac_id: '',
          ac_degree: '',
          ac_mode: '',
          ac_fan_speed: '',
          active: ''
        }
      ],
      avgsensor: null,
      avgac: null,
      hot: null,
      nice: null,
      cold: null,
      people: null,
      interval: null
    };
  }

  getACAverage = async () => {
    return axios.get(urlServer + '/AC/get-avg-degree').then(res => {
      this.setState({ avgac: res.data });
    });
  };

  getOutdoorData = async () => {
    const url =
      'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/eda3e07c6d1ebeb49dd8a4353a0666a9/39.925533,32.866287?units=si';
    return axios
      .get(url, {
        headers: {
          'Access-Control-Allow-Origin': true
        }
      })
      .then(res => {
        let presentState = { ...this.state };

        presentState.temp = res.data.currently.apparentTemperature;
        this.setState({
          ...presentState
        });
      });
  };

  componentDidMount() {
    var interval = setInterval(() => {
      this.getOutdoorData().then(data => {});
      this.getACAverage().then(data => {});
    }, 5000);
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
    if (getCookie('usertoken') === '1' || getCookie('usertoken') === '2') {
      return (
        <div
          style={{
            width: '100% !important',
            margin: 'auto',
            height: '100%',
            marginTop: '40px'
          }}
        >
          <div
            style={{
              left: '10px',
              right: '10px',
              display: 'flex',
              padding: '30px',
              width: '100%',
              height: '90%'
            }}
          >
            <Col xs="4" sm="3">
              <SensorCards
                sensorHum={this.state.sensorHum}
                sensorTemp={this.state.sensorTemp}
                setAC={x => this.setAC(x)}
                ac={this.state.ac}
              />
            </Col>
            <Col>
              <div style={{ paddingTop: '30px' }}>
                <Charts
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
                <div style={{ paddingTop: '30px' }}>
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
                <div style={{ paddingTop: '30px' }}>
                  <ACInfo ac={this.state.ac} />
                </div>
              </div>
            </Col>
          </div>
          <div
            style={{
              height: '10%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img height={150} src="/assets/Logo-Astair-w.png" alt={'logo'} />
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default Dashboard;
