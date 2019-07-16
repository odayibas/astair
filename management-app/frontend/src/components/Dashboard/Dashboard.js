import React, { Component } from 'react';
// import jwt_decode from 'jwt-decode'
import axios from 'axios'
import {Col} from 'reactstrap';

import {get as getCookie} from 'es-cookie'
import {Redirect} from 'react-router-dom'

import InfoCards from './InfoCards/InfoCards'
import Charts from './Charts/Charts'
import SensorCards from './SensorCards/SensorCards';

import {remove as removeCookie } from 'es-cookie';



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
          sensor : [{}],
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
          hot: null,
          nice : null,
          cold : null,
          people : null
      }  
      this.callback = this.callback.bind(this);
      this.callback2 = this.callback2.bind(this);
      this.callbackAC = this.callbackAC.bind(this);


    
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

      }, 5000);

      window.onpopstate  = (e) => {
        removeCookie('usertoken')
        this.props.history.push('/')

        }
  /*     window.addEventListener("beforeunload", (ev) => 
        {  
        ev.preventDefault();
       removeCookie('usertoken');
        }); */
    }

    callback(cold, nice, hot){
      this.setState(
        {
          cold: cold,
          hot : hot,
          nice: nice,
       }
      )
    }

    callback2(people){
      this.setState({
          people : people
       })
    }

    callbackAC(ac){
      this.setState({
        ac : ac
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
                    <Charts sensorTemp = {this.state.sensorTemp} sensorHum = {this.state.sensorHum}  
                        callback ={this.callback} callback2 = {this.callback2}  ac = {this.state.ac}/>
                      <div style={{paddingTop :'30px'}}>
                      <InfoCards temp = {this.state.temp} sensorTemp = {this.state.sensorTemp} 
                      hot = {this.state.hot} nice={this.state.nice} cold = {this.state.cold} 
                      people = {this.state.people} />
                    </div>
                  </div>
                 
                </Col>
              </div>
              <div style={{height : '10%', display : 'flex',justifyContent : 'center', alignItems : 'center'}}>
              <img height={300} src="/assets/twitter_header_photo_1.png"/>
             </div>
       
          </div>
       
        )
      }
      else{
        return <Redirect to='/'/>;
      }
    }
    
}

export default Dashboard