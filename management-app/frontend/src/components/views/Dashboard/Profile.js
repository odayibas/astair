import React, { Component } from 'react';
// import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import Modal from 'react-awesome-modal';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import {set as setCookie, get as getCookie} from 'es-cookie';

import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import './Profile.css'
import MainChart from './Charts/MainChart'
import SensorCharts from './Charts/SensorCharts'
import Summary from './Charts/Summary'


const brandPrimary = getStyle('--primary')
const brandWarning= getStyle('--warning')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandDanger = getStyle('--danger')

 
  
function getColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }




class Profile extends Component{
  constructor(){
    super()
      this.state = {
        first_name : '',
        last_name : '',
        email : '',
        visible : '',
        visible2 : '',
        visible3 : '',
        visible4 : '',
        temp: null,
        currentWeather: null,
        dailySummary: null,
        dew: null,
        humidity: null,
        visibility: null,
        timezone : null,
        sensorData : [],
        sensorTemp: null,
        sensorTemp1: null,
        sensorTemp2: null,
        sensorTemp3: null,
        sensorTemp4: null,
        people : null,
        male:null,
        female: null,
        datasets:[]
    }

  }

  getMale =  async() => {
    
    const url = "/get-male";
    return axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': true,
      },
     
    })
    .then((res) => {
      console.log(res.data)
      console.log("taken")
      let presentState = {...this.state}

      presentState.male= res.data


      this.setState({
        ...presentState
    })


    })
  }

  getFemale =  async() => {
    
    const url = "/get-female";
    return axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': true,
      },
     
    })
    .then((res) => {
      console.log(res.data)
      console.log("taken")
      let presentState = {...this.state}

      presentState.female= res.data


      this.setState({
        ...presentState
    })


    })
  }


  getcompVisionControllerData =  async() => {
    
    const url = "/get-people";
    return axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': true,
      },
     
    })
    .then((res) => {
      console.log(res.data)
      console.log("taken")
      let presentState = {...this.state}

      presentState.people= res.data


      this.setState({
        ...presentState
    })


    })
  }

  getSensorData1 =  async() => {
    
    const url = "/sensor/get-zone/1";
    return axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': true,
      },
     
    })
    .then((res) => {
      
      let presentState = {...this.state}

      presentState.sensorTemp1 = res.data.length > 0 && res.data[res.data.length - 1].sensor_degree && res.data[res.data.length - 1].sensor_degree

      this.setState({
        ...presentState
    })

    })
  }

  getSensorData2 =  async() => {
    
    const url = "/sensor/get-zone/2";
    return axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': true,
      },
     
    })
    .then((res) => {
      let presentState = {...this.state}

      presentState.sensorTemp2 = res.data.length > 0 && res.data[res.data.length - 1].sensor_degree && res.data[res.data.length - 1].sensor_degree

      this.setState({
        ...presentState
    })

    })
  }

  getSensorData3 =  async() => {
    
    const url = "/sensor/get-zone/3";
    return axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': true,
      },
     
    })
    .then((res) => {

      let presentState = {...this.state}

      presentState.sensorTemp3 = res.data.length > 0 && res.data[res.data.length - 1].sensor_degree && res.data[res.data.length - 1].sensor_degree

      this.setState({
        ...presentState
    })

    })
  }

  getSensorData4 =  async() => {
    
    const url = "/sensor/get-zone/4";
    return axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': true,
      },
     
    })
    .then((res) => {
   
      let presentState = {...this.state}

      presentState.sensorTemp4 = res.data.length > 0 && res.data[res.data.length - 1].sensor_degree && res.data[res.data.length - 1].sensor_degree


      let datasets = []
      console.log(res.data.length)
     // mainChart.datasets[0].data.push(res.data.length > 0 && res.data[res.data.length - 1].sensor_degree && res.data[res.data.length - 1].sensor_degree);
      let data = {}
    //  data["data"] = mainChart.datasets[0].data
      datasets.push(data)
      this.setState({
          ...presentState,datasets
      },()=> console.log(this.state.datasets))

    })
  }
 
 /*  getSensorData =  async() => {
    
    const url = "/sensor/get-all";
    return axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': true,
      },
     
    })
    .then((res) => {
      let presentState = {...this.state}
      presentState.sensorData = res.data
      presentState.sensorTemp = res.data.length > 0 && res.data[res.data.length - 1].sensor_degree && res.data[res.data.length - 1].sensor_degree
      let datasets = []
      console.log(res.data.length)
      mainChart.datasets[0].data.push(res.data.length > 0 && res.data[res.data.length - 1].sensor_degree && res.data[res.data.length - 1].sensor_degree);
      let data = {}
      data["data"] = mainChart.datasets[0].data
      datasets.push(data)
      this.setState({
          ...presentState,datasets
      },()=> console.log(this.state.datasets))
    })
  }
  */
  getOutdoorData = async() => {

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
  this.trigger()

 }

trigger() {
    let newTime = Date.now() - this.props.date;
   setInterval(() => { 
       //   this.getSensorData().then(data => {})
/*           this.getSensorData1().then(data => {})
          this.getSensorData2().then(data => {})
          this.getSensorData3().then(data => {})
          this.getSensorData4().then(data => {})
          this.getcompVisionControllerData().then(data => {})
          this.getOutdoorData().then(data => {})
          this.getMale().then(data => {})
          this.getFemale().then(data => {}) */
    }, 5000);
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
  
  openModal2() {
    this.setState({
        visible2 : true
    });
  }

  closeModal2() {
    this.setState({
        visible2: false
    });
  }

  openModal3() {

  this.setState({
      visible3 : true
  });
  }

  closeModal3() {
  this.setState({
      visible3: false
  });
  }

  openModal4() {
  this.setState({
      visible4 : true
  });
  }

  closeModal4() {
  this.setState({
      visible4: false
  });
  }

  render(){
    
  /*   if(!getCookie("usertoken")){
      return (<Redirect to='/'/>)}
      else{ */
      return(
     
      	
        <div style={{width: '100% !important',margin: 'auto',height: '100%',minWidth:1700,marginTop: '40px'}}>
          <div style={{left:'10px', right:'10px', display : 'flex' , padding : '30px', width : '100%', height: '100%'}}>
          <Col  xs="4" sm="3">
            <SensorCharts/>
            <br></br>
          </Col>
          <Col>
        <div>
          <Summary/>
        <div style={{paddingTop :'30px'}}>
        <Row>
          <Col>
            <Card style={{background: 'transparent'}}>
              <CardBody style={{background: 'transparent'}}>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Average Temperatures</CardTitle>
                    <div className="small text-muted"></div>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button color="outline-secondary">INDOOR</Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <div>
                <MainChart/>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </div>
      </div>
     </Col>
   </div>
    </div>

        )
    }
 // }

}

export default  Profile