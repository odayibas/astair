import React, { Component } from 'react'
import mySvg from './office-layout.svg'
import axios from 'axios'
import SplitterLayout from 'react-splitter-layout'
import 'react-splitter-layout/lib/index.css'
import { Badge, CardFooter, Card, CardBody, CardHeader, Col, Row} from 'reactstrap'
import { AppSwitch } from '@coreui/react'
import Modal from 'react-awesome-modal';
import jwt_decode from 'jwt-decode'
import './Monitor.css'

class Monitor extends Component {

  constructor(props) {
  super(props);
  this.state = {
    temp: null,
    currentWeather: null,
    dailySummary: null,
    dew: null,
    humidity: null,
    visibility: null,
    timezone : null,
    visible : false,
    first_name : '',
    last_name : '',
    email : '',
}
}
  getLatitude = async() => {

    const url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/eda3e07c6d1ebeb49dd8a4353a0666a9/39.925533,32.866287?units=si";
    return axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': true,
      },
    })
    .then((res) => {
      let presentState = {...this.state};
      presentState.temp = res.data.currently.apparentTemperature;
      presentState.currentWeather = res.data.currently.summary;
      presentState.dailySummary = res.data.hourly.summary;
      presentState.dew = res.data.currently.dewPoint;
      presentState.humidity = res.data.currently.humidity;
      presentState.visibility = res.data.currently.visibility;
      presentState.timezone = res.data.timezone;


      this.setState({
          ...presentState
      })
  })

  }

  componentDidMount(){
/*    const token =  localStorage.usertoken
    const decoded = jwt_decode(token);
    this.setState({
    first_name : decoded.first_name,
    last_name : decoded.last_name,
    email : decoded.email
})*/
     this.getLatitude().then(data => {
    })
  }

  openModal() {
    this.setState({
        visible : true
    });
}

closeModal() {
    this.setState({
        visible : false
    });
}
 
render() {
    return (
      <div >
           <div className="jumbotron bg-white">
             <div className="bg-white">
               <center> <h2 class="font-italic">MONITOR YOUR WORKSPACE</h2></center>
               </div>
              <Col>
              <div>
              <center>
                <section>
                <div>
                <button class="btn-outline-primary" onClick={() => this.openModal()}>OUTDOOR ACTIVITIES</button> 
                </div>
                <Modal visible={this.state.visible} width="450" height="350" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <p> 
                          <div class="card-body text-center card">
                          <CardHeader className ="bg-white">TODAY'S WEATHER IS HERE FOR YOU
                          </CardHeader>
                          <CardBody>
                            <div>Temperature: {this.state.temp} °C
                            <div>Current Weather: {this.state.currentWeather}</div>
                            <div>Daily Summary: {this.state.dailySummary}</div>
                            <div>Dew Point: {this.state.dew}</div>
                            <div>Humidity: {this.state.humidity}</div>
                            <div>Visibility: {this.state.visibility}</div>
                            <div>TimeZone: {this.state.timezone}</div>
                        </div>
                            </CardBody>
                            </div>
                        </p>
                        <div>
                          <button class="btn btn-outline-primary btn-block"
                        href="javascript:void(0);" onClick={() => this.closeModal()}>Close</button>
                        </div>
                    </div>
                </Modal>
            </section> </center>
            </div>
            </Col>            
            </div>
            <center><img src={mySvg} alt="description of blueprint"/> </center>

            </div>
   
    );
  }
}

export default Monitor;
