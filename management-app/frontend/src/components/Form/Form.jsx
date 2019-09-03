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

let adminInterval = process.env.REACT_APP_DURATION;

//finds all the minutes from 01-01-2019 00:00
function diff_minutes(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}

//creates a vote_id for the cureent survey by given minutes
function takeVoteId() {
  let now = new Date();
  vote_id = Math.floor(diff_minutes(now, baseYear) / adminInterval);
  return vote_id;
}

class SlackForm extends Component {
  constructor(props) {
    super(props);
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
  }

  getData = async () => {
    return axios
      .get(urlServer + "/vote/get-by-user_id/" + getCookie("token"))
      .then(res => {
        if (res.data.length !== 0 && res.data) {
          var now = new Date();
          var nowMin = diff_minutes(now, baseYear);
          time = (takeVoteId() + 1) * adminInterval - nowMin;
          console.log("is isten gecti");

          this.setState((prevState, props) => ({
            vote_id: res.data[0].vote_id,
            results: res.data
          }));

          if (vote_id !== this.state.vote_id) {
            setCookie("form_notification", "1");
            this.setState({
              show: true
            });
          } else {
            if (time === 0) this.refresh(true);
            else this.refresh(false);
          }
        } else {
          now = new Date();
          nowMin = diff_minutes(now, baseYear);
          time = (takeVoteId() + 1) * adminInterval - nowMin;

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
    if (b) t = adminInterval;
    this.setState({ show: false });
    setTimeout(() => {
      this.setState({ show: true });
      setCookie("form_notification", "1");
      this.props.showNotification(true);
    }, t * 60 * 1000);
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

  setTimer = () => {
    return axios
      .get(urlServer + "/meeting/get-slots/")
      .then(res => {
        let currentSettings = res.data[res.data.length - 1];
        // adminInterval = parseInt(currentSettings.surveyInterval, 10);
        console.log(adminInterval);
        this.getData(data => {});
      })
      .catch(err => {});
  };

  componentDidMount() {
    takeVoteId();
    this.setTimer();
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

export default SlackForm;
