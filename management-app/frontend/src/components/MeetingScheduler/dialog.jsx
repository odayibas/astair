import React, { Component } from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Container,
  Form,
  Table
} from "react-bootstrap";

import ParticipantTable from "./participants";

class Dialog extends Component {
  state = {};
  participants = [];
  input;
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
    if (!this.props.data.start) return "";
    const start = this.props.data.start;
    const end = this.props.data.end;

    return (
      this.convertTimeToString(start) + " - " + this.convertTimeToString(end)
    );
  };
  getDate = () => {
    if (!this.props.data.date) return "";
    const date = this.props.data.date;
    let str = date.day + "." + date.month + "." + date.year;
    return str;
  };

  updateParticipants = participants => {
    this.participants = new Set(participants);
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Meeting Preview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h5>Creator: Serdar Gurbuz</h5>
          <Container style={{ marginTop: 20, marginBottom: 20 }}>
            <Row className="flex-row">
              <Col className="text-center" xs={4}>
                Date: {this.getDate()}
              </Col>
              <Col className="text-center" xs={4}>
                Time: {this.getTime()}
              </Col>
              <Col className="text-center" xs={4}>
                Room: {this.props.data.room}
              </Col>
            </Row>
          </Container>
          {/* <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                Description:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup> */}
          <Form>
            <Form.Group>
              <Form.Control
                ref={ref => {
                  this.input = ref;
                }}
                placeholder="Enter meeting description here..."
              />
            </Form.Group>
          </Form>

          <ParticipantTable
            data={this.props.allParticipants}
            updateParticipants={this.props.updateParticipants}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onHide} variant="danger">
            Cancel
          </Button>
          <Button
            onClick={() => {
              this.props.onHide();
              const description = this.input.value;
              this.props.setDescription(description);
              this.props.onCreateMeeting();
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Dialog;
