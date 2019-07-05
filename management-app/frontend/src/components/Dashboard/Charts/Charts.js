
import React, {Component} from 'react'

import "./index.css"

class Charts extends Component{
    constructor(props){
        super(props)
        this.state ={
            radioSelected: 1
        }
        
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    }

    getChart = () => {
        if(this.state.radioSelected == 1){
          return(
          <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
            <Line data={mainChart} options={mainChartOpts} height={300} redraw/>
          </div>)
          }
          else{
            return(
              <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
              <Bar data={barChart} options={barChartOpts} height={300} redraw/>
            </div>)
          }
      }
      
      
      onRadioBtnClick(radioSelected) {
        this.setState({
          radioSelected: radioSelected,
        });
      }


    render(){
        return(
            <Row>
                <Col>
                <Card style={{background: 'transparent'}}>
                    <CardBody style={{background: 'transparent'}}>
                        <Row>
                            <Col sm="5">
                                <CardTitle className="mb-0">Average Temperatures</CardTitle>
                                <div className="small text-muted">

                                </div>
                            </Col>
                                <Col sm="7" className="d-none d-sm-inline-block">
                                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                                        <ButtonGroup className="mr-3" aria-label="First group">
                                            <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>INDOOR</Button>
                                            <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>SLACK</Button>                      
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                </Col>
                            </Row>
                            {this.getChart()}
                        </CardBody>
                </Card>
                </Col>
            </Row>
        )
    }
}



export default Charts
