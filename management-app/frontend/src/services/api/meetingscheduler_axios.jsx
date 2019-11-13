// fetchParticipants = () => {
//     return axios
//       .get(urlServer + "/user-names/get-names")
//       .then(res => {
//         let list = [];
//         res.data.forEach(element => {
//           list.push(element.username);
//         });
//         this.allParticipants = list;
//       })
//       .catch(err => {
//         this.props.showToast("danger", "Participants could not be loaded.");
//       });
//   };

  // fetchRooms = () => {
  //   let rooms = [];
  //   return axios
  //     .get(urlServer + "/rooms/get-all-rooms")
  //     .then(res => {
  //       res.data.forEach(item => {
  //         rooms.push(item.room);
  //       });
  //       this.setState({ rooms: rooms });
  //     })
  //     .catch(err => {
  //       console.log("[ERROR (GET ALL ROOMS API)] ", err);
  //       this.props.showToast("danger", "Unable to access to server.");
  //     });
  // };

  // getTimeSlotFromDatabase = () => {
  //   return axios
  //     .get(urlServer + "/meeting/get-slots/")
  //     .then(res => {
  //       const data = res.data[res.data.length - 1];
  //       const start = this.convertStringToTime(data.beginSlot);
  //       const end = this.convertStringToTime(data.finishSlot);
  //       const interval = this.convertStringToTime(data.durationSlot);
  //       this.setState(
  //         {
  //           timeSlot: {
  //             start,
  //             end,
  //             interval
  //           }
  //         },
  //         () => {
  //           const s = new Set();
  //           this.setState({ roomset: s });
  //           this.fetchRooms();
  //           this.getMeetingsFromDatabase();
  //           this.fetchParticipants();
  //         }
  //       );
  //     })
  //     .catch(err => {});
  // };

  // getAvailableRooms = (date, startTime, endTime) => {
  //   console.log(
  //     "The query is ",
  //     this.convertDateToString(date, "year"),
  //     this.convertTimeToString(startTime),
  //     this.convertTimeToString(endTime)
  //   );
  //   // let thisWeek = this.getWeek();
  //   // const startDate = this.convertDateToString(thisWeek[0], "year");
  //   // const endDate = this.convertDateToString(thisWeek[4], "year");

  //   return axios
  //     .get(
  //       urlServer +
  //         "/meeting/find-spare-room/" +
  //         this.convertDateToString(date, "year") +
  //         "/" +
  //         this.convertTimeToString(startTime) +
  //         "/" +
  //         this.convertTimeToString(endTime)
  //     )
  //     .then(res => {
  //       const newSet = new Set([]);
  //       if (res.data.length === 0) {
  //         this.props.showToast(
  //           "danger",
  //           "There is no available room for this slot!"
  //         );
  //       } else {
  //         res.data.forEach(item => {
  //           const i = this.state.rooms.indexOf(item);
  //           if (i !== -1) {
  //             newSet.add(i);
  //           }
  //         });
  //         this.setState({ roomset: newSet }, () => {
  //           // Show Dialog
  //           // console.log("Current roomset", this.state.roomset);
  //           this.setShowDialog(true);
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       console.log("[ERROR (AVAILABLE ROOM API)]", err);
  //       this.props.showToast("danger", "Unable to access to server.");
  //     });
  // };


  // fetchMeetings = (startDate, endDate, callback = undefined) => {
  //   // console.log("Data fetching from database...");

  //   return axios
  //     .get(
  //       urlServer + "/meeting/get-meeting-a-range/" + startDate + "/" + endDate
  //     )
  //     .then(res => {
  //       console.log("Data fetched successfuly ", res.data);
  //       this.processData(res.data, callback);
  //     })
  //     .catch(err => {
  //       console.log("****", err);
  //     });
  // };


  // postMeeting = meeting => {
  //   const description = meeting.description;
  //   const participants = meeting.participants;
  //   const room = meeting.room;
  //   const username = "From frontend";
  //   const date = this.convertDateToString(meeting.date, "year");
  //   const startTime = this.convertTimeToString(meeting.start);
  //   const endTime = this.convertTimeToString(meeting.end);

  //   axios
  //     .post(urlServer + "/meeting/set-meeting", {
  //       room,
  //       username,
  //       date,
  //       startTime,
  //       endTime,
  //       description,
  //       participants
  //     })
  //     .then(res => {
  //       console.log("Inserted successfuly");
  //       this.props.showToast(
  //         "success",
  //         "The meeting has been set successfully."
  //       );
  //       // UPDATE SCHEDULE
  //       this.getMeetingsFromDatabase();
  //     })
  //     .catch(err => {
  //       console.log("Error while inserting", err);
  //       this.props.showToast(
  //         "danger",
  //         "En error occured while creating meeting. Try again later."
  //       );
  //     });
  // };


  // handleAddRoom = room => {
  //   if (this.state.rooms.indexOf(room) !== -1) {
  //     this.props.showToast("warning", "The room already exists!");
  //     return;
  //   }
  //   return axios
  //     .post(urlServer + "/rooms/add-room", { room: room })
  //     .then(res => {
  //       this.fetchRooms();
  //       this.props.showToast(
  //         "success",
  //         "Room " + room + " is added successfully."
  //       );
  //     })
  //     .catch(err => {
  //       this.props.showToast(
  //         "danger",
  //         "En error occured. Room could not be added."
  //       );
  //     });
  // };


  // handleDeleteRoom = room => {
  //   if (this.state.rooms.indexOf(room) === -1) {
  //     this.props.showToast("warning", "There is no such room!");
  //     return;
  //   }
  //   return axios
  //     .post(urlServer + "/rooms/delete-room", { room: room })
  //     .then(res => {
  //       this.fetchRooms();
  //       this.props.showToast(
  //         "success",
  //         "Room " + room + " is deleted successfully."
  //       );
  //     })
  //     .catch(err => {
  //       this.props.showToast(
  //         "danger",
  //         "An error occured. Room could not be deleted."
  //       );
  //     });
  // };


  handleAdminSetSchedule = (start, end, interval) => {
    // console.log("The settings are", start, end, interval);
    const timeSlot = {
      start: this.convertStringToTime(start),
      end: this.convertStringToTime(end),
      interval: this.convertStringToTime(interval)
    };
    this.setState({ timeSlot: timeSlot }, () => {
      // console.log("Settings check ", this.state.timeSlot);
    });
    console.log("Query", start, end, interval);
    return axios
      .post(urlServer + "/admin/set-slots-only-slots/", {
        beginSlot: start,
        durationSlot: interval,
        finishSlot: end
      })
      .then(res => {
        console.log("Settings saved to database successfully.");
        window.location.reload();
      })
      .catch(err => {
        console.log("Error while inserting settings to database");
      });
  };


  // handleDeleteAllMeetings = () => {
  //   console.log("Delete All meetings");
  //   return axios
  //     .get(urlServer + "/meeting/remove-all-meeting")
  //     .then(res => {
  //       this.props.showToast(
  //         "success",
  //         "All the meetings have been deleted successfully."
  //       );
  //       window.location.reload();
  //     })
  //     .catch(err => {
  //       this.props.showToast(
  //         "danger",
  //         "En error occured while deleting meetings."
  //       );
  //     });
  // };