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
    const date = this.props.data.date;
    let str = date.day + "." + date.month + "." + date.year;
    return str;
  };
  getPanel = () => {
    if (!(this.props.data.start && this.props.data.end && this.props.data.date))
      return <div />;
    return (
      <div>
        <Container style={{ width: maxWidth }}>
          <Row className="text-center">
            <Col xs={12}>
              <h5
                style={{
                  color: "#ffffff",
                  padding: 10
                }}
              >
                Meeting Preview
              </h5>
            </Col>
          </Row>
          <Row>
            <span style={{ color: "#ffffff", padding: 10, marginLeft: 20 }}>
              Description : {this.props.data.description}
            </span>
          </Row>
          <Row>
            <span style={{ color: "#ffffff", padding: 10, marginLeft: 20 }}>
              Time : {this.getTime()}
            </span>
          </Row>
          <Row>
            <span style={{ color: "#ffffff", padding: 10, marginLeft: 20 }}>
              Date : {this.getDate()}
            </span>
          </Row>
          <Row>
            <span style={{ color: "#ffffff", padding: 10, marginLeft: 20 }}>
              Room : {this.props.data.room}
            </span>
          </Row>
          <Row>
            <Col xs={12}>
              <button
                type="button"
                className="btn btn-info"
                style={{ margin: "10px" }}
                onClick={() => {
                  this.props.onCreateMeeting();
                }}
              >
                Create
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  render() {
    return this.getPanel();
  }
}

export default SummaryPanel;
