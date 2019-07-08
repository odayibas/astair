
import React, {Component} from 'react'

class Charts extends Component{
    constructor(props){
        super(props)

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
                        </CardBody>
                </Card>
                </Col>
            </Row>
        )
    }
}



export default Charts
