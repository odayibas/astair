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
import Fan from "./Fan";

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;
const urlArr = Array.from(
  Array(parseInt(process.env.REACT_APP_LENGTH)).keys()
).map(x => (x + 1).toString());

class ACControl extends Component {
  currentAC = 1;

  state = {
    id: "1",
    mode: "",
    fan_speed: "",
    temperature: "",
    active: "",
    isChecked: false
  };

  //makes request to get last records for all airconditioners
  getData = async () => {
    return axios
      .get(urlServer + "/AC/get-last-records")
      .then(res => {
        console.log("INITIAL AC VALUES", res.data);
        let b = false;
        let active = "OFF";
        if (res.data[this.currentAC - 1].active === "1") {
          b = true;
          active = "ON";
        }
        const acData = {
          id: this.currentAC,
          mode: res.data[this.currentAC - 1].ac_mode,
          fan_speed: res.data[this.currentAC - 1].ac_fan_speed,
          temperature: res.data[this.currentAC - 1].ac_degree,
          active: active,
          isChecked: b
        };
        this.setState(acData, () => {
          console.log("AFTER SETTING", this.state);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillMount() {
    this.getData(data => {});
  }

  //set the changes of fanspeed page
  setFan = fan => {
    this.setState({ fan_speed: fan }, () => {
      console.log("Fan:", fan);
    });
  };

  //set the changes of mode page
  setMode = mode => {
    this.setState({ mode: mode }, () => {
      console.log("Mode:", mode);
    });
  };

  //set the changes of temperature page
  setTemp = temp => {
    this.setState({ temperature: temp }, () => {
      console.log("Temp: ", temp);
    });
  };

  adjustTemp = val => {
    this.setTemp(this.state.temperature + val);
  };

  setAC = ac => {
    this.setState({ id: ac + "" }, () => {
      console.log("AC:", ac);
      this.currentAC = ac;
      this.getData();
    });
  };

  handleChange = () => {
    const newVal = !this.state.isChecked;

    if (newVal === true) {
      this.setState({ active: "ON" }, () => {
        console.log("Power:", this.state.active);
      });
    } else {
      this.setState({ active: "OFF" }, () => {
        console.log("Power:", this.state.active);
      });
    }
    this.setState({ isChecked: newVal });
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
      var message1 = (this.state.id + "").concat(
        "," +
          this.state.mode +
          "," +
          this.state.fan_speed +
          "," +
          this.state.temperature +
          "," +
          this.state.active
      );
      console.log("The message is ", message1);
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
      <ToggleButton
        onMouseDown={() => {
          this.setAC(i + 1);
        }}
        value={i + 1}
      >
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
                    <Temperature
                      adjustTemp={x => this.adjustTemp(x)}
                      temperature={this.state.temperature}
                    />
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
                    {/* <FanSpeed
                      fan_speed={this.state.fan_speed}
                      onChange={x => this.setFan(x)}
                    /> */}
                    <Fan
                      mode={this.state.fan_speed}
                      setFan={x => this.setFan(x)}
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
