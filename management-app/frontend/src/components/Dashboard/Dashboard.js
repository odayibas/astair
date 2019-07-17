import React, { Component } from 'react';
// import jwt_decode from 'jwt-decode'
import axios from 'axios'
import {Col} from 'reactstrap';

import {get as getCookie} from 'es-cookie'
import {Redirect} from 'react-router-dom'

import InfoCards from './InfoCards/InfoCards'
import Charts from './Charts/Charts'
import SensorCards from './SensorCards/SensorCards';
import ACInfo from './ACInfo/ACInfo';

import {remove as removeCookie } from 'es-cookie';

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND 


class Dashboard extends Component{
    constructor(){
      super()
        this.state = {

          temp: null,
          currentWeather: null,
          dailySummary: null,
          dew: null,
          humidity: null,
          visibility: null,
          timezone : null,
          /* sensor : [{
            temp :"",
            hum : ""

          },
        ], */
        sensorTemp: {},
        sensorHum : {},
        ac : [
          {
            ac_id : "",
            ac_degree : "",
            ac_mode : "",
            ac_fan_speed : "",
            active : "",
          }
        ],
          avgsensor : null,
          avgac : null,
          hot: null,
          nice : null,
          cold : null,
          people : null
      }  
      this.callbackSlack = this.callbackSlack.bind(this);
      this.callbackAC = this.callbackAC.bind(this);
      this.callbackPeople = this.callbackPeople.bind(this);

    
  }


    getACAverage = () => {
      return axios.get(urlServer + "/AC/get-avg-degree")
      .then((res) => {
        this.state.avgac = res.data
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
      this.setState({
          ...presentState
      })
  })

    }

    componentDidMount(){  

      let newTime = Date.now() - this.props.date;
      setInterval(() => { 
        this.getOutdoorData().then(data => {})
        this.getACAverage().then(data => {})


      }, 5000);

      window.onpopstate  = (e) => {
        removeCookie('usertoken')
        this.props.history.push('/')

        }
    }

    callbackSlack(cold, nice, hot){
      this.setState(
        {
          cold : cold,
          nice : nice,
          hot : hot
        })
       
    }

    callbackAC(ac){
      this.setState({
        ac : ac
     })
    }
    callbackPeople(people){
      this.setState({
        people : people
     })
    }
 
 
    render(){
      if(getCookie('usertoken')){     
        return(
          <div style={{width: '100% !important',margin: 'auto',height: '100%',marginTop: '40px'}}>
              <div style={{left:'10px', right:'10px', display : 'flex' , padding : '30px', width : '100%', height: '90%'}}>
               
                  <Col  xs="4" sm="3">
                    <SensorCards sensorHum = {this.state.sensorHum} sensorTemp = {this.state.sensorTemp} 
                     callbackAC ={this.callbackAC} ac = {this.state.ac}/>
                  </Col>
                  <Col>
                    <div style={{paddingTop :'30px'}}>
                    <Charts sensorTemp = {this.state.sensorTemp} sensorHum = {this.state.sensorHum}  temp = {this.state.temp}
                        callbackSlack ={this.callbackSlack} callbackPeople= {this.callbackPeople}  ac = {this.state.ac}/>
                      <div style={{paddingTop :'30px'}}>
                      <InfoCards temp = {this.state.temp} /* avgsensor = {this.state.avgsensor} */ sensorTemp = {this.state.sensorTemp} 
                      hot = {this.state.hot} nice={this.state.nice} cold = {this.state.cold} 
                      people = {this.state.people} />
                    </div>
                    <div style={{paddingTop :'30px'}}>
                      <ACInfo ac = {this.state.ac} />
                    </div>
                  </div>
                 
                </Col>
              </div>
              <div style={{height : '10%', display : 'flex',justifyContent : 'center', alignItems : 'center'}}>
            <img height={200} src="/assets/Logo-Astair-w.png"/>
           </div>
        </div>
     
       
        )
      }
      else{
        return <Redirect to='/login'/>;
      }
    }
    
}

export default Dashboard