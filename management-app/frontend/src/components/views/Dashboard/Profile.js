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

import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import './Profile.css'

const brandPrimary = getStyle('--primary')
const brandWarning= getStyle('--warning')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandDanger = getStyle('--danger')

// Card Chart 1
const cardChartData1 = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
  datasets: [
      {
        label: 'Region 2',
        backgroundColor: brandPrimary,
        borderColor: 'rgba(255,255,255,.55)',
        data: [23, 24, 22, 23, 23]
      },
    ],
  };
  
  const cardChartOpts1 = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent',
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          },
  
        }],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
            max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
          },
        }],
    },
    elements: {
      line: {
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    }
  }
  
  
  // Card Chart 2
  const cardChartData2 = {
   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
  datasets: [
      {
        label: 'Region 2',
        backgroundColor: brandPrimary,
        borderColor: 'rgba(255,255,255,.55)',
        data: [23, 24, 22, 23, 23]
      },
    ],
  };
  
 
  
  // Card Chart 3
  const cardChartData3 = {
   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
  datasets: [
      {
        label: 'Region 2',
        backgroundColor: brandPrimary,
        borderColor: 'rgba(255,255,255,.55)',
        data: [23, 24, 22, 23, 23]
      },
    ],
  };
  
  
  // Card Chart 4
  const cardChartData4 = {
   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
  datasets: [
      {
        label: 'Region 2',
        backgroundColor: brandPrimary,
        borderColor: 'rgba(255,255,255,.55)',
        data: [23, 24, 22, 23, 23]
      },
    ],
  };
  
  function getColorbyHeat() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
function getColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  let mainChart = {
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'transparent',
        borderColor: getColor(),
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: []
      },
    ],
  };
  
  const mainChartOpts = {
    animation : false,
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
        }
      }
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
        }],
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
            min: -10,
            maxTicksLimit: 5,
            stepSize: Math.ceil(40 / 5),
            max: 40,
          },
        }],
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
  };


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
      mainChart.datasets[0].data.push(res.data.length > 0 && res.data[res.data.length - 1].sensor_degree && res.data[res.data.length - 1].sensor_degree);
      let data = {}
      data["data"] = mainChart.datasets[0].data
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
          this.getSensorData1().then(data => {})
          this.getSensorData2().then(data => {})
          this.getSensorData3().then(data => {})
          this.getSensorData4().then(data => {})
          this.getcompVisionControllerData().then(data => {})
          this.getOutdoorData().then(data => {})
          this.getMale().then(data => {})
          this.getFemale().then(data => {})
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

  avmodal() {
  var x =  (this.state.sensorTemp1 +  this.state.sensorTemp2 +  this.state.sensorTemp3 + this.state.sensorTemp4)/4
  x = x * 100   
  x = parseInt(x)
  var y = x/100
  return y
}

  render(){
    
      return(
      	<div style={{width: '100% !important',margin: 'auto',height: '100%',minWidth:1500,marginTop: '40px'}}>
      	<div style={{ left:'10px', right:'10px', display : 'flex' , padding : '15px', width : '100%', height: '100%'}}>
          <Col  xs="4" sm="3">
          <Row>
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.sensorTemp1} °C</div>
                <div>Sensor 1</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={cardChartData2} options={cardChartOpts1} height={70} />
              </div>
            </Card>
            </Row>
            <br></br>
            <Row>
             <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.sensorTemp2} °C		</div>
                <div>Sensor 2</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={cardChartData1} options={cardChartOpts1} height={70} />
              </div>
            </Card>
            </Row>
            <br></br>
            <Row>
               <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.sensorTemp3} °C</div>
                <div>Sensor 3</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts1} height={70} />
              </div>
            </Card>
            </Row>
            <br></br>
             <Row>
              <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.sensorTemp4} °C</div>
                <div>Sensor 4</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={cardChartData4} options={cardChartOpts1} height={70} />
              </div>
            </Card>
            </Row>
            <br></br>
          
          </Col>
          <Col>
        <div>
          <Row className="text-center">
            <Col sm={12} md className="mb-sm-2 mb-0">
              <strong>Hot</strong>
              <Progress className="progress-xs mt-2" color="danger" value="80" />
              <strong>Good</strong>
              <Progress className="progress-xs mt-2" color="success" value="40" />
              <strong>Cold</strong>
              <Progress className="progress-xs mt-2" color="primary" value="40" />
            </Col>
             <Col sm={12} md className="mb-sm-2 mb-0">
              <Card style={{padding : '20px'}}>
                <CardBody>  
                <div className= "bg-white">
                <h5> OUTDOOR </h5>
                <h4> {this.state.temp} °C </h4>
                </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
              <Card style={{padding :'10px'}}>
                <CardBody>  
                  <div className="bg-white">
                  <h5> INDOOR </h5>
                  <h4>  {this.avmodal()} °C </h4>               
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

              
        <div style={{paddingTop :'30px'}}>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Average Temperatures</CardTitle>
                    <div className="small text-muted"></div>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>INDOOR</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>COUNT</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>OUTDOOR</Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Line data={mainChart} options={mainChartOpts} height={300} redraw/>
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
}

export default  Profile