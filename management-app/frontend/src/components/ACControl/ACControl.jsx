import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { get as getCookie } from "es-cookie";
import { Redirect } from "react-router-dom";
import axios from "axios";
import SurveyInterval from "./surveyinterval";

import FanSpeed from "./FanSpeed";
import Temperature from "./Temperature";
import Mode from "./Mode";
import Fan from "./Fan";
import { Container } from "@material-ui/core";

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;
const urlArr = Array.from(
  Array(parseInt(process.env.REACT_APP_LENGTH)).keys()
).map(x => (x + 1).toString());

class ACControl extends Component {
  currentAC = 2; // To test 2 and 3

  state = {
    id: "1",
    mode: "",
    fan_speed: "",
    temperature: "",
    active: "",
    isChecked: false,
    border: ""
  };

  //makes request to get last records for all airconditioners
  getData = async () => {
    axios
      .get(urlServer + "/AC/get-last-records")
      .then(res => {
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
        this.setState(acData, () => {});
      })
      .catch(err => {
        console.log(err);
      });
    // setTimeout(this.getData, 60000); To refresh data periodically.
  };

  componentWillMount() {
    this.getData(data => {});
  }

  //set the changes of fanspeed page
  setFan = fan => {
    this.setState({ fan_speed: fan }, () => {});
  };

  //set the changes of mode page
  setMode = mode => {
    this.setState({ mode: mode }, () => {});
  };

  //set the changes of temperature page
  setTemp = temp => {
    this.setState({ temperature: temp }, () => {});
  };

  adjustTemp = val => {
    if (this.state.temperature === 30 && val === 1) return;
    if (this.state.temperature === 16 && val === -1) return;
    this.setTemp(this.state.temperature + val);
  };

  setAC = ac => {
    this.setState({ id: ac + "" }, () => {
      this.currentAC = ac;
      this.getData();
    });
  };

  handleChange = () => {
    const newVal = !this.state.isChecked;

    if (newVal === true) {
      this.setState({ active: "ON" }, () => {});
    } else {
      this.setState({ active: "OFF" }, () => {});
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
        .then(res => {
          this.setState({ border: "border border-success" }, () => {
            setTimeout(() => {
              this.setState({ border: "" });
            }, 3000);
          });
          // alert("Data Send");
        })
        .catch(error => {
          this.setState({ border: "border border-danger" }, () => {
            setTimeout(() => {
              this.setState({ border: "" });
            }, 3000);
          });
        });
    } else alert("Please fill all fields to proceed");
  };

  setAdminInterval = intervalTime => {
    //return axios
    return axios
      .get(urlServer + "/meeting/get-slots/")
      .then(res => {
        // console.log("WTF", res.data[res.data.length - 1]);
        let curSettings = res.data[res.data.length - 1];
        curSettings.surveyInterval =
          intervalTime.hours * 60 + intervalTime.minutes + "";
        axios
          .post(urlServer + "/admin/set-slots/", curSettings)
          .then(res => {
            console.log("Inserted successfully");
          })
          .catch(err => {
            console.log("ERR WHILE INSERTING SETTINGS");
          });
      })
      .catch(err => {
        console.log("ERR WHILE FETCHING SETTINGS");
      });
  };

  //creates the buttons
  getButton = () => {
   //  return urlArr.map((button, i) => (
   //    <ToggleButton
   //      variant="dark"
   //      onMouseDown={() => {
   //        this.setAC(i + 1);
   //      }}
   //      value={i + 1}
   //    >
   //      {i + 1}
   //    </ToggleButton>
   //  ));

    // To test number 2 and 3 on the board,
    const arr = ["2", "3"];
    return arr.map(i => (
      <ToggleButton
        variant="dark"
        onMouseDown={() => {
          this.setAC(i);
        }}
       value={i}
      >
        {i}
      </ToggleButton>
    ));
  };

  render() {
    if (getCookie("usertoken") === "1" || getCookie("usertoken") === "3") {
      return (
        <div
          style={{ padding: this.state.border !== "" ? 19 : 20 }}
          className="center"
        >
          <Card className={this.state.border}>
            <CardBody>
              <Container>
                <Row style={{ textAlign: "left" }}>
                  <ToggleButtonGroup
                    type="radio"
                    name="options"
                    //defaultValue={1}
                    defaultValue={"2"} // Test 2 and 3
                  >
                    {this.getButton()}
                  </ToggleButtonGroup>
                </Row>

                <Row style={{ marginTop: 0 }}>
                  <Col xs={12} style={{ textAlign: "center", padding: 0 }}>
                    <div>
                      <label style={{ padding: 0, margin: 0 }}>
                        <input
                          ref="switch"
                          checked={this.state.isChecked}
                          onChange={this.handleChange}
                          className="switch"
                          variant="success"
                          type="checkbox"
                        />
                        <div>
                          <div />
                        </div>
                      </label>
                    </div>
                  </Col>
                </Row>
                {/* <Row style={{ marginTop: 10 }}>
                  <Col xs={12} style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "1.25em" }}>Temperature</span>
                  </Col>
                </Row> */}
                <Row style={{ marginTop: 30 }}>
                  <Col xs={12} style={{ textAlign: "center" }}>
                    <Temperature
                      adjustTemp={x => this.adjustTemp(x)}
                      temperature={this.state.temperature}
                    />
                  </Col>
                </Row>
                {/* <Row style={{ marginTop: 10 }}>
                  <Col xs={12} style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "1.25em" }}>Fan Speed</span>
                  </Col>
                </Row> */}
                <Row style={{ marginTop: 30 }}>
                  <Col xs={12} style={{ textAlign: "center" }}>
                    <Fan
                      mode={this.state.fan_speed}
                      setFan={x => this.setFan(x)}
                    />
                  </Col>
                </Row>
                {/* <Row style={{ marginTop: 10 }}>
                  <Col xs={12} style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "1.25em" }}>Mode</span>
                  </Col>
                </Row> */}
                <Row style={{ marginTop: 30 }}>
                  <Col xs={12} style={{ textAlign: "center" }}>
                    <Mode
                      mode={this.state.mode}
                      setMode={x => this.setMode(x)}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 30, textAlign: "center" }}>
                  <Col xs={12}>
                    <Button
                      variant="dark"
                      onClick={this.handleSubmit.bind(this)}
                    >
                      Apply
                    </Button>
                  </Col>
                </Row>
              </Container>
            </CardBody>
          </Card>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img height={50} src="/assets/Logo-Astair-w.png" alt={"logo"} />
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}
export default ACControl;
