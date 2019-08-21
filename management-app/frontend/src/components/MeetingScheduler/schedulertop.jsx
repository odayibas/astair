import React, { Component } from "react";
import MeetingScheduler from "./meetingscheduler";
import { Row, Col, Container } from "react-bootstrap";
import { maxHeight } from "@material-ui/system";

class SchedulerTop extends Component {
  state = {};
  render() {
    return (
      <div>
        <Container>
          <Row md={1}>
            <div style={{ height: 100 }} />
          </Row>
          <Row md={11}>
            <MeetingScheduler />
          </Row>
        </Container>
      </div>
    );
  }
}

export default SchedulerTop;
