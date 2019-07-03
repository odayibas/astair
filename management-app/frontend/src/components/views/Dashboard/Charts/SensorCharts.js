import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';

const brandPrimary = getStyle('--primary')

// Card Chart 1
const cardChartData1 = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
    datasets: [
        {
          label: 'Region 2',
          backgroundColor: getColorbyHeat(),
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
    
     // Card Chart 2
  const cardChartData2 = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
   datasets: [
       {
         label: 'Region 2',
         backgroundColor: getColorbyHeat(),
         borderColor: 'rgba(255,255,255,.55)',
         data: [23, 24, 22, 23, 23]
       },
     ],
   };
   
  
   
   // Card Chart 3
   const cardChartData3 = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
   datasets: [
       {
         label: 'Region 2',
         backgroundColor: getColorbyHeat(),
         borderColor: 'rgba(255,255,255,.55)',
         data: [23, 24, 22, 23, 23]
       },
     ],
   };
   
   
   // Card Chart 4
   const cardChartData4 = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],    
   datasets: [
       {
         label: 'Region 2',
         backgroundColor: getColorbyHeat(),
         borderColor: 'rgba(255,255,255,.55)',
         data: [23, 24, 22, 23, 23]
       },
     ],
   };
   
    

   var temp1;
  function getColorbyHeat() {
  if( temp1>= "20.0"){
   var letters = '0123456789ABCDEF'.split('');
   var color = '#';
   for (var i = 0; i < 6; i++ ) {
     color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
export default class SensorCharts extends Component {
  constructor(props){
    super(props)
  }

   temp1 = this.props.sensorTemp1;

  render() {
    return (
      <div>
      <Row>
      <Card className="text-white bg-primary">
      <CardBody className="pb-0">
        <div className="text-value">{this.props.sensorTemp1} °C</div>
        <div>Sensor 1</div>
      </CardBody>
      <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
        <Line data={cardChartData1} options={cardChartOpts1} height={70} />
      </div>
    </Card>
    </Row>
    <br></br>
    <Row>
     <Card className="text-white bg-primary">
      <CardBody className="pb-0">
        <div className="text-value">{this.props.sensorTemp2} °C		</div>
        <div>Sensor 2</div>
      </CardBody>
      <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
        <Line data={cardChartData1} options={cardChartOpts1} height={70} />
      </div>
    </Card>
    </Row>
    <br></br>
    <Row>
       <Card className="text-white bg-primary">
      <CardBody className="pb-0">
        <div className="text-value">{this.props.sensorTemp3} °C</div>
        <div>Sensor 3</div>
      </CardBody>
      <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
        <Line data={cardChartData3} options={cardChartOpts1} height={70} />
      </div>
    </Card>
    </Row>
    <br></br>
     <Row>
      <Card className="text-white bg-primary">
      <CardBody className="pb-0">
        <div className="text-value">{this.props.sensorTemp4} °C</div>
        <div>Sensor 4</div>
      </CardBody>
      <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
        <Line data={cardChartData4} options={cardChartOpts1} height={70} />
      </div>
    </Card>
    </Row>
    </div>
    );
  }

}