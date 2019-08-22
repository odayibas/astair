import React, { Component } from "react";
import Schedule from "./schedule";
import { Row, Col, Container, Button } from "react-bootstrap";
import update from "immutability-helper";
import ButtonPanel from "./sidePanel";
import axios from "axios";

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

class MeetingScheduler extends Component {
  numberOfRows = 0;
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

  convertDateToString = (d, priority = "day") => {
    let years = "";
    let days = "";
    let months = "";
    if (d.month < 10) {
      months += "0";
    }
    months += d.month;
    if (d.day < 10) {
      days += "0";
    }
    days += d.day;
    years += d.year;
    if (priority === "day") {
      return days + "." + months + "." + years;
    } else if (priority === "year") {
      return years + "." + months + "." + days;
    }
  };

  componentWillMount = () => {
    const today = new Date();
    this.setState({ today: today });
  };

  getWeek = (day = undefined) => {
    let week = new Array(5);
    const permToday = new Date(this.state.today);
    this.setState({ today: this.props.today });
    for (let i = 0; i <= 4; i++) {
      const todayDate = permToday;
      const todayDay = todayDate.getDay() - 1;
      const newDay = new Date(
        todayDate.setDate(todayDate.getDate() - (todayDay - i))
      );
      week[i] = {
        year: newDay.getFullYear(),
        month: newDay.getMonth() + 1,
        day: newDay.getDate()
      };
    }
    return week;
  };

  getTimeSlots = () => {
    var result = [];
    var current = JSON.parse(JSON.stringify(this.props.timeSlot.start)); // Deep copy. Might not be useful for another case.
    let interval = this.props.timeSlot.interval;

    result.push({ hours: current.hours, minutes: current.minutes });

    while (
      // While current time is less than end time.
      current.hours < this.props.timeSlot.end.hours ||
      (current.hours === this.props.timeSlot.end.hours &&
        current.minutes < this.props.timeSlot.end.minutes)
    ) {
      this.numberOfRows++;
      current.hours += interval.hours;
      current.minutes += interval.minutes;
      current.hours += Math.floor(current.minutes / 60);
      current.minutes %= 60;
      result.push({
        hours: current.hours,
        minutes: current.minutes
      });
    }
    console.log(this.numberOfRows);
    return result;
  };

  getTimeSlots = () => {
    var result = [];
    var current = JSON.parse(JSON.stringify(this.state.timeSlot.start)); // Deep copy. Might not be useful for another case.
    let interval = this.state.timeSlot.interval;

    result.push({ hours: current.hours, minutes: current.minutes });

    while (
      // While current time is less than end time.
      current.hours < this.state.timeSlot.end.hours ||
      (current.hours === this.state.timeSlot.end.hours &&
        current.minutes < this.state.timeSlot.end.minutes)
    ) {
      current.hours += interval.hours;
      current.minutes += interval.minutes;
      current.hours += Math.floor(current.minutes / 60);
      current.minutes %= 60;
      result.push({
        hours: current.hours,
        minutes: current.minutes
      });
    }
    return result;
  };

  getScheduleArray = () => {
    let thisWeek = this.getWeek();
    console.log("ThisWeek", thisWeek);
    let weekData = this.fetchMeetings(
      this.convertDateToString(thisWeek[0], "year"),
      this.convertDateToString(thisWeek[4], "year")
    );
    if (weekData) {
      let tempSchedule = this.constructScheduleFromMeetings(weekData);
    }
  };

  constructScheduleFromMeetings = meetings => {
    console.log("Construct method", meetings);
  };

  fetchMeetings = (startDate, endDate) => {
    console.log("Data fetching from database...");
    axios
      .get(
        urlServer + "/meeting/get-meeting-a-range/" + startDate + "/" + endDate
      )
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch(err => {
        console.log("****", err);
      });
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

  handleSummary = action => {
    if (action === "show") {
      this.setState({ showSummary: true });
      this.getScheduleArray();
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
