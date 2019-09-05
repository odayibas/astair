import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import axios from "axios";
import { get as getCookie, set as setCookie } from "es-cookie";
import { Col, Row } from "reactstrap";
import { Redirect } from "react-router-dom";
import "react-vertical-timeline-component/style.min.css";
import { Link } from "react-router-dom";

import VoteChart from "./VoteChart";
import Timeline from "./Timeline";
import Survey from "./Survey";

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

var vote_id, time;
const baseYear = new Date(Date.UTC(2019, 0, 0, 0, 0, 0));

// let adminInterval = 10;

//finds all the minutes from 01-01-2019 00:00

//creates a vote_id for the cureent survey by given minutes

class WebForm extends Component {
  adminInterval = 10;
  constructor(props) {
    super(props);
    console.log(props.timeInterval, "CONSTRUCTOR CHECK");
    this.state = {
      show: false,
      vote: "Hot",
      vote_id: null,
      region: 1,
      results: [
        {
          user_id: "",
          vote: "",
          vote_id: "",
          region: "",
          date_time: ""
        }
      ]
    };
    this.adminInterval = props.surveyInterval;
  }

  diff_minutes(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  takeVoteId = () => {
    console.log("NEVER EVERRRRR", this.adminInterval);
    let now = new Date();
    vote_id = Math.floor(this.diff_minutes(now, baseYear) / this.adminInterval);
    console.log("Interval inside", this.adminInterval);
    return vote_id;
  };

  componentWillReceiveProps(newProps) {
    console.log(
      "New props are",
      newProps.surveyInterval,
      " OLD ,",
      this.props.surveyInterval
    );
    if (
      newProps.surveyInterval &&
      newProps.surveyInterval !== this.props.surveyInterval
    ) {
      this.adminInterval = newProps.surveyInterval;
    }
  }

  // componentWillReceiveProps(newProps) {
  //   console.log("AGAIN ? ");
  //   if (newProps.timeInterval !== this.props.timeInterval) {
  //     console.log("ONCE");
  //     adminInterval = newProps.timeInterval;
  //     takeVoteId();
  //     this.setTimer();
  //   }
  // }

  getData = async () => {
    return axios
      .get(urlServer + "/vote/get-by-user_id/" + getCookie("token"))
      .then(res => {
        console.log(res.data);
        if (res.data.length !== 0 && res.data) {
          var now = new Date();
          var nowMin = this.diff_minutes(now, baseYear);
          time = (this.takeVoteId() + 1) * this.adminInterval - nowMin;
          console.log("Should have been done before");

          this.setState((prevState, props) => ({
            vote_id: res.data[0].vote_id,
            results: res.data
          }));

          if (vote_id && vote_id !== this.state.vote_id) {
            console.log("vote id", vote_id, "state vote", this.state.vote_id);
            setCookie("form_notification", "1");
            console.log("This one?");
            this.setState({
              show: true
            });
          } else {
            if (time === 0) this.refresh(true);
            else this.refresh(false);
          }
        } else {
          now = new Date();
          nowMin = this.diff_minutes(now, baseYear);
          time = (this.takeVoteId() + 1) * this.adminInterval - nowMin;

          this.setState({
            show: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // this function is torefresh the page after adminInterval miutes passed
  refresh = b => {
    var t = time;
    if (b) t = this.adminInterval;
    this.setState({ show: false });
    console.log("The time you are going to wait for is ", t);
    if (t) {
      setTimeout(() => {
        this.setState({ show: true });
        setCookie("form_notification", "1");
        this.props.showNotification(true);
      }, t * 60 * 1000);
    }
  };

  //gets the survey after duration  passed
  createSurvey = () => {
    if (this.state.show === true) {
      return (
        <Survey
          showNotification={this.props.showNotification}
          results={this.state.results}
          setResults={x => {
            this.setResults(x);
          }}
          setVoteRegion={x => {
            this.setVoteRegion(x);
          }}
          raiseRefresh={this.refresh}
          getVoteResult={x => {
            this.getVoteResult(x);
          }}
        />
      );
    }
    return;
  };

  // setTimer = () => {
  //   return axios
  //     .get(urlServer + "/meeting/get-slots/")
  //     .then(res => {
  //       let currentSettings = res.data[res.data.length - 1];
  //       // adminInterval = parseInt(currentSettings.surveyInterval, 10);
  //       console.log(this.adminInterval);
  //
  //     })
  //     .catch(err => {});
  // };

  componentDidMount() {
    this.getData(data => {});
    // this.takeVoteId();
  }

  getVoteResult = lastvote => {
    let results = [...this.state.results];

    results.splice(0, 0, lastvote);
    this.setState({
      results: results
    });
  };

  setVoteRegion = (vote, region) => {
    this.setState({
      vote: vote,
      region: region
    });
  };

  setResults(results) {
    this.setState({
      results: results
    });
  }

  render() {
    if (getCookie("usertoken") === "1" || getCookie("usertoken") === "2") {
      return (
        <div className="page-main">
          <div className="page-body">
            <Col xs="5" sm="6">
              <div>
                <h2>VOTE TIMELINE</h2>
              </div>
              <div>
                <Timeline results={this.state.results} />
              </div>
            </Col>
            <Col xs="5" sm="3">
              <Row>
                <div style={{ paddingLeft: "25%" }}>
                  <Card>
                    <CardBody>
                      <center>
                        <div className="text-value">
                          <h4> You are in region </h4>
                          <h2> {this.state.results[0].region} </h2>
                          <Link to="/monitor">
                            {" "}
                            Click here to find your region{" "}
                          </Link>
                        </div>
                      </center>
                    </CardBody>
                  </Card>
                </div>
              </Row>
              <Row style={{ padding: "10%" }}>{this.createSurvey()} </Row>
            </Col>
            <Col xs="5" sm="3">
              <Row style={{ paddingLeft: "10%" }}>
                <VoteChart
                  vote_id={this.state.vote_id}
                  show={this.state.show}
                />
              </Row>
            </Col>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default WebForm;
