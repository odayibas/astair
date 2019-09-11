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
  currentAC = 1;

  state = {
    id: "1",
    mode: "",
    fan_speed: "",
    temperature: 25,
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
    if (this.state.temperature === 30 && val === 1) return;
    if (this.state.temperature === 16 && val === -1) return;
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

  setAdminInterval = intervalTime => {
    //return axios
    console.log("Final", intervalTime);
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
    return urlArr.map((button, i) => (
      <ToggleButton
        variant="dark"
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
        <div style={{ padding: 20 }} className="center">
          <Card>
            <CardBody>
              <Container>
                <Row style={{ textAlign: "left" }}>
                  <ToggleButtonGroup
                    type="radio"
                    name="options"
                    defaultValue={1}
                  >
                    {this.getButton()}
                  </ToggleButtonGroup>
                </Row>

                {/* <Row style={{ marginTop: 10 }}>
                  <Col
                    xs={12}
                    style={{
                      textAlign: "center"
                    }}
                  >
                    <span style={{ fontSize: "1.25em" }}> Power </span>
                  </Col>
                </Row> */}
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

  // render() {
  //   if (getCookie("usertoken") === "1") {
  //     return (
  //       <div style={{ paddingTop: 20 }}>
  //         <div className="center">
  //           <Card>
  //             <CardBody>
  //               <div style={{ alignItems: "right" }}>
  //                 <Container>
  //                   <Row>
  //                     <Col>
  //                       <ToggleButtonGroup
  //                         type="radio"
  //                         name="options"
  //                         defaultValue={1}
  //                       >
  //                         {this.getButton()}
  //                       </ToggleButtonGroup>
  //                     </Col>
  //                     <Col>
  //                       <SurveyInterval
  //                         setAdminInterval={this.setAdminInterval}
  //                       />
  //                     </Col>
  //                   </Row>
  //                 </Container>
  //               </div>
  //               <center>
  //                 <h4> MODE </h4>
  //               </center>
  //               <Mode mode={this.state.mode} setMode={x => this.setMode(x)} />
  //               <Row style={{ paddingLeft: "20%" }}>
  //                 <Col>
  //                   <h4> TEMPERATURE </h4>
  //                   <Temperature
  //                     adjustTemp={x => this.adjustTemp(x)}
  //                     temperature={this.state.temperature}
  //                   />
  //                 </Col>
  //                 <Col>
  //                   <h4> ON/OFF </h4>
  //                   <div>
  //                     <label>
  //                       <input
  //                         ref="switch"
  //                         checked={this.state.isChecked}
  //                         onChange={this.handleChange}
  //                         className="switch success"
  //                         type="checkbox"
  //                       />
  //                       <div>
  //                         <div />
  //                       </div>
  //                     </label>
  //                   </div>
  //                 </Col>
  //               </Row>

  //               <Fan mode={this.state.fan_speed} setFan={x => this.setFan(x)} />

  //               <Row>
  //                 <Col />
  //                 <Col>
  //                   <div style={{ paddingLeft: "35%" }}>
  //                     <Button
  //                       variant="primary"
  //                       onClick={this.handleSubmit.bind(this)}
  //                     >
  //                       Change
  //                     </Button>
  //                   </div>
  //                 </Col>
  //                 <Col />
  //               </Row>
  //             </CardBody>
  //           </Card>
  //         </div>
  //         <div
  //           style={{
  //             height: "10%",
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center"
  //           }}
  //         >
  //           <img height={150} src="/assets/Logo-Astair-w.png" alt={"logo"} />
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return <Redirect to="/login" />;
  //   }
  // }
}
export default ACControl;
