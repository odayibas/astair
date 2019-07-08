import React, { Component } from 'react';
// import jwt_decode from 'jwt-decode'
import axios from 'axios'
import {Doughnut,Bar } from 'react-chartjs-2';
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
const brandSuccess = getStyle('--success')



  var tempValue = "0";
  var loadValue = 0;

  var tempValue2 = "0";
  var loadValue2 = 0;

  let mainChart = {
    labels: [],
    responsive : true,
    datasets: [
      {
        label: 'AVERAGE TEMPERATURE',
        type:'line',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 4,
        data: []
      },
      {
        label: 'PEOPLE COUNT',
        type: 'bar',
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
      labels: {
      fontSize: 20,
      boxWidth: 20
    }
  },
  maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
        }],
      yAxes: [{
          type: 'linear',
          position: 'right',
          ticks: {
            min: 0,
            max: 30,
          },
        },{
          type: 'linear',
          position: 'left',
          ticks: {
            min: 0,
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
  responsive : true,
  datasets: [
    {
      label: 'Slack',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      backgroundColor: [
        brandPrimary,
        brandSuccess,
        brandDanger
        ],
        hoverBackgroundColor: [
        brandPrimary,
        brandSuccess,
        brandDanger
        ],
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [],
    },
  ],

  };
  
  const barChartOpts = {
    animation: false,
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
  
    },
    legend: {
        labels: {
        fontSize: 30,
        boxWidth: 30
      }
    },
    maintainAspectRatio: false,

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
        hot: null,
        nice : null,
        cold : null,
        radioSelected: 1,
    }
    
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
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
      let presentState = { ...this.state }
      presentState.male = res.data[res.data.length - 1].male_count
      presentState.female = res.data[res.data.length - 1].female_count
      presentState.people= (presentState.male + presentState.female)
      if(presentState.people != res.data[res.data.length - 1].male_count )
      this.drawPeopleChart(res)

      this.setState({
        ...presentState
    })
      })
      .catch((error) => {
        console.log(error)
      }
      )
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
      
      let presentState = {...this.state}
      presentState.cold = res.data.cold
      presentState.nice = res.data.nice
      presentState.hot = res.data.hot

      this.drawSlackChart(res)

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

    getSensorData = async() =>{
      Promise.all([
        axios.get('/sensor/get-zone/1'),
        axios.get('/sensor/get-zone/2'),
        axios.get('/sensor/get-zone/3'),
        axios.get('/sensor/get-zone/4')
      ])
      .then(([res1, res2, res3, res4]) => {
        let presentState = {...this.state}
        presentState.sensorTemp[1] = res1.data[res1.data.length - 1].sensor_degree
        presentState.sensorTemp[2] = res2.data[res2.data.length - 1].sensor_degree
        presentState.sensorTemp[3] = res3.data[res3.data.length - 1].sensor_degree
        presentState.sensorTemp[4] = res4.data[res4.data.length - 1].sensor_degree

        this.drawLineChart(res4);

        this.setState({
          ...presentState
      })
    });


    }

    trigger() {
    let newTime = Date.now() - this.props.date;
    setInterval(() => { 
    this.getSensorData().then(data =>{})
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

    drawSlackChart(res){
    let presentState = {...this.state}
    presentState.cold = res.data.cold
    presentState.nice = res.data.nice
    presentState.hot = res.data.hot


    for(var i = 0 ; i<3 ; i++)
    barChart.datasets[0].data.shift()

     barChart.datasets[0].data.push(presentState.cold);
     barChart.datasets[0].data.push(presentState.nice);
     barChart.datasets[0].data.push(presentState.hot);
  

    this.setState({
        ...presentState
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
                mainChartOpts.scales.yAxes[0].ticks.min = Math.min.apply(Math, mainChart.datasets[0].data) -2;
                mainChartOpts.scales.yAxes[0].ticks.max = Math.max.apply(Math, mainChart.datasets[0].data) + 2;
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

      if(loadValue2 == 0)
      {
          for (var i = res.data.length - 20; i < res.data.length; i++) {
            presentState.people= (res.data[res.data.length - 1].female_count)+ (res.data[res.data.length - 1].male_count)
            mainChart.datasets[1].data.push(presentState.people);
            mainChartOpts.scales.yAxes[1].ticks.min = parseInt(Math.min.apply(Math, mainChart.datasets[1].data) - 1);
            mainChartOpts.scales.yAxes[1].ticks.max = parseInt(Math.max.apply(Math, mainChart.datasets[1].data) + 1);
          }
          loadValue2 = 1;
      }

        let datasets3 = []
        mainChart.datasets[1].data.push(presentState.people);
        if(mainChart.datasets[1].data.length > 20)
        {
            mainChart.datasets[1].data.shift();
        }

        mainChartOpts.scales.yAxes[1].ticks.min = parseInt(Math.min.apply(Math, mainChart.datasets[1].data) - 1);
        mainChartOpts.scales.yAxes[1].ticks.max = parseInt(Math.max.apply(Math, mainChart.datasets[1].data) + 1);

      let data = {}
      data["data"] =  mainChart.datasets[1].data
      datasets3.push(data) 

        this.setState({
          ...presentState,datasets3
      })

    }
  
    getChart = () => {

      if(this.state.radioSelected == 1){
      return(
      <div style={{ height: '400px', marginTop: '10px' }}>
        <Bar data={mainChart} options={mainChartOpts} height={400} redraw/>
      </div>)
      }
       else if(this.state.radioSelected == 2){
        return(
          <div style={{ height: 400 + 'px'}}>
          <Doughnut data={barChart} options={barChartOpts} height={400} redraw/>
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
                    <div style={{paddingTop :'20px'}}>
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
                                <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2) } active={this.state.radioSelected === 2}>SLACK</Button>                      
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