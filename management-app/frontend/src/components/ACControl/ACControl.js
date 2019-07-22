import React, {Component} from 'react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Col,
  Progress,
  Row,
  Button
} from 'reactstrap';
import {get as getCookie } from 'es-cookie';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');

import Mode from './Mode'
import Temperature from './Temperature'

import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import {Redirect} from 'react-router-dom'
import axios from 'axios'

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND 


class ACControl extends Component{

    constructor(props) {
        super(props);
        this.state = {
            id : "",
            acNum : "",
            mode : {},
            fan_speed : "",
            temperature : {},
            active : "",
            message : "",
            isChecked: null,

          };
          
          this.onChange = this.onChange.bind(this);
         // this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);
        }

        componentWillMount () {
          this.setState( { isChecked: false } );
          }
    
        onChange = e => {
          this.setState({
            [e.target.name]: e.target.value
            })         
          }
    
          onClick = e => {
            this.setState({ id : e.target.value})         
            }
      handleChange () {
        this.setState( prevState => ({ 
          isChecked: !prevState.isChecked 
        }) , () => console.log(this.state.isChecked) );
        
        if(this.state.isChecked === false)
          this.setState({active: "ON"})
        else
          this.setState({active: "OFF"})      
        }
    
      handleSubmit(event) {

        var message1= this.state.id.concat( ","+ this.state.mode[0]+","+this.state.fan_speed+","+this.state.temperature[0]+","+this.state.active)

        this.setState({
         message: message1
        },()=>console.log(this.state.message))


        return axios.post(urlServer + '/api/mqtt/publish', {
          message : message1,
          retained: false,
          topic: "Astair/MODEL/AC"
        })
        .then(function (response) {
          console.log(response);

        })
        .catch(function (error) {
          console.log(error);

        });
      
      }

      render(){



        console.log(this.state)
        if(getCookie('admintoken')){     
        return (
            <div style ={{paddingTop : 20}}>
            <div className = "center" >   
            <Card>
            <CardBody >
              <div style = {{alignItems : "right"}}>
              <Row>
                <Button onClick={this.onClick} value = "1">1</Button>
                <Button onClick={this.onClick} value = "2">2</Button>
                <Button onClick={this.onClick} value = "3">3</Button>
                <Button onClick={this.onClick} value = "4">4</Button>
                </Row>     
              </div>
              <center><h4> MODE </h4></center>
              <Mode mode={this.state.mode}/>
              <Row style = {{paddingLeft : '20%'}}>
             
                <Col>
                <h4> TEMPERATURE </h4>
                <Temperature temperature = {this.state.temperature}/>
                </Col>
              <Col>
              <h4> ON/OFF </h4>
              <div>
                  <label>
                   <input ref="switch" checked={ this.state.isChecked } 
                   onChange={ this.handleChange } className="switch" type="checkbox" />
                    <div>
                      <div>
                      </div>
                    </div>
                  </label>
                </div>
              </Col>
              </Row>
             <Row>
             <div style = {{paddingLeft : '45%'}}>
             <Form >
              <FormGroup  >
                <FormLabel> FAN</FormLabel>
                  <h5>FAN</h5>
                  <FormControl name="fan_speed"  value={this.state.fan_speed} onChange={this.onChange} as="select">
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </FormControl>
              </FormGroup>
            </Form>
          </div>
          </Row>
          <Row>
          <Col></Col>
          <Col> 
            <div style = {{paddingLeft : '35%'}}>
              <Button onClick={this.handleSubmit.bind(this)}>
              Change
              </Button>
            </div>
          </Col>
          <Col></Col>
          </Row>
        </CardBody>
      </Card>  
    </div>
  </div>
  )}
    else{
      return <Redirect to='/login'/>;
    }
  }
 
}
export default ACControl

     