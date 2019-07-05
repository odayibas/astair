import React, {Component} from 'react'

import {Line,Bar } from 'react-chartjs-2';
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
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const brandPrimary = getStyle('--primary')

let orange = 'rgba(214, 69, 65, 1)';
let red = 'rgba(252, 214, 112, 1)';


// Card Chart 1
const cardChartData1 = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
    datasets: [
        {
          label: 'Region 2',
          backgroundColor: brandPrimary,
          borderColor: 'rgba(255,255,255,.55)',
          data: [23, 24, 22, 23, 23]
        },
      ],
    };
  
  
  
    const cardChartOpts1 = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'transparent',
            },
            ticks: {
              fontSize: 2,
              fontColor: 'transparent',
            },
    
          }],
        yAxes: [
          {
            display: false,
            ticks: {
              display: false,
              min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
              max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
            },
          }],
      },
      elements: {
        line: {
          borderWidth: 1,
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4,
        },
      }
    }
    
    
   
function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) {
        factor = 0.5;
    }
    let result = color1.slice();
    let color = 'rgb(';
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
        color += result[i]
        color += i != 2 ? ',' : '';
    }
    color += ')';
    return color;
};

function interpolateColors(color1, color2, steps) {
    var stepFactor = 1 / ((steps.length == 1 ? 2 : steps.length)- 1),
        interpolatedColorArray = [];
        
    let newArr = [];
  
    color1 = color1.match(/\d+/g).map(Number);
    color2 = color2.match(/\d+/g).map(Number);

    for (var i = 0; i < steps.length; i++) {
        newArr.push({
          region:steps[i][1],
          temp : steps[i][0],  
          color : interpolateColor(color1, color2, stepFactor * i)
        })
    }
    return newArr;
}


class SensorCards extends Component{
    constructor(props){
        super(props)
    }


getSensors = (sensorArr) => {
    return sensorArr.sort((sensor, sensor2) => (sensor.region - sensor2.region)).map((sensor, i) => (
    <Row style={{marginBottom : 20,  paddingLeft : '20px'}}>
        <Card style={{background: sensor.color}}>
            <CardBody className="pb-0">
            <div className="text-value">{sensor.temp}°C</div>
            <div>INDOOR {i+1}</div>
            </CardBody> 
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            <Line data={ 
            {labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
             datasets: [
               {
                label: `Region ${i}`,
                backgroundColor: sensor.color,
                borderColor: 'rgba(255,255,255,.55)',
                data: [23, 24, 22, 23, 23]
              },
            ],}}options={cardChartOpts1} height={70} />
            </div>
        </Card>
    </Row>))}

render(){     

    const sensorArr = interpolateColors(red, orange,[
        [this.props.sensorTemp[1],1],
        [this.props.sensorTemp[2],2],
        [this.props.sensorTemp[3],3],
        [this.props.sensorTemp[4],4]
      ].sort((sensor, sensor2) => (sensor[0] - sensor2[0])))
    
      return(
          <div>
          {this.getSensors(sensorArr)}
          </div>

            )
        }
}



export default SensorCards