import React, { Component } from 'react';
// import jwt_decode from 'jwt-decode'
import axios from 'axios'
import {Doughnut,Bar,Line } from 'react-chartjs-2';
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

import {get as getCookie} from 'es-cookie'
import {Redirect} from 'react-router-dom'
import SensorCards from './SensorCards/SensorCards';
import InfoCards from './InfoCards/InfoCards'


const brandPrimary = getStyle('--primary')
const brandInfo = getStyle('--info')
const brandDanger = getStyle('--danger')
const brandSuccess = getStyle('--success')

const urlArr = ['1', '2','3','4']

  var tempValue = "0";
  var loadValue = 0;
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
            max: 30,
          },
          id: "y-axis-0",
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
          sensorHum : {},
          male:null,
          female: null,
          hot: null,
          nice : null,
          cold : null,
          radioSelected: 1,
          _isMounted : false
      }  
    
      this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
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
      let presentState = { ...this.state }
     
      presentState.people= (res.data)
      
     //this.drawPeopleChart(res)

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

    const url = "/outdoor";
    return axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': true,
      },

    })
    .then((res) => {
      let presentState = {...this.state};
      console.log(res.data)
      
      presentState.temp = res.data.currently.apparentTemperature;
      /* presentState.currentWeather = res.data.currently.summary;
      presentState.dailySummary = res.data.hourly.summary;
      presentState.dew = res.data.currently.dewPoint;
      presentState.humidity = res.data.currently.humidity;
      presentState.visibility = res.data.currently.visibility;
      presentState.timezone = res.data.timezone; */
      this.setState({
          ...presentState
      })
  })

    }

    getSensorData = async() =>{

      const apiUrl = '/sensor/get-zone/'

      const responses = await Promise.all(
        urlArr.map(url => 
           axios(apiUrl+ url).
            then((res) => {
              let presentState = {...this.state}

              presentState.sensorTemp[parseInt(url)] = res.data[res.data.length - 1].sensor_degree
              presentState.sensorHum[parseInt(url)] = res.data[res.data.length - 1].sensor_humidity
              
              if(parseInt(url) === 4)
              this.drawLineChart(res)
              
              this.setState({
                ...presentState
          })
        })
      )
    );
  }

    trigger() {
    let newTime = Date.now() - this.props.date;
      setInterval(() => { 
        this.getSensorData().then(data =>{})
        this.getSlack().then(data => {}) 
        this.getOutdoorData().then(data => {})
      }, 5000);
    let newTime2 = Date.now() - this.props.date;
      setInterval(() => { 
        this.getcompVisionControllerData().then(data => {})
      }, 1000);

    }  

    componentDidMount(){  
      this._isMounted = true;
       if (this._isMounted) {
        this.trigger()
      }
    }

    componentWillUnmount(){
      this._isMounted = false;
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

        if(loadValue === 0)
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
 
        if(tempValue !== clock)
        {
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

      if(loadValue2 === 0)
      {
          for (var i = res.data.length - 20; i < res.data.length; i++) {
            presentState.people=res.data
            mainChart.datasets[1].data.push(presentState.people);
            mainChartOpts.scales.yAxes[1].ticks.min = parseInt(Math.min.apply(Math, mainChart.datasets[1].data) - 1);
            mainChartOpts.scales.yAxes[1].ticks.max = parseInt(Math.max.apply(Math, mainChart.datasets[1].data) + 1);
          }
          loadValue2 = 1;
      }

        mainChart.datasets[1].data.push(presentState.people);
        if(mainChart.datasets[1].data.length > 20)
        {
            mainChart.datasets[1].data.shift();
        }

        mainChartOpts.scales.yAxes[1].ticks.min = parseInt(Math.min.apply(Math, mainChart.datasets[1].data) - 1);
        mainChartOpts.scales.yAxes[1].ticks.max = parseInt(Math.max.apply(Math, mainChart.datasets[1].data) + 1);

      
        this.setState({
          ...presentState
      })

    }
  
    getChart = () => {

      if(this.state.radioSelected === 1){
      return(
      <div style={{ height: '400px', marginTop: '10px' }}>
        <Line data={mainChart} options={mainChartOpts} height={400} redraw/>
      </div>)
      }
       else if(this.state.radioSelected === 2){
        return(
          <div style={{ height: '400px' }}>
          <Doughnut data={barChart} options={barChartOpts} height={400} redraw/>
        </div>)
      } 
    }

    render(){
      if(getCookie('usertoken')){     
      return(
        <div style={{width: '100% !important',margin: 'auto',height: '100%',marginTop: '40px'}}>
            <div style={{left:'10px', right:'10px', display : 'flex' , padding : '30px', width : '100%', height: '100%'}}>
                <Col  xs="4" sm="3">
                    <SensorCards sensorHum = {this.state.sensorHum} sensorTemp = {this.state.sensorTemp}/>
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
        else{
          return <Redirect to='/login'/>;
      }
      
    }
}

export default  Dashboard