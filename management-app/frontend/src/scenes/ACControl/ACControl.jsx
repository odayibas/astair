import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { get as getCookie } from "es-cookie";
import { Redirect } from "react-router-dom";
import axios from "axios";
import ACzone from "../Dashboard/images/ac_zone.png";
import Temperature from "./components/Temperature/Temperature";
import Mode from "./components/Mode/Mode";
import Fan from "./components/Fan/Fan";
import { Container } from "@material-ui/core";
import { connect } from 'react-redux';
import { getLastAcRecords, setTemperature, setFan, setMode, setActive, setIsChecked, handleSubmit } from '../../services/session/ACControl/actions';

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;


const mapStatetoProps = (state) => {
  console.log("mapStatetoProps", state)
  return { data: state.acControlReducer.data, error: state.acControlReducer.error }
}

const mapDispatchprops = (dispatch) => {
  return {
    onGetLastAcRecords: (currentAC) => dispatch(getLastAcRecords(currentAC)),
    onSetTemperature: (temperature) => dispatch(setTemperature(temperature)),
    onSetFan: (fan) => dispatch(setFan(fan)),
    onSetMode: (mode) => dispatch(setMode(mode)),
    onSetActive: (active) => dispatch(setActive(active)),
    onSetIsChecked: (isChecked) => dispatch(setIsChecked(isChecked)),
    onHandleSubmit: (message) => dispatch(handleSubmit(message)),

  }
}

class ACControl extends Component {

  state = {
    currentAC: 2,
  };

  componentDidMount() {
    this.props.onGetLastAcRecords(this.state.currentAC)
    console.log(this.props)

  }

  //set the changes of fanspeed px  age 
  setFan = fan => {
    this.props.onSetFan(fan);
  };

  //set the changes of mode page
  setMode = mode => {
    this.props.onSetMode(mode);
  };

  //set the changes of temperature page
  setTemp = temp => {
    this.props.onSetTemperature(temp);
  };

  adjustTemp = val => {
    if (this.props.data.temperature === 30 && val === 1) return;
    if (this.props.data.temperature === 16 && val === -1) return;
    this.setTemp(this.props.data.temperature + val);
  };

  handleChange = () => {
    console.log("this.props.data",this.props)
    const newVal = !this.props.data.isChecked;

    if (newVal === true) {
      this.props.onSetActive("ON");
    } else {
      this.props.onSetActive("OFF");
    }
    this.props.onSetIsChecked(newVal);
  };

  handleSubmit = event => {
    event.preventDefault();
    if (
      this.props.data.id &&
      this.props.data.fan_speed &&
      this.props.data.temperature &&
      this.props.data.active &&
      this.props.data.mode
    ) {
      var message1 = (this.props.data.id + "").concat(
        "," +
        this.props.data.mode +
        "," +
        this.props.data.fan_speed +
        "," +
        this.props.data.temperature +
        "," +
        this.props.data.active
      );
      console.log("The message is ", message1);
      this.props.onHandleSubmit(message1);
    }
    else alert("Please fill all fields to proceed");
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
          console.log("i", i)
          this.setState({ currentAC: i }, () => this.props.onGetLastAcRecords(this.state.currentAC));
        }}
        value={i}
      >
        {i}
      </ToggleButton>
    ));
  };

  render() {
    console.log("this.props from render",this.props)
    if (getCookie("usertoken") === "1" || getCookie("usertoken") === "3") {
      return (
        <div
          style={{ padding: this.props.data && this.props.data.border !== "" ? 19 : 20 }}
          className="center"
        >
          <div className="aczone">
            <Button id="showzone" variant="danger">Show ac zone</Button>
            <div className="showACzone">
              <img src={ACzone} />
            </div>
          </div>

          <Card className={this.props.data && this.props.data.border}>
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
                          checked={this.props.data && this.props.data.isChecked}
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
                      temperature={this.props.data && this.props.data.temperature} />

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
                      mode={this.props.data && this.props.data.fan_speed}
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
                      mode={this.props.data && this.props.data.mode}
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
export default connect(mapStatetoProps, mapDispatchprops)(ACControl);
