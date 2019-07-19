import React, {Component} from 'react'

import {
  Card,
  CardTitle,
  CardBody,
  Col,
  Progress,
  Row,
  Button
} from 'reactstrap';
import {get as getCookie } from 'es-cookie';

import { getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities'

import  AC from "@material-ui/icons/AcUnit";

import Icon from '@mdi/react'
import { mdiCloudOutline, mdiWeatherSunny,mdiFan,mdiFanOff } from '@mdi/js'
import Humidity from "@material-ui/icons/Opacity";

import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { Select } from '@material-ui/core';
import {Redirect} from 'react-router-dom'
import axios from 'axios'

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND 

class ACControl extends Component{

    constructor(props) {
        super(props);
        this.state = {
            id : "1",
            mode : "COOL",
            fan_speed : "LOW",
            temperature : "",
            active : "ON",
            message : ""
      };
    
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      onChange = e => {

        this.setState({
            [e.target.name]: e.target.value
          })
          if([e.target.name] === "temperature"){

            if(parseInt(e.target.value) < 10 || parseInt(e.target.value > 30)){
              alert("wrong input")
              
            }
          }
       
      }
  
    
      handleSubmit(event) {
        event.preventDefault()

        var message1= this.state.id.concat( ","+ this.state.mode+","+this.state.fan_speed+","+this.state.temperature+","+this.state.active)

        this.setState({
         message: message1
        },()=>console.log(this.state.message))


        return  axios.post(urlServer + '/api/mqtt/publish', {
          message : message1,
          qos: 0,
          retained: true,
          topic: "Astair/MODEL/AC"
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      
      }
    
      validateForm(){

      }



render(){
  if(getCookie('usertoken')){     
        return (
            <div style ={{paddingTop : 20}}>
            <div className = "center" >   
            <Card>
              <CardBody>
              <Form >
                  <FormGroup  >
                    <FormLabel>Region</FormLabel>
                    <h5>REGION</h5>
                      <FormControl name="id" value={this.state.id} onChange={this.onChange} as="select">                     
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>

                      </FormControl>
                  </FormGroup>
                  <FormGroup  >
                    <FormLabel> MODE</FormLabel>
                     <h5>MODE</h5>
                      <FormControl name="mode"  value={this.state.mode} onChange={this.onChange} as="select">
                        <option value="COOL">COOL</option>
                        <option value="FAN">FAN</option>
                        <option value="DRY">DRY</option>
                        <option value="HEAT">HEAT</option>
                        <option value="AUTO">AUTO</option>

                      </FormControl>
                  </FormGroup>
                  <FormGroup  >
                    <FormLabel> FAN</FormLabel>
                     <h5>FAN</h5>
                      <FormControl name="fan_speed"  value={this.state.fan_speed} onChange={this.onChange} as="select">
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                      </FormControl>
                  </FormGroup>
                  <FormGroup  >
                    <FormLabel> ON/OFF </FormLabel>
                     <h5>ON/OFF</h5>
                      <FormControl name="active"  value={this.state.active} onChange={this.onChange} as="select">
                        <option value="ON">ON</option>
                        <option value="OFF">OFF</option>
                      </FormControl>
                  </FormGroup>
                  <FormGroup  >
                    <FormLabel> TEMPERATURE</FormLabel>
                     <h5>TEMPERATURE</h5>
                      <input style = {{ width: "100%"}} placeholder = "Give a number between 16°C-30°C "type="text" name="temperature"  value={this.state.temperature} 
                      onChange={this.onChange} />
                  </FormGroup>
              </Form>
              <Button type = "submit" value ="Submit" onClick = {this.handleSubmit} >Submit
              </Button>
              </CardBody>
            </Card>  
          </div>
          {/*   <div>
            <Icon path={mdiCloudOutline}
              size={1}
              horizontal
            />
            <Icon path={mdiWeatherSunny}
              size={1}
              horizontal
            />
            <Icon path={mdiFan}
              size={1}
              horizontal
            />
            <Icon path={mdiFanOff}
              size={1}
              horizontal
            />
            <Humidity/>
            </div> */}
            </div>
          
          )

    }
    else{
      return <Redirect to='/login'/>;
    }
  }
  

}
export default ACControl