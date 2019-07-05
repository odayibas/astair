import React, { Component } from 'react';
// import jwt_decode from 'jwt-decode'
import axios from 'axios'
import {Line,Bar } from 'react-chartjs-2';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities'

import SensorCards from './SensorCards/SensorCards';
import InfoCards from './InfoCards/InfoCards'

const brandPrimary = getStyle('--primary')
const brandInfo = getStyle('--info')
const brandDanger = getStyle('--danger')


var tempValue = "0";
var loadValue = 0;

var tempValue2 = "0";
var loadValue2 = 0;

  let mainChart = {
    labels: [],
    datasets: [
      {
        label: 'AVERAGE TEMPERATURE',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 4,
        data: []
      },
      {
        label: 'PEOPLE COUNT',
        backgroundColor: hexToRgba(brandDanger, 10),
        borderColor: brandDanger,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: [],
      },
    ],
   };
   
   const mainChartOpts = {
    animation: false,
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function (tooltipItem, chart) {
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
      yAxes: [{
          type: 'linear',
          position: 'left',
          ticks: {
            min: 0,
            maxTicksLimit: 5,
            stepSize: Math.ceil(30 / 5),
            max: 30,
          },
        },{
          type: 'linear',
          position: 'right',
          ticks: {
            min: 0,
            maxTicksLimit: 5,
            stepSize: Math.ceil(30 / 5),
            max: 30,
          }
        }],
    },
    elements: {
      point: {
        radius: 2,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
   };

  let barChart = {
  labels: ['Cold', 'Nice','Hot'],
  datasets: [
    {
      label: 'Slack',
      backgroundColor:  hexToRgba(brandInfo, 50),
      borderColor: brandPrimary,
      pointHoverBackgroundColor: '#fff',
      data: [],
    },
  ],

  };
  
  const barChartOpts = {
    animation: false,
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
            ticks: {
              beginAtZero : true,
              min: 0,
              maxTicksLimit: 5,
              stepSize: Math.ceil(33 / 5),
              max: 15,
            },
          }],
    },
  };



class Dashboard extends Component{
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
        sensorTemp: {},
        male:null,
        female: null,
        datasets:[],
        datasets2 : [],
        hot: null,
        nice : null,
        cold : null,
        radioSelected: 1
    }
    
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
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
   
      this.drawLineChart(res);
  })
}
    getcompVisionControllerData =  async() => {
    
    const url = "/get-all";
    return axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': true,
      },
     
    })
    .then((res) => {
      let presentState = {...this.state}
      console.log(res)
      this.drawPeopleChart(res)
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
      
      this.drawBarChart(res)
        
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

    trigger() {
    let newTime = Date.now() - this.props.date;
   setInterval(() => { 
    this.getSensorData1().then(data => {})
    this.getSensorData2().then(data => {})
    this.getSensorData3().then(data => {})
    this.getSensorData4().then(data => {})
    this.getSlack().then(data => {}) 
    this.getcompVisionControllerData().then(data => {})
    this.getOutdoorData().then(data => {})

    }, 5000);
    }  

    componentDidMount(){     
    this.trigger()
    }

    onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
    }

    drawBarChart(res){
    let presentState = {...this.state}
    presentState.cold = res.data.cold
    presentState.nice = res.data.nice
    presentState.hot = res.data.hot

     let datasets2 = []

     barChart.datasets[0].data.push(presentState.cold );
     barChart.datasets[0].data.push(presentState.nice );
     barChart.datasets[0].data.push(presentState.hot );
  
     if(Math.min.apply(Math, barChart.datasets[0].data) != 0){
      barChartOpts.scales.yAxes[0].ticks.min = Math.min.apply(Math, barChart.datasets[0].data) - 2;
     }
     else {
      barChartOpts.scales.yAxes[0].ticks.min = Math.min.apply(Math, barChart.datasets[0].data);
     }

     barChartOpts.scales.yAxes[0].ticks.max = Math.max.apply(Math, barChart.datasets[0].data) + 2;

      let data = {}
      data["data"] = barChart.datasets[0].data
      datasets2.push(data) 


    this.setState({
        ...presentState,datasets2
      })



    }

    drawLineChart(res){
    
    let presentState = { ...this.state }
    presentState.sensorTemp[4] = res.data[res.data.length - 1].sensor_degree
    var currentDate = new Date(res.data[res.data.length - 1].date_time);
    var clock = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

        if(loadValue == 0)
        {
            for (var i = res.data.length - 20; i < res.data.length; i++) {
                presentState.sensorTemp[4] = res.data[i].sensor_degree;
                mainChart.datasets[0].data.push(presentState.sensorTemp[4]);
                currentDate = new Date(res.data[i].date_time);
                clock = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                mainChart.labels.push(clock);
                mainChartOpts.scales.yAxes[0].ticks.min = Math.min.apply(Math, mainChart.datasets[0].data) - 2;
                mainChartOpts.scales.yAxes[0].ticks.max = Math.max.apply(Math, mainChart.datasets[0].data) + 2;

                console.log(mainChartOpts.scales.yAxes[0].ticks.min)
            }
            loadValue = 1;
          
        }
 
        if(tempValue != clock)
        {
          let datasets = []
          mainChart.datasets[0].data.push(presentState.sensorTemp[4]);
          mainChart.labels.push(clock);
          tempValue = clock;
          if(mainChart.datasets[0].data.length > 20)
          {
              mainChart.datasets[0].data.shift();
              mainChart.labels.shift();
          }  
          mainChartOpts.scales.yAxes[0].ticks.min = Math.min.apply(Math, mainChart.datasets[0].data) - 2;
          mainChartOpts.scales.yAxes[0].ticks.max = Math.max.apply(Math, mainChart.datasets[0].data) + 2;

        }
    }

    drawPeopleChart(res){
  let presentState = { ...this.state }
  presentState.male = res.data[res.data.length - 1].male_count
  presentState.female = res.data[res.data.length - 1].female_count
  presentState.people= (res.data[res.data.length - 1].female_count)+ (res.data[res.data.length - 1].male_count)
  var currentDate = new Date(res.data[res.data.length - 1].date_time);
  var clock = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

      if(loadValue2 == 0)
      {
          for (var i = res.data.length - 20; i < res.data.length; i++) {
            presentState.people= (res.data[res.data.length - 1].female_count)+ (res.data[res.data.length - 1].male_count)
            mainChart.datasets[1].data.push(presentState.people);
            mainChartOpts.scales.yAxes[1].ticks.min = Math.min.apply(Math, mainChart.datasets[0].data) - 1;
            mainChartOpts.scales.yAxes[1].ticks.max = Math.max.apply(Math, mainChart.datasets[0].data) + 1;
          }
          loadValue2 = 1;
      }

     
        let datasets3 = []
        mainChart.datasets[1].data.push(presentState.people);
        if(mainChart.datasets[1].data.length > 20)
        {
            mainChart.datasets[1].data.shift();
        }

        mainChartOpts.scales.yAxes[1].ticks.min = Math.min.apply(Math, mainChart.datasets[0].data) - 1;
        mainChartOpts.scales.yAxes[1].ticks.max = Math.max.apply(Math, mainChart.datasets[0].data) + 1;
        this.setState({
          ...presentState,datasets3
      })

    }
  
    getChart = () => {
    if(this.state.radioSelected == 1){
      return(
      <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
        <Line data={mainChart} options={mainChartOpts} height={300} redraw/>
      </div>)
      }
      else{
        return(
          <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
          <Bar data={barChart} options={barChartOpts} height={300} redraw/>
        </div>)
      }
    }

    render(){
      return(
        <div style={{width: '100% !important',margin: 'auto',height: '100%',marginTop: '40px'}}>
            <div style={{left:'10px', right:'10px', display : 'flex' , padding : '30px', width : '100%', height: '100%'}}>
                <Col  xs="4" sm="3">
                    <SensorCards sensorTemp = {this.state.sensorTemp}/>
                </Col>
                <Col>
                  <div>
                    <InfoCards temp = {this.state.temp} sensorTemp = {this.state.sensorTemp} hot = {this.state.hot} nice={this.state.nice} cold = {this.state.cold} 
                    people = {this.state.people} female = {this.state.female} male = {this.state.male} />
                    <div style={{paddingTop :'30px'}}>
                    <Row>
                    <Col>
                      <Card style={{background: 'transparent'}}>
                        <CardBody style={{background: 'transparent'}}>
                          <Row>
                          <Col sm="5">
                            <CardTitle className="mb-0">AVG. TEMPERATURES-PEOPLE COUNT</CardTitle>
                          </Col>
                          <Col sm="7" className="d-none d-sm-inline-block">
                            <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                              <ButtonGroup className="mr-3" aria-label="First group">
                                <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>INDOOR</Button>
                                <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>SLACK</Button>                      
                              </ButtonGroup>
                            </ButtonToolbar>
                          </Col>
                          </Row>
                          {this.getChart()}
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

export default  Dashboard