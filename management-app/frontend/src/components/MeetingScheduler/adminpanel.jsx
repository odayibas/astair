import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

class AdminPanel extends Component {
  state = {};

  roomInput;
  startInput;
  endInput;
  slotInput;

  handleAddDeleteClick = act => {
    if (this.roomInput.value === "") {
      this.props.showToast("warning", "Please specify a room name!");
      return;
    }
    if (act === 1) {
      this.props.onAddRoom(this.roomInput.value);
    } else if (act === -1) {
      this.props.onDeleteRoom(this.roomInput.value);
    }
  };

  validateTime = t => {
    if ((t + "").indexOf(":") !== 2 || t.length !== 5) return false;

    const temp = t.split(":");
    const hours = temp[0];
    const minutes = temp[1];

    if (hours < "00" || hours > "23") return false;
    if (minutes < "00" || minutes > "59") return false;

    return true;
  };

  handleSetScheduleClick = () => {
    console.log("-" + this.startInput.value + "-");
    if (this.startInput.value === "") {
      this.props.showToast("warning", "Please specify the start time");
    } else if (this.endInput.value === "") {
      this.props.showToast("warning", "Please specify the end time!");
    } else if (this.slotInput.value === "") {
      this.props.showToast("warning", "Please specify the slot duration!");
    } else if (
      this.validateTime(this.startInput.value) === false ||
      this.validateTime(this.endInput.value === false) ||
      this.validateTime(this.slotInput.value === false)
    ) {
      this.props.showToast("danger", "Wrong time format!");
    } else if (this.startInput.value >= this.endInput.value) {
      this.props.showToast(
        "danger",
        "End time cannot be bigger than start time."
      );
    } else {
      this.props.onAdminSetSchedule(
        this.startInput.value,
        this.endInput.value,
        this.slotInput.value
      );
      this.props.showToast(
        "success",
        "Schedule settings are saved successfully."
      );
    }
  };

  render() {
    return (
      <div
        className="border rounded"
        style={{ marginRight: 15, textAlign: "center", padding: 5 }}
      >
        <Container style={{ padding: 0 }}>
          <Row style={{ marginBottom: 15 }}>
            <Col xs={12}>
              <span style={{ fontSize: "1.5em" }}>Admin Panel</span>
            </Col>
          </Row>
          <Row style={{ marginBottom: 5 }}>
            <Col xs={12}>
              <span style={{ fontSize: "0.8em" }}>Rooms</span>
            </Col>
          </Row>
          <Row style={{ padding: 0, margin: 0 }}>
            <Col xs={12} style={{ padding: 0 }}>
              <Form className="self-align-center">
                <FormControl
                  ref={ref => {
                    this.roomInput = ref;
                  }}
                  size="sm"
                  placeholder="Room name..."
                  style={{ marginBottom: 5 }}
                />
              </Form>
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col>
              <Button
                xs={6}
                size="sm"
                variant="dark"
                style={{ marginRight: 5, marginLeft: 5 }}
                onClick={() => {
                  this.handleAddDeleteClick(1);
                }}
              >
                Add
              </Button>
              <Button
                xs={6}
                size="sm"
                variant="danger"
                style={{ marginRight: 5, marginLeft: 5 }}
                onClick={() => {
                  this.handleAddDeleteClick(-1);
                }}
              >
                Delete
              </Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: 5 }}>
            <Col xs={12}>
              <span style={{ fontSize: "0.8em" }}>Schedule Time</span>
            </Col>
          </Row>
          <Row style={{ padding: 0, margin: 0 }}>
            <Col xs={12} style={{ padding: 0 }}>
              <div>
                <Form className="self-align-center">
                  <Container>
                    <Row>
                      <Col xs={3}>
                        <span style={{ fontSize: "0.8em" }}>Start: </span>
                      </Col>
                      <Col xs={9}>
                        <FormControl
                          ref={ref => {
                            this.startInput = ref;
                          }}
                          size="sm"
                          placeholder="XX:XX"
                          style={{ marginBottom: 5 }}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={3}>
                        <span style={{ fontSize: "0.8em" }}>End: </span>
                      </Col>
                      <Col xs={9}>
                        <FormControl
                          ref={ref => {
                            this.endInput = ref;
                          }}
                          size="sm"
                          placeholder="XX:XX"
                          style={{ marginBottom: 5 }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={3}>
                        <span style={{ fontSize: "0.8em" }}>Slot: </span>
                      </Col>
                      <Col xs={9}>
                        <FormControl
                          ref={ref => {
                            this.slotInput = ref;
                          }}
                          size="sm"
                          placeholder="XX:XX"
                          style={{ marginBottom: 5 }}
                        />
                      </Col>
                    </Row>
                  </Container>
                </Form>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                size="sm"
                variant="dark"
                onClick={this.handleSetScheduleClick}
              >
                Apply
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AdminPanel;
