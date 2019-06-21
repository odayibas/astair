import React, { Component } from 'react';
import mySvg from './simple-blueprints.svg'
import axios from 'axios';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import {  Card, CardBody, CardHeader, Col, Row} from 'reactstrap';

class Monitor extends Component {

  state = {
    temp: null,
    currentWeather: null,
    dailySummary: null,
    dew: null,
    humidity: null,
    visibility: null,
    location : null,
  }

  getLatitude = async() => {

    const url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/eda3e07c6d1ebeb49dd8a4353a0666a9/39.925533,32.866287";
    return axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': true,
      },
    })
    .then((res) => {
      let presentState = {...this.state};
      presentState.temp = res.data.currently.apparentTemperature;
      presentState.currentWeather = res.data.currently.summary;
      presentState.dailySummary = res.data.daily.summary;
      presentState.dew = res.data.currently.dewPoint;
      presentState.humidity = res.data.currently.humidity;
      presentState.visibility = res.data.currently.visibility;
      presentState.location = res.data.timezone;

      this.setState({
          ...presentState
      })
  })

  }

  componentDidMount(){
     this.getLatitude().then(data => {
    })
  }
  
  render() {
    return (
      <div className="blueprint">
         <SplitterLayout>
           <div >
           <center><img src={mySvg}/> </center>
               </div>
            

          <Row>
          <Col xs="12" sm="6" md="4">
           
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-info">
              <CardHeader>
                OUTDOOR ACTIVIES
              </CardHeader>
              <CardBody>
              <div>Temperature: {this.state.temp}
               <div>Current Weather: {this.state.currentWeather}</div>
               <div>Daily Summary: {this.state.dailySummary}</div>
               <div>Dew Point: {this.state.dew}</div>
               <div>Humidity: {this.state.humidity}</div>
               <div>Visibility: {this.state.visibility}</div>
               <div>TimeZone: {this.state.location}</div>
               </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
     </SplitterLayout>
  </div>
   
    );
  }
}

export default Monitor;
