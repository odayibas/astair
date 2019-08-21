import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { maxWidth } from "@material-ui/system";
import { min } from "moment";

class SummaryPanel extends Component {
  state = {};

  convertTimeToString = t => {
    var hours = "";
    var minutes = "";
    if (t.hours < 10) {
      hours += "0";
    }
    hours += t.hours;
    if (t.minutes < 10) {
      minutes += "0";
    }
    minutes += t.minutes;
    return hours + ":" + minutes;
  };

  getTime = () => {
    const start = this.props.data.start;
    const end = this.props.data.end;

    return (
      this.convertTimeToString(start) + " - " + this.convertTimeToString(end)
    );
  };
  getDate = () => {
    const day = this.props.data.day;
    let str = day.day + "." + day.month + "." + day.year;
    return str;
  };

  render() {
    return (
      <div>
        <Container style={{ width: maxWidth }}>
          <Row>
            <h5
              style={{
                color: "#ffffff",
                padding: 10
              }}
            >
              Meeting Summary
            </h5>
          </Row>
          <Row>
            <span style={{ color: "#ffffff", padding: 10 }}>
              Time : {this.getTime()}
            </span>
          </Row>
          <Row>
            <span style={{ color: "#ffffff", padding: 10 }}>
              Date : {this.getDate()}
            </span>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SummaryPanel;
