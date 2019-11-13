import React, { Component } from "react";
import Schedule from "./components/Schedule/schedule";
import { Row, Col, Container } from "react-bootstrap";
import ButtonPanel from "./components/SidePanel/sidePanel";
import Dialog from "./dialog";
import { get as getCookie } from "es-cookie";
import AdminPanel from "./components/AdminPanel/adminpanel";
import { connect } from 'react-redux'
import { getTimeSlotFromDatabase, fetchRooms, fetchParticipants, fetchMeetings, getAvailableRooms, postMeeting, addRoom, deleteRoom, deleteAllMeetings, adminSetSchedule } from '../../services/session/MeetingScheduler/actions';
import { convertStringToDate, convertStringToTime, convertTimeToString, convertDateToString } from "../../components/dateTimeConverter";
import { showToast, hideToast } from "../../services/session/Toast/actions";

class MeetingScheduler extends Component {
  numberOfRows = 0;
  scheduleChild;
  multiRoomSelected = false;
  currentRooms;
  description = "";
  allParticipants = [];
  selectedParticipants = new Set([]);
  checkedCount = 0;
  state = {
    showDialog: false,
    readyForDisplay: false,
    summary: {},
    showSummary: false,
    creating: false,
    showWeekly: true,
    roomset: new Set([]), // Degistir
    // headerRow: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    headerRow: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    // timeSlot: {
    //   start: {
    //     hours: 7,
    //     minutes: 0
    //   },
    //   end: {
    //     hours: 17,
    //     minutes: 0
    //   },
    //   interval: {
    //     hours: 1,
    //     minutes: 0
    //   }
    // },
    timeSlot: undefined,
    rooms: undefined,
    meetings: [],
    rawMeetings: [],
    scheduleID: 0,
    multiSchedule: undefined,
    today: undefined
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onGetTimeSlotFromDatabase().then(data => {
      const start = convertStringToTime(data.beginSlot);
      const end = convertStringToTime(data.finishSlot);
      const interval = convertStringToTime(data.durationSlot);
      console.log("", start, end, interval)
      this.setState({
        timeSlot:
        {
          start, end, interval
        }
      });
    })


    const s = new Set();
    this.setState({ roomset: s });
    this.props.onFetchRooms().then(rooms => {
      this.setState({ rooms: rooms });
    })

    this.getMeetingsFromDatabase();
    this.props.onFetchParticipants().then(list => {
      this.allParticipants = list;
    })




  }



  componentWillMount = () => {
    const today = new Date();
    this.setState({ today: today });
  };

  getWeek = (day = undefined) => {
    let week = new Array(5);
    const permToday = new Date(this.state.today);
    // console.log("The day being processed is ", permToday);
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

  getSelectedRoomsAsStrings = () => {
    let result = [];
    this.state.roomset.forEach(item => {
      result.push(this.state.rooms[item]);
    });
    // console.log("As strings ", result);
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

  getMeetingsFromDatabase = (callback = undefined) => {
    let thisWeek = this.getWeek();
    // console.log("The week is", thisWeek);
    this.props.onFetchMeetings(
      convertDateToString(thisWeek[0], "year"),
      convertDateToString(thisWeek[4], "year"),
      callback
    ).then(data => {
      this.processData(data, callback);

    })
  };

  constructScheduleFromMeetings = (meetings, selected) => {
    // This function is not that fast. It can be improved.

    let allBlocks = [];
    meetings.forEach(meeting => {
      allBlocks = [...allBlocks, ...this.divideMeeting(meeting)];
    });
    // console.log("All the blocks", allBlocks);
    return allBlocks;
  };

  divideMeeting = meeting => {
    // console.log("The main meeting is ", meeting);
    let interval = this.state.timeSlot.interval;
    let result = [];
    const start = meeting.start;

    let current = JSON.parse(JSON.stringify(start));
    while (
      // While current time is less than end time.
      current.hours < meeting.end.hours ||
      (current.hours === meeting.end.hours &&
        current.minutes < meeting.end.minutes)
    ) {
      const temp = JSON.parse(JSON.stringify(current));
      current.hours += interval.hours;
      current.minutes += interval.minutes;
      current.hours += Math.floor(current.minutes / 60);
      current.minutes %= 60;
      const endTemp = JSON.parse(JSON.stringify(current));
      result.push({
        room: meeting.room,
        date: meeting.date,
        start: temp,
        end: endTemp,
        id: meeting.id,
        username: meeting.username,
        participants: meeting.participants,
        description: meeting.description
      });
    }
    // console.log(result);
    return result;
  };

  processData = (data, callback = undefined) => {
    let meetingArray = this.decodeMeetingData(data);
    this.setState({ rawMeetings: meetingArray });
    // console.log("Meeting Data is ready for processing ", meetingArray);
    // CONSTRUCT SCHEDULE ARRAY
    this.setState(
      {
        meetings: this.constructScheduleFromMeetings(meetingArray)
      },
      () => {
        // console.log("Meetings are ready to forward.");
        const b = !this.state.readyForDisplay;
        this.setState({ readyForDisplay: b });
        this.handleSummary("hide");
        if (callback) callback();
      }
    );
  };





  decodeMeetingData = dataArr => {
    let meetingArray = [];
    for (let i = 0; i < dataArr.length; i++) {
      let element = dataArr[i];
      // const participants = element.participants.split(",");
      // const description = element.description;
      const participants = element.participants;
      const username = element.username;
      const description = element.description;
      const date = convertStringToDate(element.date, "year");
      const start = convertStringToTime(element.startTime);
      const end = convertStringToTime(element.endTime);
      const room = element.room;
      meetingArray.push({
        id: i,
        date,
        start,
        end,
        room,
        username,
        description,
        participants
      });
    }
    // console.log("Data fetched from database", meetingArray);
    return meetingArray;
  };



  getCheckedCount = count => {
    this.checkedCount = count;
  };

  slotSelected = (date, start, end) => {
    // console.log("Meeting date:", date);
    // console.log("Meeting Start:", start);
    // console.log("Meeting End:", end);
    // if (this.state.roomset.size === 0) {
    console.log("date", convertDateToString(date, "year"))
    console.log(date)
    let convertedDate = convertDateToString(date, "year");
    let convertedStart = convertTimeToString(start);
    let convertedEnd = convertTimeToString(end);
    if (this.checkedCount === 0) {
      this.props.onGetAvailableRooms(convertedDate, convertedStart, convertedEnd, this.state.rooms).then(newSet => {
        console.log("newSet", newSet)
        this.setState({ roomset: newSet }, () => {
          // Show Dialog
          // console.log("Current roomset", this.state.roomset);
          this.setShowDialog(true);
        });
      })
    }
    const room = this.state.rooms[this.state.roomset.values().next().value];
    const summary = { date, start, end, room };
    this.setState({ summary: summary }, () => {
      console.log("Debug", this.state.roomset);
      if (this.checkedCount !== 0) {
        this.setShowDialog(true);
      }
    });
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
    this.getMeetingsFromDatabase(() => {
      if (roomset.size > 1) {
        this.multiRoomSelected = true;
        // const tempMultiSchedule = this.mergeSchedules(roomset);
        const copy = new Set(roomset);
        // console.log("Copy", copy);
        this.setState({ roomset: copy });
        // this.setState({ multiSchedule: tempMultiSchedule }, () => {});
        this.setState({ scheduleID: {} });
      } else {
        const copy = new Set(roomset);
        // console.log("Copy", copy);
        this.setState({ roomset: copy });
        this.setState({ scheduleID: roomset.values().next().value });
        this.multiRoomSelected = false;
      }
      this.handleSummary("hide");
    });
  };

  // getProperSchedule = () => {
  //   if (this.multiRoomSelected) {
  //     return this.state.multiSchedule;
  //   } else {
  //     return this.state.schedules[this.state.scheduleID];
  //   }
  // };

  setDescription = desc => {
    this.description = desc;
  };



  handleRangeClick = range => {
    if (range === "Day") {
      this.setState({ headerRow: ["Today"] }, () => {
        this.setState({ showWeekly: false });
      });
    } else {
      this.setState(
        {
          headerRow: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        },
        () => {
          this.setState({ showWeekly: true });
        }
      );
    }
  };

  cancelCreating = () => {
    if (this.checkedCount === 0) {
      let newSet = new Set([]);
      this.setState({ roomset: newSet });
    }
  };

  displayMeetingInfo = meetingID => {
    const meeting = this.state.rawMeetings[meetingID];
    const summary = {
      date: meeting.date,
      start: meeting.start,
      end: meeting.end,
      room: meeting.room,
      description: meeting.description,
      participants: meeting.participants,
      username: meeting.username
    };
    this.setState({ summary: summary }, () => { });
    console.log("Meeting displayed", summary);
    this.handleSummary("show");
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
    this.setState({ today: newDay }, () => {
      this.getMeetingsFromDatabase();
    });
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
          checkedCount={this.checkedCount}
          onNextSchedule={this.handleNextSchedule}
          showToast={this.props.showToast}
          hideToast={this.props.hideToast}
          readyForDisplay={this.state.readyForDisplay}
          onRef={ref => (this.scheduleChild = ref)}
          today={this.state.today}
          headerRow={this.state.headerRow}
          meetings={this.state.meetings}
          roomset={this.state.roomset}
          scheduleID={this.state.scheduleID}
          timeSlot={this.state.timeSlot}
          displayMeetingInfo={meeting => {
            this.displayMeetingInfo(meeting);
          }}
          rooms={this.state.rooms}
          scheduleCallback={(date, start, end) => {
            this.slotSelected(date, start, end);
          }}
          onSummary={action => {
            this.handleSummary(action);
          }}
        />
      );
    }
  };

  handleAddRoom = room => {
    if (this.state.rooms.indexOf(room) !== -1) {
      this.props.showToast("warning", "The room already exists!")
      setTimeout(() => {
        this.props.hideToast()
      }, 5000);
    }
    else {
      this.props.onAddRoom(room, this.state.rooms)
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  };

  handleDeleteAllMeetings = () => {
    this.props.onDeleteAllMeetings().then(res => {
      this.props.onShowToast(
        "success",
        "All the meetings have been deleted successfully."
      )
      setTimeout(() => {
        this.props.onHideToast();
        window.location.reload();

      }, 5000);

    })
  }

  handleAdminSetSchedule = (start, end, slot) => {
    this.props.onAdminSetSchedule(start, end, slot).then(timeSlot => {
      this.setState({ timeSlot: timeSlot });
      window.location.reload();
    })
  }

  handleDeleteRoom = room => {
    if (this.state.rooms.indexOf(room) === -1) {
      this.props.showToast("warning", "There is no such room!")
      setTimeout(() => {
        this.props.hideToast()
      }, 5000);
    }
    else {
      this.props.onDeleteRoom(room, this.state.rooms)
      setTimeout(() => {
        this.props.onHideToast();
        window.location.reload();

      }, 5000);
    }
  };

  handleCreateMeeting = room => {
    // this.postMeeting(this.state.summary);
    //this.setShowDialog(true);
    let participants = "";
    this.selectedParticipants.forEach(i => {
      participants += this.allParticipants[i] + ",";
    });
    console.log("Summary, ", this.state.summary);
    const dataPosted = {
      participants,
      room: room,
      date: this.state.summary.date,
      start: this.state.summary.start,
      end: this.state.summary.end,
      username: "From frontend",
      description: this.description
    };
    this.props.onPostMeeting(dataPosted).then(res => {
      this.getMeetingsFromDatabase();

    });
  };

  setShowDialog = b => {
    this.setState({ showDialog: b });
  };

  updateParticipants = participants => {
    this.selectedParticipants = new Set(participants);
  };

  getAdminPanel = () => {
    if (getCookie("usertoken") === "1") {
      return (
        <AdminPanel
          deleteAllMeetings={this.handleDeleteAllMeetings}
          onAdminSetSchedule={this.handleAdminSetSchedule}
          onAddRoom={this.handleAddRoom}
          onDeleteRoom={this.handleDeleteRoom}
        ></AdminPanel>
      );
    } else return;
  };

  render() {
    return (
      <Container>
        <Row className="flex-row">
          <Col md={2} style={{ padding: 0 }}>
            {this.getAdminPanel()}
          </Col>
          <Col md={8} style={{ padding: 0 }}>
            <div>{this.getScheduleToBeRendered()}</div>
          </Col>
          <Col md={2} style={{ padding: 0 }}>
            <div style={{ textAlign: "center" }}>
              <ButtonPanel
                getCheckedCount={this.getCheckedCount}
                showWeekly={this.state.showWeekly}
                showToast={this.props.showToast}
                hideToast={this.props.hideToast}
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
                onShowDialog={b => {
                  this.setShowDialog(b);
                }}
                onRangeClick={this.handleRangeClick}
              />
            </div>
          </Col>
        </Row>
        <Dialog
          cancelCreating={this.cancelCreating}
          showToast={this.props.showToast}
          hideToast={this.props.hideToast}
          updateParticipants={participants => {
            this.updateParticipants(participants);
          }}
          setDescription={desc => {
            this.setDescription(desc);
          }}
          onCreateMeeting={this.handleCreateMeeting}
          data={this.state.summary}
          rooms={this.getSelectedRoomsAsStrings()}
          show={this.state.showDialog}
          allParticipants={this.allParticipants}
          onHide={() => {
            this.setShowDialog(false);
          }}
        />
      </Container>
    );
  }
}

const mapStatetoProps = (state) => {
  console.log("mapStatetoProps", state)
  return { data: state.data, error: state.error }
}

const mapDispatchprops = (dispatch) => {
  return {
    onGetTimeSlotFromDatabase: () => dispatch(getTimeSlotFromDatabase()),
    onFetchParticipants: () => dispatch(fetchParticipants()),
    onFetchRooms: () => dispatch(fetchRooms()),
    onFetchMeetings: (startDate, endDate, callback) => dispatch(fetchMeetings(startDate, endDate, callback)),
    onGetAvailableRooms: (date, startTime, endTime, rooms) => dispatch(getAvailableRooms(date, startTime, endTime, rooms)),
    onPostMeeting: (dataPosted) => dispatch(postMeeting(dataPosted)),
    onAddRoom: (room, rooms) => dispatch(addRoom(room, rooms)),
    onDeleteRoom: (room, rooms) => dispatch(deleteRoom(room, rooms)),
    onDeleteAllMeetings: () => dispatch(deleteAllMeetings()),
    onAdminSetSchedule: (start, end, interval) => dispatch(adminSetSchedule(start, end, interval)),
    onShowToast: (level, message) => dispatch(showToast(level, message)),
    onHideToast: () => dispatch(hideToast()),
  }
}

export default connect(mapStatetoProps, mapDispatchprops)(MeetingScheduler);
