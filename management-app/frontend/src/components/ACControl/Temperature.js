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
  
  
  import Icon from '@mdi/react'
  import { mdiThermometerPlus , mdiThermometerMinus} from '@mdi/js'
  
const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND 


class Temperature extends Component{

    constructor(props) {
        super(props);
        this.state = {
            clicks:16,
            show:true
      };
    
      }
    
      IncrementItem = () => {
        
        if(this.state.clicks < 30)
        this.setState({ clicks: this.state.clicks + 1 });
        this.props.temperature[0] = this.state.clicks
      
      }
      DecreaseItem = () => {
        if(this.state.clicks > 16)
        this.setState({ clicks: this.state.clicks - 1 });
        this.props.temperature[0] = this.state.clicks

       
      }
      ToggleClick = () => {
        this.setState({ show: !this.state.show });
      }
    
render(){
        return (
            <div >
                    <Col></Col>
                    <Col>
                    <Row>
                <Button  style = {{backgroundColor : 'transparent'}} onClick={this.DecreaseItem}>
                    <Icon path={mdiThermometerMinus}
                    size={1.5}
                    horizontal/></Button>
                    <div style= {{paddingLeft : 15, paddingRight : 15}}>
                    { this.state.show ? <h1>{ this.state.clicks }</h1> : '' }
                    </div>
                    
                    <Button style = {{backgroundColor : 'transparent'}} onClick={this.IncrementItem}>
                    <Icon path={mdiThermometerPlus}
                    size={1.5}
                    horizontal/></Button>
                    </Row>
                    </Col>
                    <Col></Col>

          </div>
          
          )
        }

}
export default Temperature

