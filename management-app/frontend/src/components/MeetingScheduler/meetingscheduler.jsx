import React, { Component } from "react";
import Schedule from "./schedule";
import { Row, Col, Container, Button } from "react-bootstrap";
import update from "immutability-helper";
import ButtonPanel from "./sidePanel";

class MeetingScheduler extends Component {
  scheduleChild;
  multiRoomSelected = false;
  currentRooms;
  state = {
    summary: {},
    showSummary: false,
    creating: false,
    headerRow: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    timeSlot: {
      start: {
        hours: 7,
        minutes: 30
      },
      end: {
        hours: 17,
        minutes: 0
      },
      interval: {
        hours: 1,
        minutes: 0
      }
    },
    schedules: [
      [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [4, 0, 0, 0, 0],
        [4, 0, 0, 0, 0],
        [4, 0, 0, 0, 0],
        [4, 0, 4, 0, 0],
        [4, 0, 4, 0, 0],
        [4, 0, 4, 0, 0],
        [0, 0, 4, 0, 0],
        [0, 0, 4, 0, 0],
        [0, 0, 4, 0, 0]
      ],
      [
        [0, 0, 0, 0, 3],
        [0, 0, 3, 0, 3],
        [0, 3, 0, 0, 0],
        [0, 3, 0, 0, 0],
        [0, 3, 3, 0, 0],
        [0, 3, 3, 0, 0],
        [0, 3, 3, 0, 0],
        [0, 3, 3, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2],
        [0, 0, 2, 0, 2],
        [0, 0, 2, 2, 2],
        [0, 0, 2, 0, 0],
        [0, 2, 0, 2, 0],
        [0, 2, 0, 0, 0],
        [0, 2, 2, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ]
    ],
    rooms: ["Room A", "Room B", "Room C"],
    scheduleID: 0,
    multiSchedule: undefined,
    today: undefined
  };

  componentWillMount = () => {
    const today = new Date();
    this.setState({ today: today });
  };

  slotSelected = (day, start, end) => {
    console.log("Meeting Day:", day);
    console.log("Meeting Start:", start);
    console.log("Meeting End:", end);
    const summary = { day, start, end };
    this.setState({ summary: summary });
  };

  // This is for dropdown menu. Currently it is not being used.
  roomSelected = id => {
    this.updateSchedule(id);
  };

  updateSchedule = id => {
    this.setState({ scheduleID: id });
  };

  clearSchedule = () => {
    this.scheduleChild.clearSchedule();
  };

  mergeSchedules = roomset => {
    const arr = Array.from(roomset);
    let count = arr.length;
    let rows = this.state.schedules[0].length;
    let cols = this.state.schedules[0][0].length;
    let result = [];
    for (let i = 0; i < rows; i++) {
      let currentRow = [];
      for (let j = 0; j < cols; j++) {
        let value = 0;
        for (let k = 0; k < count; k++) {
          if (this.state.schedules[arr[k]][i][j] !== 0) {
            if (value > 0) value = -1;
            else if (value === 0) value = this.state.schedules[arr[k]][i][j];
          }
        }
        currentRow.push(value);
      }
      result.push(currentRow);
    }
    return result;
  };

  handleMultiRoomSelected = roomset => {
    if (roomset.size > 1) {
      this.multiRoomSelected = true;
      const tempMultiSchedule = this.mergeSchedules(roomset);
      this.setState({ multiSchedule: tempMultiSchedule }, () => {});
      this.setState({ scheduleID: {} });
    } else {
      this.setState({ scheduleID: roomset.values().next().value });
      this.multiRoomSelected = false;
    }
  };

  getProperSchedule = () => {
    if (this.multiRoomSelected) {
      return this.state.multiSchedule;
    } else {
      return this.state.schedules[this.state.scheduleID];
    }
  };

  handleNextSchedule = act => {
    const today = this.state.today;
    let newDay;
    this.setState({ today: today });
    if (act === 1) {
      today.setDate(today.getDate() + 7);
    } else if (act === -1) {
      today.setDate(today.getDate() - 7);
    }
    newDay = new Date(today);
    this.setState({ today: newDay });
  };

  handleCreateMeeting = () => {
    this.setState({ creating: true });
  };

  handleSummary = action => {
    if (action === "show") {
      this.setState({ showSummary: true });
    } else if (action === "hide") {
      this.setState({ showSummary: false });
    } else {
      console.log("[ERROR] Invalid type of action");
    }
  };

  getScheduleToBeRendered = () => {
    if (this.state.creating === true) {
      return;
    } else {
      return (
        <Schedule
          onRef={ref => (this.scheduleChild = ref)}
          today={this.state.today}
          headerRow={this.state.headerRow}
          schedule={this.getProperSchedule()}
          scheduleID={this.state.scheduleID}
          timeSlot={this.state.timeSlot}
          scheduleCallback={(day, start, end) => {
            this.slotSelected(day, start, end);
          }}
          onSummary={action => {
            this.handleSummary(action);
          }}
        />
      );
    }
  };

  render() {
    return (
      <Container>
        <Row>
          {/* <Col md={2}>
            <div />
          </Col> */}
          <Col md={9}>
            <div>{this.getScheduleToBeRendered()}</div>
          </Col>
          <Col md={3}>
            <div style={{ textAlign: "center" }}>
              <ButtonPanel
                onMultiRoomSelected={roomset => {
                  this.handleMultiRoomSelected(roomset);
                }}
                rooms={this.state.rooms}
                onClear={this.clearSchedule}
                onSelected={id => {
                  this.roomSelected(id);
                }}
                onNextSchedule={this.handleNextSchedule}
                onCreateMeeting={this.handleCreateMeeting}
                showSummary={this.state.showSummary}
                summaryData={this.state.summary}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MeetingScheduler;
