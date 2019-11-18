import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Collapse } from "reactstrap";
import { get as getCookie } from "es-cookie";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { getData } from "../../services/session/Monitor/actions";

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
    let newArr = [];
    newArr = this.state.border;
    newArr[i] = "4px dashed #20a8d8";
    this.setState({ border: newArr });
  };

  mouseLeave = i => {
    let newArr = [];
    newArr = this.state.border;
    newArr[i] = "4px dashed transparent";
    this.setState({ border: newArr });
  };

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
          <center>
            <div className="monitor">
              <img height={1000} src="/assets/klima_konum.png" alt={"logo"} />
            </div>
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
