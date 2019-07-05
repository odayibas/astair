import React, {Component} from 'react'

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


class InfoCards extends Component{
    constructor(props){
        super(props)
        this.state = {
          selected : 1
      }  
  
    }

    onRadioBtnClick(selected) {
      this.setState({
        selected: selected,
      });
      this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
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

      getPeople(){

        if(this.state.selected == 1){
       return( <CardBody className="pb-0">
          <div className="text-value">   
            <h4>People</h4>
            <h2>{this.props.people}	</h2>
          </div>
          </CardBody>)
        }
        else if(this.state.selected == 2){
          return(<CardBody className="pb-0">
            <div className="text-value">   
             <h4>Male</h4>
               <h2>{this.props.male}</h2>
            </div>
            </CardBody>)
          }
          else if(this.state.selected == 3){
            return(
            <CardBody className="pb-0">
            <div className="text-value">   
             <h4>Female</h4>
               <h2>{this.props.female}</h2>
            </div>
            </CardBody>)
      
          }
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
              <Card style={{padding : '20px'}}>
                <CardBody className="pb-0">  
                <div className="text-value"> <h4> OUTDOOR </h4>
                <h2> {this.props.temp} °C </h2>
                </div>
                </CardBody>
              </Card>
            </Col>
            <Col >
            <Card>
              <CardTitle>
              <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                      <ButtonGroup aria-label="First group">
                      <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.selected === 1}>People</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.selected === 2}>Male</Button>          
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.selected === 3}>Female</Button>                              
                        </ButtonGroup>
                    </ButtonToolbar>
              </CardTitle>
              {this.getPeople()}
            
            </Card>
            </Col>
            <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
              <Card style={{padding :'20px'}}>
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