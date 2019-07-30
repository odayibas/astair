
import React, {Component} from 'react'
import {CardHeader,Col,Row} from 'reactstrap'

import Icon from '@mdi/react'
import { mdiWaterOutline ,mdiAutorenew , mdiSnowflakeVariant, mdiWeatherSunny,mdiFan } from '@mdi/js'



class Mode extends Component{

    constructor(props) {
        super(props);
        this.state = {
          selected : 1,
          
      };
    
        this.radioSelect = this.radioSelect.bind(this);
      }
    
     radioSelect(selected) {
         var i = 0
        this.setState({
            selected: selected,

        })

        if(selected === 1){
            this.props.mode[i] = "COOL"   
        }
        
        else if(selected === 2){
            this.props.mode[i] = "HEAT"

        }
      
        else if(selected === 3){
            this.props.mode[i] = "FAN"

        }
      
        else if(selected === 4){
            this.props.mode[i] = "AUTO"

        }
        
        else{
            this.props.mode[i] = "DRY"

        }
    }

      changeColor(value){
        console.log(value)
        if(this.props.mode[0] === value)
        return 'rgba(238, 238, 238, 1)'
      }
      render(){
        return (
            <CardHeader>
              <div style = {{padding : 20}}>
                <Row>
                <Col value = "COOL" style = {{backgroundColor : this.changeColor("COOL"), paddingLeft : '10%'}} 
                onClick={() => this.radioSelect(1)} active={this.state.radioSelected === 1} 
                ><h3>COOL</h3>
                <Icon path={mdiSnowflakeVariant}
                  size={2}
                  horizontal/>
                </Col>
                <Col value = "HEAT" style = {{backgroundColor : this.changeColor("HEAT")}}
                onClick={() => this.radioSelect(2)} active={this.state.radioSelected === 2}
                ><h3>HEAT</h3>
                <Icon path={mdiWeatherSunny}
                  size={2}
                  horizontal/>
                </Col>
                <Col value = "FAN" style = {{backgroundColor : this.changeColor("FAN")}}
                onClick={() => this.radioSelect(3)} active={this.state.radioSelected === 3} 
                ><h3>FAN</h3>
                <Icon path={mdiFan}
                  size={2}
                  horizontal/>
                </Col>
                <Col value = "AUTO" style = {{backgroundColor : this.changeColor("AUTO")}}
                onClick={() => this.radioSelect(4)} active={this.state.radioSelected === 4} 
                ><h3>AUTO</h3>
                <Icon path={mdiAutorenew}
                  size={2}
                  horizontal/>
                </Col>
                <Col value = "DRY" style = {{backgroundColor : this.changeColor("DRY")}}
                onClick={() => this.radioSelect(5)} active={this.state.radioSelected === 5} 
                ><h3>DRY</h3>
                <Icon path={mdiWaterOutline}
                  size={2}
                  horizontal/>
                </Col>
                </Row>     
            </div>
              </CardHeader>

          )
        }
    }
export default Mode


              