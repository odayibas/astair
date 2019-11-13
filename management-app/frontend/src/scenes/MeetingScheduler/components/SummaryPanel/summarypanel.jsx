import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { maxWidth } from "@material-ui/system";

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
      <div
        className="border rounded"
        style={{ marginTop: 10, textAlign: "left" }}
      >
        <Container style={{ width: maxWidth }}>
          <Row className="text-center">
            <Col xs={12} style={{ marginTop: 10 }}>
              <span style={{ fontSize: "1.25em" }}>Details</span>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col xs={12}>
              <span style={{ color: "#202528", fontSize: "0.8em", padding: 5 }}>
                <b>Creator:</b> {this.props.data.username}
              </span>
            </Col>
          </Row>
          <Row style={{ marginTop: 5 }}>
            <Col xs={12}>
              <span
                style={{
                  color: "#202528",
                  padding: 5,
                  fontSize: "0.8em",
                  textAlign: "center"
                }}
              >
                <b>Description:</b> {this.props.data.description}
              </span>
            </Col>
          </Row>
          <Row style={{ marginTop: 5 }}>
            <Col xs={12}>
              <span style={{ color: "#202528", padding: 5, fontSize: "0.8em" }}>
                {this.getDate()}
              </span>
            </Col>
          </Row>
          <Row style={{ marginTop: 5 }}>
            <Col xs={12}>
              <span style={{ color: "#202528", padding: 5, fontSize: "0.8em" }}>
                {this.getTime()}
              </span>
            </Col>
          </Row>

          <Row style={{ marginTop: 5, marginBottom: 10, fontSize: "0.8em" }}>
            <Col xs={12}>
              <span style={{ color: "#202528", padding: 5 }}>
                <b>Room</b> : {this.props.data.room}
              </span>
            </Col>
          </Row>
          {/* <Row>
            <Col xs={12}>
              <button
                type="button"
                className="btn btn-info"
                style={{ margin: "10px" }}
                onClick={() => {
                  this.props.onShowDialog(true);
                }}
              >
                Create
              </button>
            </Col>
          </Row> */}
        </Container>
      </div>
    );
  };

  render() {
    return this.getPanel();
  }
}

export default SummaryPanel;
