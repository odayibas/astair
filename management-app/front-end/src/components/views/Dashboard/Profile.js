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
        label: 'Region 1',
        backgroundColor: brandInfo,
        borderColor: 'rgba(255,255,255,.55)',
        data: [23, 24, 22, 23, 23],
      },
    ],
  };
  
  const cardChartOpts2 = {
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
            min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
            max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
          },
        }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  };
  
  // Card Chart 3
  const cardChartData3 = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Region 3',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
        data: [23, 24, 22, 23, 23],
      },
    ],
  };
  
  const cardChartOpts3 = {
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
          display: false,
        }],
      yAxes: [
        {
          display: false,
        }],
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  };
  
  // Card Chart 4
  const cardChartData4 = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
    datasets: [
      {
        label: 'Region 4',
        backgroundColor: 'rgba(255,255,255,.3)',
        borderColor: 'transparent',
        data: [23, 24, 22, 23, 23],
      },
    ],
  };
  
  const cardChartOpts4 = {
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
          display: false,
          barPercentage: 0.6,
        }],
      yAxes: [
        {
          display: false,
        }],
    },
  };


  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  } 
  var elements = 27;
  var data1 = [];
  var data2 = [];
  var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(0, 18));
  data2.push(random(17, 36));
  data3.push(23);
}

let mainChart = {
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: []
      },
    ],
  };
  
  const mainChartOpts = {
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

  const bar = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Region 1',
        backgroundColor: brandInfo,
        borderColor: brandInfo,
        borderWidth: 1,
        hoverBackgroundColor: brandInfo,
        hoverBorderColor: brandInfo,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  const options = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false
  }

  const bar2 = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Region 2',
        backgroundColor: brandPrimary,
        borderColor: brandPrimary,
        borderWidth: 1,
        hoverBackgroundColor: brandPrimary,
        hoverBorderColor: brandPrimary,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  const options2 = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false
  }

  const bar3 = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Region 3',
        backgroundColor: brandWarning,
        borderColor: brandWarning,
        borderWidth: 1,
        hoverBackgroundColor: brandWarning,
        hoverBorderColor: brandWarning,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  const options3 = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false
  }

  const bar4  = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [
      {
        label: 'Region 4',
        backgroundColor: brandDanger,
        borderColor: brandDanger,
        borderWidth: 1,
        hoverBackgroundColor: brandDanger,
        hoverBorderColor: brandDanger,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  const options4 = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false
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

      this.setState({
        ...presentState
    })

    })
  }
 
  getSensorData =  async() => {
    
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
          this.getSensorData().then(data => {})
          this.getSensorData1().then(data => {})
          this.getSensorData2().then(data => {})
          this.getSensorData3().then(data => {})
          this.getSensorData4().then(data => {})
          this.getcompVisionControllerData().then(data => {})
          this.getOutdoorData().then(data => {})
          this.getMale().then(data => {})
          this.getFemale().then(data => {})
    }, 1000);
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
      <div>
          <div className= "jumbotron mt-5 bg-white">
            <Row >
            <Col xs="12" sm="6" lg="3">
              <div  onClick={() => this.openModal()}>
                <Card className="text-white bg-info">
                <CardBody className="pb-0">
                  <div className="text-value">24°C</div>
                    <div>First Region</div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                  <Line data={cardChartData2} options={cardChartOpts2} height={70} />
                </div>
              </Card>
              </div>
                <Modal visible={this.state.visible} width="450" height="350" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                  <div>
                    <Card>
                      <CardHeader>Average A/C Temperatures  for Region 1
                        <div className="card-header-actions">
                          <a href="/monitor" className="card-header-action">
                          <small className="text-muted">Click here for more information...</small>
                          </a>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <div className="chart-wrapper">
                          <Bar data={bar} options={options} />
                        </div>
                      </CardBody>
                    </Card>
                  <div>
                    <button class="btn btn-outline-primary btn-block"
                    href="javascript:void(0);" onClick={() => this.closeModal()}>Close</button>
                  </div>
                  </div>
          </Modal>
        </Col>

          <Col xs="12" sm="6" lg="3">
          <div  onClick={() => this.openModal2()}>
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">25°C</div>
                <div>Second Region</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={cardChartData1} options={cardChartOpts1} height={70} />
              </div>
            </Card>
            </div>
            <Modal visible={this.state.visible2} width="450" height="350" effect="fadeInUp" onClickAway={() => this.closeModal2()}>
              <div>
                <div>
                    <Card>
                      <CardHeader>
                      Average A/C Temperatures  for Region 2
                        <div className="card-header-actions">
                          <a href="/monitor" className="card-header-action">
                       <small className="text-muted">Click here for more information...</small>
                        </a>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <div className="chart-wrapper">
                          <Bar data={cardChartData1} options={cardChartOpts1} />
                        </div>
                      </CardBody>
                    </Card>
                  <button class="btn btn-outline-primary btn-block"
                  href="javascript:void(0);" onClick={() => this.closeModal2()}>Close</button>
                </div>
              </div>
            </Modal>
          </Col>
          
          <Col xs="12" sm="6" lg="3">
           <div  onClick={() => this.openModal3()}>
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <div className="text-value">23°C</div>
                <div>Third Region</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
            </div>
            <Modal visible={this.state.visible3} width="450" height="350" effect="fadeInUp" onClickAway={() => this.closeModal3()}>
              <div>
                  <Card>
                    <CardHeader>
                    Average A/C Temperatures  for Region 3
                      <div className="card-header-actions">
                      <a href="/monitor" className="card-header-action">
                      <small className="text-muted">Click here for more information...</small>
                      </a>
                      </div>
                    </CardHeader>
                      <CardBody>
                        <div className="chart-wrapper">
                          <Bar data={bar3} options={options3} />
                        </div>
                      </CardBody>
                  </Card>
                  <div>
                    <button class="btn btn-outline-primary btn-block"
                    href="javascript:void(0);" onClick={() => this.closeModal3()}>Close</button>
                  </div>
                </div>
              </Modal>
           </Col>

        <Col xs="200" sm="6" lg="3">
          <div  onClick={() => this.openModal4()}>
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div className="text-value">23°C</div>
                <div>Fourth Region</div>
              </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                  <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
                </div>
            </Card>
          </div>
            <Modal visible={this.state.visible4} width="450" height="350" effect="fadeInUp" onClickAway={() => this.closeModal4()}>
              <div>
                <Card>
                  <CardHeader>
                    Average A/C Temperatures  for Region 4
                     <div className="card-header-actions">
                      <a href="/monitor" className="card-header-action">
                       <small className="text-muted">Click here for more information...</small>
                      </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar4} options={options4} />
              </div>
            </CardBody>
          </Card>
                <div>
                  <button class="btn btn-outline-primary btn-block"
                  href="javascript:void(0);" onClick={() => this.closeModal4()}>Close</button>
                  </div>
                </div>
          </Modal>
        </Col>
        </Row>
            </div>

        <div>
        <center><div className="text-muted"><h4>User Feedbacks For Indoor  Temperatures</h4></div></center>
                <Row className="text-center">
                <Col sm={12} md className="mb-sm-2 mb-0">
                    <strong>Hot</strong>
                    <Progress className="progress-xs mt-2" color="danger" value="80" />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <strong>Good</strong>
                    <Progress className="progress-xs mt-2" color="success" value="40" />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <strong>Cold</strong>
                    <Progress className="progress-xs mt-2" color="primary" value="40" />
                  </Col>
                </Row>
                <div className="jumbotron bg-white">
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <Card>
                      <CardBody>  
                      <div className= "bg-white">
                      <h5> OUTDOOR TEMPERATURE</h5>
                      <h4> {this.state.temp} °C </h4>
                      </div>
                      </CardBody>
                    </Card>
                  </Col>
                 
                    <Col sm={12} md className="mb-sm-2 mb-0">
                    <center><Card>
                      <CardBody>  
                      <div className="bg-white">
                      <Card>
                      <CardBody>  
                      <h5> PEOPLE COUNT </h5>
                      <h4> {this.state.people} </h4>
                      </CardBody>
                    </Card>
                      </div>
                      <br></br>
                      <div>
                        <Row>
                      <Col sm={12} md className="mb-sm-2 mb-0">
                    <Card>
                      <CardBody>  
                      <div className= "bg-white">
                      <h5> Male</h5>
                      <h4> {this.state.male} </h4>
                      </div>
                      </CardBody>
                    </Card>
                    </Col>
                    <Col sm={12} md className="mb-sm-2 mb-0">
                    <Card>
                      <CardBody>  
                      <div className= "bg-white">
                      <h5> Female</h5>
                      <h4> {this.state.female} </h4>
                      </div>
                      </CardBody>
                    </Card>
                  </Col>
                  </Row>
                      </div>
                      </CardBody>
                      
                    </Card></center>
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                   <Card>
                      <CardBody>  
                      <div className="bg-white">
                      <h5> AVERAGE SENSOR TEMPERATURES </h5>
                      <h4>  {this.avmodal()} °C </h4>               
                      </div>
                      </CardBody>
                    </Card>
                  </Col>
              </Row>
              <div>
              <center><div className="text-muted"><h4>Indoor Sensor Temperature Values</h4></div></center>
              <Row>
                <Col sm={12} md className="mb-sm-2 mb-0">
                  <Card className="text-white bg-info">
                    <CardHeader><center><strong>Region 1</strong></center>
                    </CardHeader>
                    <CardBody className="pb-0">
                    <center><h5> {this.state.sensorTemp1} °C </h5></center>
                    </CardBody> 
                  </Card>
                </Col>
                <Col sm={12} md className="mb-sm-2 mb-0">
                  <Card className="text-white bg-primary">
                  <CardHeader><center><strong>Region 2</strong></center>
                    </CardHeader>
                    <CardBody className="pb-0">
                    <center><h5> {this.state.sensorTemp2}°C </h5></center>
                    </CardBody> 
                  </Card>                          
                </Col>
                <Col sm={12} md className="mb-sm-2 mb-0">
                  <Card className="text-white bg-warning">
                  <CardHeader><center><strong>Region 3</strong></center>
                    </CardHeader>
                    <CardBody className="pb-0">
                    <center><h5> {this.state.sensorTemp3}°C </h5></center>
                    </CardBody> 
                  </Card>                               
                </Col>
                <Col sm={12} md className="mb-sm-2 mb-0">
                  <Card className="text-white bg-danger">
                  <CardHeader><center><strong>Region 4</strong></center>
                    </CardHeader>
                    <CardBody className="pb-0">
                    <center><h5> {this.state.sensorTemp4} °C </h5></center>
                    </CardBody> 
                  </Card>                               
                </Col>
              </Row>   
              </div>
            </div>
        </div>

              
        <div className="jumbotron mt-5 bg-white">
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
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Bar data={mainChart} options={mainChartOpts} height={300} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </div>
    </div>

        )
    }
}

export default  Profile