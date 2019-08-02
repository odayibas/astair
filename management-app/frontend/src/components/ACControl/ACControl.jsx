import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { get as getCookie } from "es-cookie";
import { Redirect } from "react-router-dom";
import axios from "axios";

import FanSpeed from "./FanSpeed";
import Temperature from "./Temperature";
import Mode from "./Mode";

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;
const urlArr = Array.from(
  Array(parseInt(process.env.REACT_APP_LENGTH)).keys()
).map(x => (x + 1).toString());

class ACControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      mode: "",
      fan_speed: "",
      temperature: "",
      active: "",
      message: "",
      isChecked: null
    };
  }

  //makes request to get last records for all airconditioners
  getData = async () => {
    return axios
      .get(urlServer + "/AC/get-last-records")
      .then(res => {
        this.setState((prevState, props) => ({
          id: res.data.ac_id,
          mode: res.data.ac_mode,
          fan_speed: res.data.ac_fan_speed,
          temperature: res.data.temperature,
          active: res.data.active
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillMount() {
    this.getData(data => {});
    this.setState({ isChecked: false });
  }

  //set the changes of fanspeed page
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //set the changes of mode page
  setMode = mode => {
    this.setState({ mode: mode });
  };

  //set the changes of temperature page
  setTemp = temp => {
    this.setState({ temperature: temp });
  };
  onClick = e => {
    this.setState({ id: e.target.value });
  };

  handleChange = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }));

    if (this.state.isChecked === false) this.setState({ active: "ON" });
    else this.setState({ active: "OFF" });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (
      this.state.id &&
      this.state.fan_speed &&
      this.state.temperature &&
      this.state.active &&
      this.state.mode
    ) {
      var message1 = this.state.id.concat(
        "," +
          this.state.mode +
          "," +
          this.state.fan_speed +
          "," +
          (this.state.temperature + 1) +
          "," +
          this.state.active
      );
      this.setState({
        message: message1
      });
      axios
        .post(urlServer + "/api/mqtt/publish", {
          message: message1,
          retained: false,
          topic: "Astair/MODEL/AC"
        })
        .then(function(res) {
          alert("Data Send");
        })
        .catch(function(error) {});
    } else alert("Please fill all fields to proceed");
  };

  //creates the buttons
  getButton = () => {
    return urlArr.map((button, i) => (
      <ToggleButton onClick={this.onClick} value={i + 1}>
        {i + 1}
      </ToggleButton>
    ));
  };

  render() {
    if (getCookie("usertoken") === "1") {
      return (
        <div style={{ paddingTop: 20 }}>
          <div className="center">
            <Card>
              <CardBody>
                <div style={{ alignItems: "right" }}>
                  <Row>
                    <ToggleButtonGroup
                      type="radio"
                      name="options"
                      defaultValue={1}
                    >
                      {this.getButton()}
                    </ToggleButtonGroup>
                  </Row>
                </div>
                <center>
                  <h4> MODE </h4>
                </center>
                <Mode mode={this.state.mode} setMode={x => this.setMode(x)} />
                <Row style={{ paddingLeft: "20%" }}>
                  <Col>
                    <h4> TEMPERATURE </h4>
                    <Temperature setTemp={x => this.setTemp(x)} />
                  </Col>
                  <Col>
                    <h4> ON/OFF </h4>
                    <div>
                      <label>
                        <input
                          ref="switch"
                          checked={this.state.isChecked}
                          onChange={this.handleChange}
                          className="switch"
                          type="checkbox"
                        />
                        <div>
                          <div />
                        </div>
                      </label>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <div style={{ paddingLeft: "45%" }}>
                    <FanSpeed
                      fan_speed={this.state.fan_speed}
                      onChange={x => this.onChange(x)}
                    />
                  </div>
                </Row>
                <Row>
                  <Col />
                  <Col>
                    <div style={{ paddingLeft: "35%" }}>
                      <Button
                        variant="primary"
                        onClick={this.handleSubmit.bind(this)}
                      >
                        Change
                      </Button>
                    </div>
                  </Col>
                  <Col />
                </Row>
              </CardBody>
            </Card>
          </div>
          <div
            style={{
              height: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <img height={150} src="/assets/Logo-Astair-w.png" alt={"logo"} />
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}
export default ACControl;
