import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
class SurveyInterval extends Component {
  state = {};
  intervalInput = 0;

  validateTime = t => {
    if ((t + "").indexOf(":") !== 2 || t.length !== 5) return false;

    const temp = t.split(":");
    const hours = temp[0];
    const minutes = temp[1];

    if (hours < "00" || hours > "23") return false;
    if (minutes < "00" || minutes > "59") return false;

    return true;
  };

  convertStringToTime = str => {
    const temp = str.split(":");
    const hours = parseInt(temp[0], 10);
    const minutes = parseInt(temp[1], 10);
    return { hours, minutes };
  };

  handleApply = () => {
    if (this.validateTime(this.intervalInput)) {
      this.props.setAdminInterval(this.intervalInput);
    } else {
      console.log("Invalid time format");
    }
  };

  render() {
    return (
      <Form className="self-align-center">
        <Container>
          <Row>
            <Col xs={4} style={{ padding: 0, alignSelf: "center" }}>
              <span style={{ fontSize: "0.8em" }}>Survey Interval: </span>
            </Col>
            <Col xs={4} style={{ padding: 0, alignSelf: "center" }}>
              <FormControl
                style={{ padding: 0, margin: 0 }}
                ref={ref => {
                  this.intervalInput = ref;
                }}
                size="sm"
                placeholder="XX:XX"
                style={{ marginBottom: 5 }}
              />
            </Col>
            <Col xs={4}>
              <Button size="sm" onClick={this.handleApply}>
                Apply
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    );
  }
}

export default SurveyInterval;
