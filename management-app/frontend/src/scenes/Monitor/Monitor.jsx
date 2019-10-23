import React, { Component } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardHeader, Collapse } from "reactstrap";
import { get as getCookie } from "es-cookie";
import { Redirect } from "react-router-dom";
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
      timezone: null,
      visible: [false, false, false, false],
      border: [
        "4px dashed transparent",
        "4px dashed transparent",
        "4px dashed transparent",
        "4px dashed transparent"
      ]
    };
  }
  openModal(index) {
    let newArray = JSON.parse(JSON.stringify(this.state.visible));
    newArray[index] = true;
    this.setState({ visible: newArray });
  }
  closeModal(index) {
    let newArray = JSON.parse(JSON.stringify(this.state.visible));
    newArray[index] = false;
    this.setState({ visible: newArray });
  }



  componentDidMount() {
    console.log("monitor")
    this.props.onGetData().then(data => {
      this.setState({
        temp: data.temp,
        currentWeather: data.currentWeather,
        dailySummary: data.dailySummary,
        dew: data.dew,
        humidity: data.humidity,
        visibility: data.visibility,
        timezone: data.timezone,
      })
    })
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state
    });
  }

  mouseEnter = i => {
    console.log("mouse enter");
    let newArr = [];
    newArr = this.state.border;
    newArr[i] = "4px dashed #20a8d8";
    this.setState({ border: newArr });
  };

  mouseLeave = i => {
    console.log("mouse leave");
    let newArr = [];
    newArr = this.state.border;
    newArr[i] = "4px dashed transparent";
    this.setState({ border: newArr });
  };

  /* getRegion(){
  return(
    acArr.map((ac, i) => (
        <Col style={{margin: 20, marginTop : "-20px"}}>
          <Card>
            <CardBody className="pb-0">
                <div> <h3 style = {{textAlign : 'center'}}> <AC/> REGION {i+1} AC INFO </h3></div>
                <div><h4 style = {{textAlign : 'center'}}>Degree: {this.props.ac[i].ac_degree} °C</h4> </div>
                <div><h4 style = {{textAlign : 'center'}}> Mode:{this.props.ac[i].ac_mode}  </h4> </div>
                <div><h4 style = {{textAlign : 'center'}}> Fan Speed:{this.props.ac[i].ac_fan_speed}  </h4> </div>
                {this.OnOff(this.props.ac[i].active)}
            </CardBody> 
            <div className="chart-wrapper mx-3" style={{ height: '40px' }}>
            </div>
          </Card>
       </Col>
)))
} */

  render() {
    if (getCookie("usertoken") === "1" || getCookie("usertoken") === "2") {
      return (
        <div>
          <div>
            <div id="accordion">
              <Card className="mb-0">
                <CardHeader id="headingOne">
                  <Button
                    block
                    color="link"
                    className="m-0 p-0"
                    onClick={() => this.toggleAccordion(0)}
                    aria-expanded={this.state.accordion[0]}
                    aria-controls="collapseOne"
                  >
                    <center>
                      <h5 className="m-0 p-0">
                        Click here for outdoor weather conditions
                      </h5>
                    </center>
                  </Button>
                </CardHeader>
                <Collapse
                  isOpen={this.state.accordion[0]}
                  data-parent="#accordion"
                  id="collapseOne"
                  aria-labelledby="headingOne"
                >
                  <CardBody>
                    <div class="card-body text-center card">
                      <CardHeader className="bg-white">
                        TODAY WEATHER IS HERE FOR YOU
                      </CardHeader>
                      <CardBody>
                        <div>
                          Temperature: {this.state.temp} °C
                          <div>
                            Current Weather: {this.state.currentWeather}
                          </div>
                          <div>Daily Summary: {this.state.dailySummary}</div>
                          <div>Dew Point: {this.state.dew}</div>
                          <div>Humidity: {this.state.humidity}</div>
                          <div>Visibility: {this.state.visibility}</div>
                          <div>TimeZone: {this.state.timezone}</div>
                        </div>
                      </CardBody>
                    </div>
                  </CardBody>
                </Collapse>
              </Card>
            </div>
          </div>
          {/*       <div style={{ padding: 40 }}>
          <center>
            <h4 className="m-0 p-0">
              {" "}
              Click your region on the plan or click the button of your region
              to view A/C controller !{" "}
            </h4>
          </center>
        </div> */}
          <center>
            <div className="monitor">
              <img height={1000} src="/assets/klima_konum.png" alt={"logo"} />
            </div>
            {/* <Row>
            <Col
              className="text-dark bg-transparent"
              style={{ paddingBottom: "300px", border: this.state.border[0] }}
              onMouseEnter={this.mouseEnter(0)}
              onMouseLeave={this.mouseLeave(0)}
              onClick={() => this.openModal(0)}
            />
            <Col
              className="text-dark bg-transparent"
              style={{ paddingBottom: "300px", border: this.state.border[1] }}
              onMouseEnter={this.mouseEnter(1)}
              onMouseLeave={this.mouseLeave(1)}
              onClick={() => this.openModal(1)}
            />
          </Row>
          <Row>
            <Col
              className="text-dark  bg-transparent"
              style={{ paddingTop: "300px", border: this.state.border[2] }}
              onMouseEnter={this.mouseEnter(2)}
              onMouseLeave={this.mouseLeave(2)}
              onClick={() => this.openModal(2)}
            />
            <Col
              className="text-dark bg-transparent"
              style={{ paddingTop: "300px", border: this.state.border[3] }}
              onMouseEnter={this.mouseEnter(3)}
              onMouseLeave={this.mouseLeave(3)}
              onClick={() => this.openModal(3)}
            />
          </Row> */}
          </center>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStatetoProps = (state) => {
  return { data: state.data, error: state.error }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetData: () => dispatch(getData())

  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Monitor);
