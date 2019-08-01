import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import axios from "axios";
import { get as getCookie } from "es-cookie";
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

function diff_minutes(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}

function takeVoteId() {
  let now = new Date();
  vote_id = Math.floor(
    diff_minutes(now, baseYear) / process.env.REACT_APP_DURATION
  );
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
          time = (takeVoteId() + 1) * process.env.REACT_APP_DURATION - nowMin;

          this.setState((prevState, props) => ({
            vote_id: res.data[0].vote_id,
            results: res.data
          }));

          if (vote_id !== this.state.vote_id) {
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
          time = (takeVoteId() + 1) * process.env.REACT_APP_DURATION - nowMin;

          this.setState({
            show: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  calculateTime = () => {};

  refresh = b => {
    var t = time;
    if (b) t = process.env.REACT_APP_DURATION;

    this.setState({ show: false });
    setTimeout(() => {
      this.setState({ show: true });
    }, t * 60 * 1000);
  };

  foo = () => {
    const show = this.state.show;
    if (show === true) {
      return (
        <Survey
          results={this.state.results}
          callbackResults={x => {
            this.callbackResults(x);
          }}
          callback={x => {
            this.callback(x);
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

  componentDidMount() {
    takeVoteId();
    this.getData(data => {});
  }

  getVoteResult = lastvote => {
    let results = [...this.state.results];

    results.splice(0, 0, lastvote);
    this.setState({
      results: results
    });
  };

  callback = (vote, region) => {
    this.setState({
      vote: vote,
      region: region
    });
  };
  callbackResults(results) {
    this.setState({
      results: results
    });
  }

  render() {
    // if( getCookie('usertoken') !== getCookie('token')){
    if (getCookie("usertoken") === "1" || getCookie("usertoken") === "2") {
      return (
        <div
          style={{
            width: "100% !important",
            margin: "auto",
            height: "100%",
            marginTop: "40px"
          }}
        >
          <div
            style={{
              left: "10px",
              right: "10px",
              display: "flex",
              padding: "30px",
              width: "100%",
              height: "90%"
            }}
          >
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
              <Row style={{ padding: "10%" }}>{this.foo()} </Row>
            </Col>
            <Col xs="5" sm="3">
              <Row style={{ paddingLeft: "10%" }}>
                <VoteChart time={this.state.time} />
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
