import React, {Component} from 'react'

import {
  Card,
  CardTitle,
  CardBody,
  Col,
  Progress,
  Row,
} from 'reactstrap';


import Cloud from "@material-ui/icons/Cloud";
import Office from "@material-ui/icons/BusinessCenter";

import Icon from '@mdi/react'
import {mdiHumanMaleFemale } from '@mdi/js'

class InfoCards extends Component{
    
  avgmodal() {
        var x =  (this.props.sensorTemp[1] +  this.props.sensorTemp[2] +  this.props.sensorTemp[3] + this.props.sensorTemp[4])/4
        x = x * 100   
        x = parseInt(x)
        var y = x/100
        return y
  }
  
  slack100(a) {
        var x =  (this.props.hot +  this.props.cold +  this.props.nice)
        a = a * 100   
        var y = (a / x) * 10
        y = parseInt(y) / 10
        return y
  }

render(){
    return(
        <Row className="text-center">
           <Col >
            <Card style={{padding : '65px'}} >
              <CardBody className="pb-0" icon>
               <Cloud/>
                <div   className="text-value"> <h4> OUTDOOR </h4>
                <h2> {this.props.temp} °C </h2>
                </div>
                </CardBody>
              </Card>
            </Col>
            <Col >
              <Card style={{padding : '65px'}} >
              <CardBody className="pb-0" icon>
               <Office/>
                  <div className="bg-transparent">
                  <h4> INDOOR </h4>
                  <h2>  {this.avgmodal()} °C </h2>               
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm={12} md className="mb-sm-2 mb-0">
              <Card style={{padding : '30px'}}>
                <CardTitle><h4>Slack</h4></CardTitle>
                <strong>Cold %{this.slack100(this.props.cold)}</strong>
              <Progress className="progress-xs mt-2" color="primary" value={this.slack100(this.props.cold)} />
              <strong>Nice %{this.slack100(this.props.nice)}</strong>
              <Progress className="progress-xs mt-2" color="success" value={this.slack100(this.props.nice)}/>

              <strong>Hot %{this.slack100(this.props.hot)}</strong>
              <Progress className="progress-xs mt-2" color="danger" value={this.slack100(this.props.hot)} />
            
              </Card>
            </Col>
             <Col >
             <Card style={{padding : '65px'}} >
            <CardBody className="pb-0">
            <Icon path={mdiHumanMaleFemale}
                  size={1}
                  horizontal/>
                <div className="text-value">
                    <h4>PEOPLE</h4></div>
                    <h2>{this.props.people}	</h2>
              </CardBody>           
            </Card>
            </Col>
          </Row>   
    )}
}

export default InfoCards