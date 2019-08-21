import React, { Component } from "react";
import { Table } from "react-bootstrap";
import update from "immutability-helper";

class Schedule extends Component {
  prevLoc = { x: -1, y: -1 };
  pressedLoc = { x: -1, y: -1 };
  slotArrayString = [];
  timeSlots;
  pressed = false;
  index = 0;
  state = { schedule: [], scheduleID: 0, today: {} };
  numberOfCol = 0;
  numberOfRow = 0;
  firstSchedule = [];
  selectedSlots;
  dir = "";
  week;
  weekString;
  today;

  constructor(props) {
    super(props);
    this.firstSchedule = JSON.parse(JSON.stringify(this.props.schedule));
    this.timeSlots = this.getTimeSlots();
    this.prepareSlotArrayString(this.timeSlots);
    this.numberOfCol = props.headerRow.length + 1;
    this.numberOfRow = this.slotArrayString.length + 1;
    this.selectedSlots = new Set();
    this.getWeek();
  }

  componentDidMount() {
    this.props.onRef(this);
    this.setState({ schedule: this.firstSchedule });
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  componentDidUpdate() {
    // IF ROOM CHANGES
    if (this.state.scheduleID !== this.props.scheduleID) {
      this.setState({ scheduleID: this.props.scheduleID });
      this.firstSchedule = JSON.parse(JSON.stringify(this.props.schedule));
      this.setState({ schedule: this.firstSchedule });
    }
    // IF TODAY CHANGES (NOTE THAT SCHEDULE ALSO CHANGES. FIX IT)
    if (this.state.today !== this.props.today) {
      console.log("Today changes");
      this.getWeek();
    }
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

  getWeek = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    let week = new Array(5);
    let weekString = new Array(5);
    const permToday = new Date(this.props.today);
    this.setState({ today: this.props.today });
    for (let i = 0; i <= 4; i++) {
      const todayDate = permToday;
      const todayDay = todayDate.getDay() - 1;
      const newDay = new Date(
        todayDate.setDate(todayDate.getDate() - (todayDay - i))
      );
      weekString[i] =
        days[i] +
        " " +
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
    console.log("DEBUG", this.week);
    this.weekString = weekString;
  };

  clearSchedule = (callback = undefined) => {
    // Ilk basta bir tane degiskende tablonun ilk hali tutulabilir. Çünkü ileride
    // Tablo önceden dolmuş olabilir. Tamamen 0 yapmak mantıklı değil.

    // const cleanRow = Array.from(Array(this.numberOfCol - 1), () => 0);
    // const schedule = Array.from(Array(this.numberOfRow - 1), () => cleanRow);

    this.selectedSlots.clear();
    this.props.onSummary("hide");
    this.setState({ schedule: this.firstSchedule }, () => {
      if (callback !== undefined) callback();
    });
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
      /* for (let i = minVal; i <= maxVal; i++) {
        console.log(i, this.pressedLoc.y);
      this.updateSchedule({ x: i, y: this.pressedLoc.y }, 1);
        
      } */
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
    let loc = this.decodeLocation(id);
    if (loc.x <= 0 || loc.y <= 0) return;
    const val = this.state.schedule[loc.x - 1][loc.y - 1];

    if (val !== 0) return;
    this.clearSchedule(() => {
      if (loc.x > 0 && loc.y > 0) {
        this.pressed = true;
        this.pressedLoc = {
          x: loc.x,
          y: loc.y
        };
        this.updateSchedule(loc, 1);
      }
    });
  };

  handleUp = id => {
    this.pressed = false;
    this.pressedLoc = {
      x: -1,
      y: -1
    };
    this.onSelected();
  };

  getRow = elements => {
    return (
      <tr>
        {elements.map(item => {
          let className = "text-center ";
          let text = "";
          if (typeof item.value === "string") {
            text = item.value;
          } else {
            if (item.value === -1) className += " bg-danger";
            else if (item.value === 0) className += "";
            else if (item.value === 1) className += " bg-white";
            else if (item.value === 2) className += " bg-success";
            else if (item.value === 3) className += " bg-info";
            else if (item.value === 4) className += " bg-warning";
          }
          return (
            <th
              style={{
                MozUserSelect: "none",
                WebkitUserSelect: "none",
                msUserSelect: "none"
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
    return this.getRow(this.indexRow(["", ...this.weekString]));
  };

  getBody = () => {
    let i = 0;
    return this.state.schedule.map(row => {
      return this.getRow(this.indexRow([this.slotArrayString[i++], ...row]));
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
    for (const slot of timeSlots) {
      this.slotArrayString.push(this.convertTimeToString(slot));
    }
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
      this.timeSlots[maxLoc.x - 1]
    );
    this.props.onSummary("show");
  };

  render() {
    this.index = 0;
    return (
      <Table
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
    );
  }
}

export default Schedule;
