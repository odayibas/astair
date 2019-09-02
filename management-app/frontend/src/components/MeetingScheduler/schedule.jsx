import React, { Component } from "react";
import { Table, Button, Col, Row } from "react-bootstrap";
import update from "immutability-helper";
import { fontSize } from "@material-ui/system";
import { Container } from "@material-ui/core";

class Schedule extends Component {
  prevLoc = { x: -1, y: -1 };
  pressedLoc = { x: -1, y: -1 };
  slotArrayString = [];
  slotArrayRangeString = [];
  timeSlots;
  pressed = false;
  loaded = false;
  index = 0;
  state = { scheduleID: 0, today: {}, readyForDisplay: false };
  numberOfCol = 0;
  numberOfRow = 0;
  firstSchedule = [];
  selectedSlots;
  dir = "";
  week;
  weekString;
  today;
  scheduleMap;
  pressedForeign;
  actualDayOfToday;

  constructor(props) {
    super(props);
    // this.loadSettings(props);
  }

  loadSettings = (props = this.props) => {
    this.timeSlots = this.getTimeSlots(props);
    this.prepareSlotArrayString(this.timeSlots);
    this.numberOfCol = props.headerRow.length + 1;
    this.numberOfRow = this.slotArrayString.length;
    this.firstSchedule = this.getEmptyArray(this.numberOfRow, this.numberOfCol);
    this.selectedSlots = new Set();
    this.getWeek(props);
    this.actualDayOfToday = new Date();
    this.state.schedule = this.convertMeetingsToLocations(
      props.meetings,
      props.roomset
    );
  };

  componentWillReceiveProps(newProps) {
    // if (newProps.timeSlot !== this.props.timeSlot) {
    //   console.log("Hell yeah", newProps.timeSlot);
    //   this.loadSettings(newProps);                       GOT AN ERROR
    // }
  }

  getEmptyArray = (rows, cols) => {
    let result = [];
    for (let i = 0; i < rows; i++) {
      let row = new Array(cols);
      result.push(row);
    }
    return result;
  };

  componentDidMount() {
    this.props.onRef(this);
    // this.setState({ schedule: this.firstSchedule });
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  componentDidUpdate() {
    if (this.loaded === false) {
      if (this.props.timeSlot) {
        this.loadSettings(this.props);
        this.loaded = true;
      }
    } else {
      if (this.state.scheduleID !== this.props.scheduleID) {
        if (this.props.meetings && this.props.roomset) {
          this.setState({
            schedule: this.convertMeetingsToLocations(
              this.props.meetings,
              this.props.roomset
            )
          });
        }
        this.setState({ scheduleID: this.props.scheduleID });
        // this.firstSchedule = JSON.parse(JSON.stringify(this.props.schedule));
        // this.setState({ schedule: this.firstSchedule });
      }
      // IF TODAY CHANGES (NOTE THAT SCHEDULE SHOULD ALSO CHANGE. FIX IT)
      if (this.state.today !== this.props.today) {
        this.getWeek();
      }
      // FIRST DISPLAY AFTER DATA FETCH
      if (this.state.readyForDisplay !== this.props.readyForDisplay) {
        this.setState({
          schedule: this.convertMeetingsToLocations(
            this.props.meetings,
            this.props.roomset
          )
        });
        const b = this.props.readyForDisplay;
        this.setState({ readyForDisplay: b });
      }
    }
    // IF ROOM CHANGES
  }

  indexRow = arr => {
    let result = [];
    arr.map(item => {
      result.push({
        id: this.index,
        value: item
      });
      this.index++;
      if (this.index === this.numberOfCol * this.numberOfRow) this.index = 0;
    });
    return result;
  };

  decodeLocation = id => {
    return {
      x: Math.floor(id / this.numberOfCol),
      y: Math.floor(id % this.numberOfCol)
    };
  };

  convertMeetingsToLocations = (
    meetings,
    selectedRooms,
    newProps = this.props
  ) => {
    this.scheduleMap = [];
    for (let i = 0; i < this.numberOfRow; i++) {
      this.scheduleMap.push(new Array(this.numberOfCol));
    }
    let result = [];
    for (let i = 0; i < this.numberOfRow - 1; i++) {
      let currentRow = [];
      for (let j = 0; j < this.numberOfCol - 1; j++) {
        let value = 0;
        currentRow.push(value);
      }
      result.push(currentRow);
    }
    meetings.forEach(meeting => {
      // console.log("The meeting is", meeting);
      const curTime = meeting.start;
      const x = this.slotArrayString.indexOf(this.convertTimeToString(curTime));
      // console.log("Found x: ", x);
      if (x !== -1) {
        let y = 0;
        for (let i = 0; i < this.week.length; i++) {
          const day = this.week[i];
          if (day.day === meeting.date.day) {
            break;
          }
          y++;
        }
        if (newProps.rooms) {
          const index = newProps.rooms.indexOf(meeting.room);
          if (index !== -1) {
            if (
              selectedRooms.has(index) &&
              x + 1 < this.numberOfRow &&
              y + 1 < this.numberOfCol
            ) {
              // construct a map key: roomname | value: roomID
              // console.log("The block should be added");

              if (!this.scheduleMap[x][y]) {
                this.scheduleMap[x][y] = [];
              }
              this.scheduleMap[x][y].push(meeting);
              if (result[x][y] === 0) result[x][y] = index + 2;
              else if (result[x][y] !== index + 2) result[x][y] = -1;
            }
          }
        }
      }
    });
    return result;
  };

  getWeek = (props = this.props) => {
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    // if (this.numberOfCol === 1) {
    //   days = ["Today"];
    // }
    let week = new Array(days.length);
    let weekString = new Array(days.length);
    const permToday = new Date(props.today);
    this.setState({ today: props.today });
    for (let i = 0; i <= days.length - 1; i++) {
      const todayDate = permToday;
      const todayDay = todayDate.getDay() - 1;
      const newDay = new Date(
        todayDate.setDate(todayDate.getDate() - (todayDay - i))
      );
      weekString[i] =
        days[i] +
        " \n " +
        newDay.getDate() +
        "." +
        (newDay.getMonth() + 1) +
        "." +
        newDay.getFullYear();
      week[i] = {
        year: newDay.getFullYear(),
        month: newDay.getMonth() + 1,
        day: newDay.getDate()
      };
    }
    this.week = week;
    this.weekString = weekString;
  };

  clearSchedule = (callback = undefined) => {
    this.setState(
      {
        schedule: this.convertMeetingsToLocations(
          this.props.meetings,
          this.props.roomset
        )
      },
      () => {
        if (callback !== undefined) callback();
      }
    );

    this.selectedSlots.clear();
    this.props.onSummary("hide");
    // this.setState({ schedule: this.firstSchedule }, () => {
    //   if (callback !== undefined) callback();
    // });
  };

  decodeID = loc => {
    return loc.x * this.numberOfCol + loc.y;
  };

  updateSchedule = (loc, value) => {
    if (loc.x > 0 && loc.y > 0) {
      if (value === 0) {
        this.selectedSlots.delete(this.decodeID(loc));
      } else {
        this.selectedSlots.add(this.decodeID(loc));
      }

      let newSchedule = update(this.state.schedule, {
        [loc.x - 1]: {
          [loc.y - 1]: { $set: value }
        }
      });
      this.setState({ schedule: newSchedule });
    }
  };

  handleClick = id => {};

  handleEnter = id => {
    let loc = this.decodeLocation(id);

    if (loc.x > 0 && loc.y > 0 && this.pressed) {
      if (this.pressedLoc.x !== -1) {
        if (this.pressedLoc.x > loc.x) {
          this.dir = "up";
        } else if (this.pressedLoc.x < loc.x) {
          this.dir = "down";
        }
      }

      let minVal = loc.x;
      let maxVal = this.pressedLoc.x;
      if (maxVal < minVal) {
        minVal = this.pressedLoc.x;
        maxVal = loc.x;
      }
      // This method did not work for avoiding skipping slots :(
      // for (let i = minVal; i <= maxVal; i++) {
      //   console.log(i, this.pressedLoc.y);
      //   this.updateSchedule({ x: i, y: this.pressedLoc.y }, 1);
      // }

      const val = this.state.schedule[loc.x - 1][this.pressedLoc.y - 1];
      const prevVal = this.state.schedule[this.prevLoc.x - 1][
        this.pressedLoc.y - 1
      ];
      if (val !== 0 && val !== 1) return;
      this.updateSchedule({ x: loc.x, y: this.pressedLoc.y }, 1);
      if (
        (this.prevLoc.x < loc.x && this.dir === "up") ||
        (this.prevLoc.x > loc.x && this.dir === "down")
      ) {
        // delete
        if (prevVal === 1)
          this.updateSchedule({ x: this.prevLoc.x, y: this.pressedLoc.y }, 0);
      }
    }
  };

  handleLeave = id => {
    let loc = this.decodeLocation(id);
    this.prevLoc = {
      x: loc.x,
      y: loc.y
    };
  };

  handleDown = id => {
    console.log("Check 1 ");
    let loc = this.decodeLocation(id);
    if (loc.x <= 0 || loc.y <= 0) return;
    const val = this.state.schedule[loc.x - 1][loc.y - 1];

    console.log("Check 2 ");

    if (val !== 0 && val !== 1) {
      this.pressedForeign = true;
      this.clearSchedule();
      this.props.displayMeetingInfo(
        this.scheduleMap[loc.x - 1][loc.y - 1][0].id
      ); // Room a gore index sec
      return;
    }
    this.pressedForeign = false;
    console.log("Check 3 ");

    this.clearSchedule(() => {
      if (loc.x > 0 && loc.y > 0) {
        this.pressed = true;
        this.pressedLoc = {
          x: loc.x,
          y: loc.y
        };
        this.updateSchedule(loc, 1);
        console.log("Check 4 ");
      }
    });
  };

  isWithin = (first, second) => {
    console.log(first, second);
    let diff =
      second.hours * 60 + second.minutes - (first.hours * 60 + first.minutes);
    let interval =
      this.props.timeSlot.interval.hours * 60 +
      this.props.timeSlot.interval.minutes;
    if (diff < 0 || diff > interval) return false;
    return true;
  };

  handleUp = id => {
    let loc = this.decodeLocation(id);
    if (loc.x > 0 && loc.y > 0 && !this.pressedForeign) {
      this.onSelected();
    }
    this.pressed = false;
    this.pressedLoc = {
      x: -1,
      y: -1
    };
  };
  getRow = (elements, part = "body") => {
    let whiteSpace = "pre-wrap";
    if (part === "body") whiteSpace = "nowrap";
    return (
      <tr>
        {elements.map(item => {
          let className = "text-center ";
          let text = "";
          if (item.id === 0) {
            // top left corner
            return (
              <th
                style={{
                  verticalAlign: "inherit",
                  textAlign: "-webkit-center"
                }}
              >
                <tr className="text-center">
                  <Container style={{ padding: 0 }}>
                    <Row>
                      <Col xs={6} style={{ padding: 5 }}>
                        <Button
                          className="btn-dark"
                          onClick={() => {
                            this.props.onNextSchedule(-1);
                          }}
                        >
                          {"<"}
                        </Button>
                      </Col>
                      <Col xs={6} style={{ padding: 5 }}>
                        <Button
                          className="btn-dark"
                          onClick={() => {
                            this.props.onNextSchedule(1);
                          }}
                        >
                          {">"}
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </tr>
              </th>
            );
          }
          if (typeof item.value === "string") {
            text = item.value;
            if (
              item.id % this.numberOfCol === this.actualDayOfToday.getDay() &&
              item.id < this.numberOfCol &&
              this.actualDayOfToday.getDate() === this.props.today.getDate() &&
              this.actualDayOfToday.getMonth() ===
                this.props.today.getMonth() &&
              this.actualDayOfToday.getFullYear() ===
                this.props.today.getFullYear()
            ) {
              className += " bg-danger";
            }
            if (
              item.id > this.numberOfCol &&
              item.id % this.numberOfCol === 0 &&
              this.isWithin(
                this.timeSlots[Math.floor(item.id / this.numberOfCol) - 1],
                {
                  hours: this.actualDayOfToday.getHours(),
                  minutes: this.actualDayOfToday.getMinutes()
                }
              ) === true
            ) {
              className += " bg-danger";
            }
          } else {
            if (item.value === -1) className += " bg-danger";
            else if (item.value === 0) className += "";
            else if (item.value === 1) className += " bg-white";
            else if (item.value === 2) className += " bg-success";
            else if (item.value === 3) className += " bg-info";
            else if (item.value === 4) className += " bg-warning";
            else if (item.value === 5) className += " bg-primary";
          }
          return (
            <th
              style={{
                MozUserSelect: "none",
                WebkitUserSelect: "none",
                msUserSelect: "none",
                whiteSpace: whiteSpace,
                fontSize: "1em"
              }}
              onClick={this.handleClick}
              onMouseDown={() => {
                this.handleDown(item.id);
              }}
              onMouseUp={() => {
                this.handleUp(item.id);
              }}
              onMouseEnter={() => {
                this.handleEnter(item.id);
              }}
              onMouseLeave={() => {
                this.handleLeave(item.id);
              }}
              className={className}
              key={item.id}
            >
              {text}
            </th>
          );
        })}
      </tr>
    );
  };

  getHead = () => {
    if (this.loaded === false) return;
    return this.getRow(this.indexRow(["", ...this.weekString]), "head");
  };

  getBody = () => {
    if (this.loaded === false) return;
    let i = 0;
    return this.state.schedule.map(row => {
      return this.getRow(
        this.indexRow([this.slotArrayRangeString[i++], ...row])
      );
    });
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

  prepareSlotArrayString = timeSlots => {
    let prevStr = undefined;
    for (const slot of timeSlots) {
      const str = this.convertTimeToString(slot);
      this.slotArrayString.push(str);
      if (prevStr) {
        this.slotArrayRangeString.push(prevStr + " - " + str);
      }
      prevStr = str;
    }
  };

  getTimeSlots = (newProps = this.props) => {
    var result = [];
    var current = JSON.parse(JSON.stringify(newProps.timeSlot.start)); // Deep copy. Might not be useful for another case.
    let interval = newProps.timeSlot.interval;

    result.push({ hours: current.hours, minutes: current.minutes });

    while (
      // While current time is less than end time.
      current.hours < newProps.timeSlot.end.hours ||
      (current.hours === newProps.timeSlot.end.hours &&
        current.minutes < newProps.timeSlot.end.minutes)
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

  onSelected = () => {
    let tempArr = Array.from(this.selectedSlots.values());
    let minLoc = this.decodeLocation(Math.min(...tempArr));
    let maxLoc = this.decodeLocation(Math.max(...tempArr));
    this.props.scheduleCallback(
      this.week[minLoc.y - 1],
      this.timeSlots[minLoc.x - 1],
      this.timeSlots[maxLoc.x]
    );
    this.props.onSummary("show");
  };

  render() {
    this.index = 0;
    return (
      <div style={{ height: 600, overflowY: "auto" }}>
        <Table
          responsive="xs"
          onMouseLeave={() => {
            this.pressed = false;
          }}
          striped
          bordered
          hover
          variant="dark"
        >
          <thead>{this.getHead()}</thead>
          <tbody>{this.getBody()}</tbody>
        </Table>
      </div>
    );
  }
}

export default Schedule;
