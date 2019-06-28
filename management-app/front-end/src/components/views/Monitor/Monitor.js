import React, { Component } from 'react'
import mySvg from './office-layout.svg'
import axios from 'axios'
import SplitterLayout from 'react-splitter-layout'
import 'react-splitter-layout/lib/index.css'
import { Badge, CardFooter,Button, Card, CardBody, CardHeader, Col, Collapse, Fade,  Row} from 'reactstrap'
import { AppSwitch } from '@coreui/react'
import Modal from 'react-awesome-modal';
import jwt_decode from 'jwt-decode'
import './Monitor.css'

class Monitor extends Component {

  constructor(props) {
  super(props);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.state = {
    collapse: false,
    accordion: [false, false, false],
    temp: null,
    currentWeather: null,
    dailySummary: null,
    dew: null,
    humidity: null,
    visibility: null,
    timezone : null,
    visible : false,
    visible2 : false,
    visible3 : false,
    visible4 : false,
    first_name : '',
    last_name : '',
    email : '',
    border: '4px dashed transparent',
    border2: '4px dashed transparent',
    border3: '4px dashed transparent',
    border4: '4px dashed transparent'

    }
  }
  getData = async() => {

    const url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/eda3e07c6d1ebeb49dd8a4353a0666a9/39.925533,32.866287?units=si";
    return axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': true,
      },
    })
    .then((res) => {
      let presentState = {...this.state};
      presentState.temp = res.data.currently.apparentTemperature;
      presentState.currentWeather = res.data.currently.summary;
      presentState.dailySummary = res.data.hourly.summary;
      presentState.dew = res.data.currently.dewPoint;
      presentState.humidity = res.data.currently.humidity;
      presentState.visibility = res.data.currently.visibility;
      presentState.timezone = res.data.timezone;


      this.setState({
          ...presentState
      })
  })
 }


  componentDidMount(){
/*    const token =  localStorage.usertoken
    const decoded = jwt_decode(token);
    this.setState({
    first_name : decoded.first_name,
    last_name : decoded.last_name,
    email : decoded.email
})*/
     this.getData().then(data => {
    })
  }

  openModal() {
    this.getData().then(data => {
    })
    this.setState({
        visible : true
    });
  }

  closeModal() {
    this.setState({
        visible : false
    });
  }
  
  openModal2() {
    this.setState({
        visible2 : true
    });
  }

  closeModal2() {
    this.setState({
        visible2: false
    });
  }

  openModal3() {
  this.setState({
      visible3 : true
  });
  }

  closeModal3() {
  this.setState({
      visible3: false
  });
  }

  openModal4() {
  this.setState({
      visible4 : true
  });
  }

  closeModal4() {
  this.setState({
      visible4: false
  });
  }

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }


mouseEnter= () => {
  console.log('mouse enter')
  this.setState({border : '4px dashed #63c2de'})

}
mouseEnter2= () => {
  console.log('mouse enter')
  this.setState({border2 : '4px dashed #20a8d8'})

}
mouseEnter3= () => {
  console.log('mouse enter')
  this.setState({border3 : '4px dashed #ffc107'})

}
mouseEnter4= () => {
  console.log('mouse enter')
  this.setState({border4 : '4px dashed #f86c6b'})

}
mouseLeave = () => {
  console.log('mouse leave')
  this.setState({border : '4px dashed transparent'})

}
mouseLeave2 = () => {
  console.log('mouse leave')
  this.setState({border2 : '4px dashed transparent'})

}
mouseLeave3 = () => {
  console.log('mouse leave')
  this.setState({border3 : '4px dashed transparent'})

}
mouseLeave4 = () => {
  console.log('mouse leave')
  this.setState({border4 : '4px dashed transparent'})

}

render() {

 var sectionStyle = {
  width: "880px",
  height: "620px",
  backgroundPosition: "center bottom",
  backgroundImage: "url(" + mySvg + ")"


};
    return (
      <div >
        <div>     
             <div style= {{paddingBottom: '20px',paddingTop: '20px'}} >
               <center> <h2 class="font-italic">MONITOR YOUR WORKSPACE</h2></center>
               </div>
              <div>
                <div id="accordion">
                  <Card className="mb-0">
                    <CardHeader id="headingOne">
                      <Button block color="link" className="m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                        <center><h5 className="m-0 p-0">Click here for outdoor weather conditions</h5></center>
                      </Button>
                    </CardHeader>
                    <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                      <CardBody>
                        <Card>
                          <div class="card-body text-center card">
                          <CardHeader className ="bg-white">TODAY WEATHER IS HERE FOR YOU
                          </CardHeader>
                          <CardBody>
                            <div>Temperature: {this.state.temp} °C
                            <div>Current Weather: {this.state.currentWeather}</div>
                            <div>Daily Summary: {this.state.dailySummary}</div>
                            <div>Dew Point: {this.state.dew}</div>
                            <div>Humidity: {this.state.humidity}</div>
                            <div>Visibility: {this.state.visibility}</div>
                            <div>TimeZone: {this.state.timezone}</div>
                            </div>
                            </CardBody>
                            </div>
                        </Card>
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
            </div>
            <div style={{paddingBottom: '20px', paddingTop: '20px'}}><center>
              <h4 className="m-0 p-0"> Click your region on the plan or click the button of 
            your region to view  A/C controller ! </h4></center></div>
 
               <Row style= {{paddingBottom: '100px', paddingTop: '20px'}}>
              <Col>
              
              <center><section>
                <div>
                <button class="btn-info" onMouseEnter={this.mouseEnter}  onMouseLeave={this.mouseLeave}  onClick={() => this.openModal()}>Region 1</button> 
                </div>
                <Modal visible={this.state.visible} width="450" height="350" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                    <Card>
                          <div class="card-body text-center card">
                          <CardHeader className ="bg-white">TODAY WEATHER IS HERE FOR YOU
                          </CardHeader>
                          <CardBody>
                            <div>Temperature: {this.state.temp} °C
                            <div>Current Weather: {this.state.currentWeather}</div>
                            <div>Daily Summary: {this.state.dailySummary}</div>
                            <div>Dew Point: {this.state.dew}</div>
                            <div>Humidity: {this.state.humidity}</div>
                            <div>Visibility: {this.state.visibility}</div>
                            <div>TimeZone: {this.state.timezone}</div>
                            </div>
                            </CardBody>
                            </div>
                        <div>
                          <button class="btn btn-outline-info btn-block"
                        href="javascript:void(0);" onClick={() => this.closeModal()}>Close</button>
                        </div>
                        </Card>
                    </div>
                </Modal>
            </section> </center>
            </Col>
            <Col>
            <center><section>
                <div>
                <button class="btn-primary" onMouseEnter={this.mouseEnter2}  onMouseLeave={this.mouseLeave2} onClick={() => this.openModal2()}>Region 2</button> 
                </div>
                <Modal visible={this.state.visible2} width="450" height="350" effect="fadeInUp" onClickAway={() => this.closeModal2()}>
                    <div>
                    <Card>
                          <div class="card-body text-center card">
                          <CardHeader className ="bg-white">TODAY WEATHER IS HERE FOR YOU
                          </CardHeader>
                          <CardBody>
                            <div>Temperature: {this.state.temp} °C
                            <div>Current Weather: {this.state.currentWeather}</div>
                            <div>Daily Summary: {this.state.dailySummary}</div>
                            <div>Dew Point: {this.state.dew}</div>
                            <div>Humidity: {this.state.humidity}</div>
                            <div>Visibility: {this.state.visibility}</div>
                            <div>TimeZone: {this.state.timezone}</div>
                            </div>
                            </CardBody>
                            </div>
                        <div>
                          <button class="btn btn-outline-primary btn-block"
                        href="javascript:void(0);" onClick={() => this.closeModal2()}>Close</button>
                        </div>
                        </Card>
                    </div>
                </Modal>
            </section> </center>
            </Col>
            <Col>
            <center><section>
                <div>
                <button class="btn-warning"  onMouseEnter={this.mouseEnter3}  onMouseLeave={this.mouseLeave3} onClick={() => this.openModal3()}>Region 3</button> 
                </div>
                <Modal visible={this.state.visible3} width="450" height="350" effect="fadeInUp" onClickAway={() => this.closeModal3()}>
                    <div>
                    <Card>
                          <div class="card-body text-center card">
                          <CardHeader className ="bg-white">TODAY WEATHER IS HERE FOR YOU
                          </CardHeader>
                          <CardBody>
                            <div>Temperature: {this.state.temp} °C
                            <div>Current Weather: {this.state.currentWeather}</div>
                            <div>Daily Summary: {this.state.dailySummary}</div>
                            <div>Dew Point: {this.state.dew}</div>
                            <div>Humidity: {this.state.humidity}</div>
                            <div>Visibility: {this.state.visibility}</div>
                            <div>TimeZone: {this.state.timezone}</div>
                            </div>
                            </CardBody>
                            </div>
                        <div>
                          <button class="btn btn-outline-warning btn-block"
                        href="javascript:void(0);" onClick={() => this.closeModal3()}>Close</button>
                        </div>
                        </Card>
                    </div>
                </Modal>
            </section> </center>
            </Col>
            <Col>
            <center><section>
                <div>
                <button class="btn-danger" onMouseEnter={this.mouseEnter4}  onMouseLeave={this.mouseLeave4} onClick={() => this.openModal4()}>Region 4</button> 
                </div>
                <Modal visible={this.state.visible4} width="450" height="350" effect="fadeInUp" onClickAway={() => this.closeModal4()}>
                    <div>
                    <Card>
                          <div class="card-body text-center card">
                          <CardHeader className ="bg-white">TODAY WEATHER IS HERE FOR YOU
                          </CardHeader>
                          <CardBody>
                            <div>Temperature: {this.state.temp} °C
                            <div>Current Weather: {this.state.currentWeather}</div>
                            <div>Daily Summary: {this.state.dailySummary}</div>
                            <div>Dew Point: {this.state.dew}</div>
                            <div>Humidity: {this.state.humidity}</div>
                            <div>Visibility: {this.state.visibility}</div>
                            <div>TimeZone: {this.state.timezone}</div>
                            </div>
                            </CardBody>
                            </div>
                        <div>
                          <button class="btn btn-outline-danger btn-block"
                        href="javascript:void(0);" onClick={() => this.closeModal4()}>Close</button>
                        </div>
                        </Card>
                    </div>
                </Modal>
            </section> </center>
            </Col>
            </Row>            
            </div>
          <center><section style={ sectionStyle }>
            <Row>
              <Col className="text-dark bg-transparent" style= {{paddingBottom: '300px', border : this.state.border}} onMouseEnter={this.mouseEnter}  onMouseLeave={this.mouseLeave}  onClick={() => this.openModal()}>       
              </Col>
              <Col className="text-dark bg-transparent" style= {{paddingBottom: '300px', border : this.state.border2}} onMouseEnter={this.mouseEnter2}  onMouseLeave={this.mouseLeave2} onClick={() => this.openModal2()}>
              </Col>
              </Row>  
            <Row>
              <Col className="text-dark  bg-transparent" style= {{paddingTop: '300px', border : this.state.border3}} onMouseEnter={this.mouseEnter3}  onMouseLeave={this.mouseLeave3} onClick={() => this.openModal3()}>                               
              </Col>
              <Col className="text-dark bg-transparent" style= {{paddingTop: '300px', border : this.state.border4}} onMouseEnter={this.mouseEnter4}  onMouseLeave={this.mouseLeave4} onClick={() => this.openModal4()}>
              </Col>
            </Row>
          </section> </center>
        </div>
    );
  }
}

export default Monitor;
