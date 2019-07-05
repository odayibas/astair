import React, {Component} from 'react'

import {
  Card,
  CardBody,
  Col,
  Progress,
  Row,
} from 'reactstrap';


class InfoCards extends Component{
    constructor(props){
        super(props)
    }

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
        var y = a / x
        return y
      }
render(){
    return(
        <Row className="text-center">
            <Col sm={12} md className="mb-sm-2 mb-0">
              <strong>Hot</strong>
              <Progress className="progress-xs mt-2" color="danger" value={this.slack100(this.props.hot)} />
              <strong>Nice</strong>
              <Progress className="progress-xs mt-2" color="success" value={this.slack100(this.props.nice)}/>
              <strong>Cold</strong>
              <Progress className="progress-xs mt-2" color="primary" value={this.slack100(this.props.cold)} />
            </Col>
             <Col >
              <Card style={{padding : '41px'}}>
                <CardBody className="pb-0">  
                <div   className="text-value"> <h4> OUTDOOR </h4>
                <h2> {this.props.temp} °C </h2>
                </div>
                </CardBody>
              </Card>
            </Col>
            <Col >
            <Card>
              <CardBody className="pb-0">
                <div className="text-value">
                    <h4>People Count</h4></div>
                    <h2>{this.props.people}	</h2>
                <Row>
                  <Col>
                <div className="text-value">
                    <h4>Male</h4></div>
                    <h2> {this.props.male}	</h2>
                </Col>
                <Col>
                <div className="text-value">
                    <h4>Female</h4></div>
                    <h2>{this.props.female}	</h2>
                </Col>
                </Row>
              </CardBody>
           
            </Card>
            </Col>
            <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
              <Card style={{padding : '41px'}}>
                <CardBody className="pb-0">  
                  <div className="bg-transparent">
                  <h4> INDOOR </h4>
                  <h2>  {this.avgmodal()} °C </h2>               
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>   
    )}
}

export default InfoCards