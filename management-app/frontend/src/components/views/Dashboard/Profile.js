import React, { Component } from 'react';
// import jwt_decode from 'jwt-decode'
import axios from 'axios'
import {Line } from 'react-chartjs-2';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardTitle,
  Col,
  Progress,
  Row,
} from 'reactstrap';

import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import './Profile.css'
import { isNumberLiteralTypeAnnotation } from '@babel/types';

const brandPrimary = getStyle('--primary')

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

  let mainChart = {
    labels: ['a','b','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'transparent',
        borderColor: 'rgb(0,0,0)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 5,
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
            min: 20,
            maxTicksLimit: 5,
            stepSize: Math.ceil(33 / 5),
            max: 33,
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


let green = 'rgba(211, 84, 0, 1)';
let red = 'rgba(252, 214, 112, 1)';

function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) {
        factor = 0.5;
    }
    let result = color1.slice();
    let color = 'rgb(';
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
        color += result[i]
        color += i != 2 ? ',' : '';
    }
    color += ')';
    return color;
};

function interpolateColors(color1, color2, steps) {
    var stepFactor = 1 / ((steps.length == 1 ? 2 : steps.length)- 1),
        interpolatedColorArray = [];
        
    let newArr = [];
  
    color1 = color1.match(/\d+/g).map(Number);
    color2 = color2.match(/\d+/g).map(Number);

    for (var i = 0; i < steps.length; i++) {
        newArr.push({
          region:steps[i][1],
          temp : steps[i][0],  
          color : interpolateColor(color1, color2, stepFactor * i)
        })
    }
    return newArr;
}

class Profile extends Component{
  constructor(){
    super()
      this.state = {
        first_name : '',
        last_name : '',
        email : '',
        temp: null,
        currentWeather: null,
        dailySummary: null,
        dew: null,
        humidity: null,
        visibility: null,
        timezone : null,
        sensorData : [],
        sensorTemp: {},
        male:null,
        female: null,
        datasets:[],
        hot: null,
        nice : null,
        cold : null
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
      let presentState = {...this.state}

      presentState.people= res.data


      this.setState({
        ...presentState
    })


    })
  }

  getSensorData= async() => {
    const url = "/sensor/get-last/";
    return axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': true,
      },
     
    })
    .then((res) => {
      
      console.log(res)
      let presentState = {...this.state}


      presentState.sensorTemp[1] =  res.data[res.data.length - 1].sensor_degree 

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

      presentState.sensorTemp[1] = res.data.length > 0 && res.data[res.data.length - 1].sensor_degree && res.data[res.data.length - 1].sensor_degree

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

      presentState.sensorTemp[2] = res.data.length > 0 && res.data[res.data.length - 1].sensor_degree && res.data[res.data.length - 1].sensor_degree

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

      presentState.sensorTemp[3] = res.data.length > 0 && res.data[res.data.length - 1].sensor_degree && res.data[res.data.length - 1].sensor_degree

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

       presentState.sensorTemp[4] = res.data.length > 0 && res.data[res.data.length - 1].sensor_degree && res.data[res.data.length - 1].sensor_degree
       let datasets = []
      
       if(mainChart.datasets[0].data.length != 30){

        mainChart.datasets[0].data.push(res.data.length > 0 && res.data[res.data.length - 1].sensor_degree && res.data[res.data.length - 1].sensor_degree);
        let data = {}
        data["data"] = mainChart.datasets[0].data
        datasets.push(data) 
       }
       else{
        mainChart.datasets[0].data.shift();
        datasets.push(res.data[res.data.length - 1].sensor_degree ) ;
        
      }
  

      this.setState({
          ...presentState,datasets
        })
    })
  }


  getSlack =  async() => {
    
    const url = "/slack/get-poll-result-hot-cold-nice";
    return axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': true,
      },
     
    })
    .then((res) => {
   
      console.log(res.data)
      let presentState = {...this.state}
      presentState.cold = res.data.cold
      presentState.nice = res.data.nice
      presentState.hot = res.data.hot
  

      this.setState({
          ...presentState
        })
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

   // this.getSensorData().then(data => {})
          this.getSensorData1().then(data => {})
          this.getSensorData2().then(data => {})
          this.getSensorData3().then(data => {})
          this.getSensorData4().then(data => {}) 
          this.getSlack().then(data => {}) 
          this.getcompVisionControllerData().then(data => {})
          this.getOutdoorData().then(data => {})
          this.getMale().then(data => {})
          this.getFemale().then(data => {})
    }, 500);
  }


  avgmodal() {
  var x =  (this.state.sensorTemp[1] +  this.state.sensorTemp[2] +  this.state.sensorTemp[3] + this.state.sensorTemp[4])/4
  x = x * 100   
  x = parseInt(x)
  var y = x/100
  return y
}

slack100(a) {
  var x =  (this.state.hot +  this.state.cold +  this.state.nice)
  a = a * 100   
  var y = a / x
  return y
}


getSensors = (sensorArr) => {
return sensorArr.sort((sensor, sensor2) => (sensor.region - sensor2.region)).map((sensor, i) => (
  <Row style={{marginBottom : 20}}>
      <Card style={{background: sensor.color}}>
        <CardBody className="pb-0">
          <div className="text-value">{sensor.temp} °C</div>
          <div>INDOOR {i+1}</div>
        </CardBody> 
        <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
          <Line data={ 
            {labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
             datasets: [
               {
                label: `Region ${i}`,
                backgroundColor: sensor.color,
                borderColor: 'rgba(255,255,255,.55)',
                data: [23, 24, 22, 23, 23]
              },
            ],}}options={cardChartOpts1} height={70} />
        </div>
      </Card>
      </Row>
))
}



  render(){

    const sensorArr = interpolateColors(red, green,[
      [this.state.sensorTemp[1],1],
      [this.state.sensorTemp[2],2],
      [this.state.sensorTemp[3],3],
      [this.state.sensorTemp[4],4]
    ].sort((sensor, sensor2) => (sensor[0] - sensor2[0])))

      return(
     
      	
        <div style={{width: '100% !important',margin: 'auto',height: '100%',minWidth:1700,marginTop: '40px'}}>
          <div style={{left:'10px', right:'10px', display : 'flex' , padding : '30px', width : '100%', height: '100%'}}>
          <Col  xs="4" sm="3">
          {this.getSensors(sensorArr)}
          <br></br>
          </Col>
          <Col>
        <div>
          <Row className="text-center">
            <Col sm={12} md className="mb-sm-2 mb-0">
              <strong>Hot</strong>
              <Progress className="progress-xs mt-2" color="danger" value={this.slack100(this.state.hot)} />
              <strong>Nice</strong>
              <Progress className="progress-xs mt-2" color="success" value={this.slack100(this.state.nice)}/>
              <strong>Cold</strong>
              <Progress className="progress-xs mt-2" color="primary" value={this.slack100(this.state.cold)} />
            </Col>
             <Col >
              <Card style={{padding : '20px'}}>
                <CardBody className="pb-0">  
                <div className="text-value"> <h4> OUTDOOR </h4>
                <h2> {this.state.temp} °C </h2>
                </div>
                </CardBody>
              </Card>
            </Col>
            <Col >
            <Card>
              <CardBody className="pb-0">
                <div className="text-value">   <h4>People Count</h4></div>
                <h2>{this.state.people}	</h2>
                <Row>
                  <Col>
                <div className="text-value">    <h4>Male</h4></div>
                <h2> {this.state.male}	</h2>
                </Col>
                <Col>
                <div className="text-value"> <h4>Female</h4>	</div>
                <h2>{this.state.female}	</h2>
                </Col>
                </Row>

              </CardBody>
           
            </Card>
            </Col>
            <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
              <Card style={{padding :'20px'}}>
                <CardBody className="pb-0">  
                  <div className="bg-transparent">
                  <h4> INDOOR </h4>
                  <h2>  {this.avgmodal()} °C </h2>               
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>   
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