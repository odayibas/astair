import React, { Component } from 'react';
// import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import Modal from 'react-awesome-modal';
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

  
function getColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  let mainChart = {
    labels: ['a','b','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'transparent',
        borderColor: getColor(),
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
        selectedOption: '',
        datasets:[]
    }  
    this.radioChange = this.radioChange.bind(this);


  }
  radioChange(e) {
    this.setState({
      selectedOption: e.currentTarget.value
    });
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
    }, 500);
  }


  avmodal() {
  var x =  (this.state.sensorTemp1 +  this.state.sensorTemp2 +  this.state.sensorTemp3 + this.state.sensorTemp4)/4
  x = x * 100   
  x = parseInt(x)
  var y = x/100
  return y
}

getColorbyHeat(x) {
  if(x >= '20'){
    return brandDanger
  }else {return 'rgba(0,0,0,.0)'}
  }
  render(){
    const sensors =(
      <div>
      <Row>
      <Card style={{background: this.getColorbyHeat(this.state.sensorTemp1)}}>
        <CardBody className="pb-0">
          <div className="text-value">{this.state.sensorTemp1} °C</div>
          <div>Sensor 1</div>
        </CardBody>
        <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
          <Line data={ 
            {labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
             datasets: [
               {
                label: 'Region 2',
                backgroundColor: this.getColorbyHeat(this.state.sensorTemp1),
                borderColor: 'rgba(255,255,255,.55)',
                data: [23, 24, 22, 23, 23]
              },
            ],}}options={cardChartOpts1} height={70} />
        </div>
      </Card>
      </Row>
      <br></br>
      <Row>
       <Card style={{background: this.getColorbyHeat(this.state.sensorTemp2)}}>
        <CardBody className="pb-0">
          <div className="text-value">{this.state.sensorTemp2} °C		</div>
          <div>Sensor 2</div>
        </CardBody>
        <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
          <Line data={{
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
          datasets: [
              {
                label: 'Region 2',
                backgroundColor: this.getColorbyHeat(this.state.sensorTemp2),
                borderColor: 'rgba(255,255,255,.55)',
                data: [23, 24, 22, 23, 23]
              },
            ],}}options={cardChartOpts1} height={70} />
        </div>
      </Card>
      </Row>
      <br></br>
      <Row>
         <Card style={{background: this.getColorbyHeat(this.state.sensorTemp3)}}>
        <CardBody className="pb-0">
          <div className="text-value">{this.state.sensorTemp3} °C</div>
          <div>Sensor 3</div>
        </CardBody>
        <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
          <Line data={ {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
          datasets: [
              {
                label: 'Region 2',
                backgroundColor: this.getColorbyHeat(this.state.sensorTemp3),
                borderColor: 'rgba(255,255,255,.55)',
                data: [23, 24, 22, 23, 23]
              },
            ],
          }} options={cardChartOpts1} height={70} />
        </div>
      </Card>
      </Row>
      <br></br>
       <Row>
        <Card style={{background: this.getColorbyHeat(this.state.sensorTemp4)}}>
        <CardBody className="pb-0">
          <div className="text-value">{this.state.sensorTemp4} °C</div>
          <div>Sensor 4</div>
        </CardBody>
        <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
          <Line data={{
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
            datasets: [
                {
                  label: 'Region 2',
                  backgroundColor: this.getColorbyHeat(this.state.sensorTemp4),
                  borderColor: 'rgba(255,255,255,.55)',
                  data: [23, 24, 22, 23, 23]
                },
              ],
            }} options={cardChartOpts1} height={70} />
        </div>
      </Card>
      </Row> 
      </div>
      )

      const ac =(
        <div>
        <Row>
        <Card >
          <CardBody className="pb-0">
            <div className="text-value">{this.state.sensorTemp1} °C</div>
            <div>Sensor 1</div>
          </CardBody>
          <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            <Line data={ 
              {labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
               datasets: [
                 {
                  label: 'Region 2',
                  backgroundColor: this.getColorbyHeat(this.state.sensorTemp1),
                  borderColor: 'rgba(255,255,255,.55)',
                  data: [23, 24, 22, 23, 23]
                },
              ],}}options={cardChartOpts1} height={70} />
          </div>
        </Card>
        </Row>
        <br></br>
        <Row>
         <Card >
          <CardBody className="pb-0">
            <div className="text-value">{this.state.sensorTemp2} °C		</div>
            <div>Sensor 2</div>
          </CardBody>
          <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            <Line data={{
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
            datasets: [
                {
                  label: 'Region 2',
                  backgroundColor: this.getColorbyHeat(this.state.sensorTemp2),
                  borderColor: 'rgba(255,255,255,.55)',
                  data: [23, 24, 22, 23, 23]
                },
              ],}}options={cardChartOpts1} height={70} />
          </div>
        </Card>
        </Row>
        <br></br>
        <Row>
           <Card >
          <CardBody className="pb-0">
            <div className="text-value">{this.state.sensorTemp3} °C</div>
            <div>Sensor 3</div>
          </CardBody>
          <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            <Line data={ {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
            datasets: [
                {
                  label: 'Region 2',
                  backgroundColor: this.getColorbyHeat(this.state.sensorTemp3),
                  borderColor: 'rgba(255,255,255,.55)',
                  data: [23, 24, 22, 23, 23]
                },
              ],
            }} options={cardChartOpts1} height={70} />
          </div>
        </Card>
        </Row>
        <br></br>
         <Row>
          <Card >
          <CardBody className="pb-0">
            <div className="text-value">{this.state.sensorTemp4} °C</div>
            <div>Sensor 4</div>
          </CardBody>
          <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            <Line data={{
              labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
              datasets: [
                  {
                    label: 'Region 2',
                    backgroundColor: this.getColorbyHeat(this.state.sensorTemp4),
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [23, 24, 22, 23, 23]
                  },
                ],
              }} options={cardChartOpts1} height={70} />
          </div>
        </Card>
        </Row> 
        </div>
        )


    
      return(
     
      	
        <div style={{width: '100% !important',margin: 'auto',height: '100%',minWidth:1700,marginTop: '40px'}}>
          <div style={{left:'10px', right:'10px', display : 'flex' , padding : '30px', width : '100%', height: '100%'}}>
          <Col  xs="4" sm="3">
          {sensors} 
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
                  <h2>  {this.avmodal()} °C </h2>               
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