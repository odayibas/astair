import axios from 'axios';
import { convertStringToTime, convertTimeToString, convertDateToString } from "../../../components/dateTimeConverter";
import { showToast, hideToast } from "../Toast/actions";

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

export const getTimeSlotFromDatabase = () => {
    return (dispatch) => {

        return axios
            .get(urlServer + "/meeting/get-slots/")
            .then(res => {
                const data = res.data[res.data.length - 1];

                dispatch(
                    { type: "GET_TIME_SLOTS_FROM_DATABASE", message: data })
                return data
            })
            .catch(err => { });
    }
};

export const fetchParticipants = () => {
    return (dispatch) => {

        return axios
            .get(urlServer + "/user-names/get-names")
            .then(res => {
                let list = [];
                res.data.forEach(element => {
                    list.push(element.username);
                });
                dispatch(
                    { type: "GET_TIME_SLOTS_FROM_DATABASE", message: list })
                return list
            })
            .catch(err => {
                dispatch(showToast("danger", "Participants could not be loaded."))
                setTimeout(() => {
                    dispatch(hideToast())
                }, 5000);
            });
    }
};

export const fetchRooms = () => {
    return (dispatch) => {

        let rooms = [];
        return axios
            .get(urlServer + "/rooms/get-all-rooms")
            .then(res => {
                res.data.forEach(item => {
                    rooms.push(item.room);
                });
                dispatch(
                    { type: "GET_TIME_SLOTS_FROM_DATABASE", message: rooms })
                return rooms
            })
            .catch(err => {
                console.log("[ERROR (GET ALL ROOMS API)] ", err);
                dispatch(showToast("danger", "Rooms could not be loaded."))
                setTimeout(() => {
                    dispatch(hideToast())
                }, 5000);
            });
    }
};

export const fetchMeetings = (startDate, endDate, callback = undefined) => {
    return (dispatch) => {

        return axios
            .get(
                urlServer + "/meeting/get-meeting-a-range/" + startDate + "/" + endDate
            )
            .then(res => {
                dispatch(
                    { type: "FETCH_MEETINGS", message: res.data })
                return res.data
            })
            .catch(err => {
                console.log("****", err);
            });
    }
};

export const getAvailableRooms = (date, startTime, endTime, rooms) => {
    return (dispatch) => {
        return axios
            .get(
                urlServer + "/meeting/find-spare-room/" + date + "/" + startTime + "/" + endTime)
            .then(res => {
                const newSet = new Set([]);
                if (res.data.length === 0) {
                    dispatch(showToast(
                        "danger",
                        "There is no available room for this slot!"
                    ))
                    setTimeout(() => {
                        dispatch(hideToast())
                    }, 5000);
                    return;
                } else {
                    res.data.forEach(item => {
                        const i = rooms.indexOf(item);
                        if (i !== -1) {
                            newSet.add(i);
                        }
                    });
                }

                dispatch(
                    { type: "GET_TIME_SLOTS_FROM_DATABASE", message: newSet })
                return newSet
            })
            .catch(err => {
                console.log("[ERROR (AVAILABLE ROOM API)]", err);
                dispatch(showToast("danger", "Unable to access to server."))
                setTimeout(() => {
                    dispatch(hideToast())
                }, 5000);
            });
    }
};

export const postMeeting = meeting => {
    return (dispatch) => {

        const description = meeting.description;
        const participants = meeting.participants;
        const room = meeting.room;
        const username = "From frontend";
        const date = convertDateToString(meeting.date, "year");
        const startTime = convertTimeToString(meeting.start);
        const endTime = convertTimeToString(meeting.end);

        return axios
            .post(urlServer + "/meeting/set-meeting", {
                room,
                username,
                date,
                startTime,
                endTime,
                description,
                participants
            })
            .then(res => {
                dispatch(showToast(
                    "success",
                    "The meeting has been set successfully."
                ))
                setTimeout(() => {
                    dispatch(hideToast())
                }, 5000);
                // UPDATE SCHEDULE
                //this.getMeetingsFromDatabase();

                dispatch(
                    { type: "POST_MEETING", message: res })
                return res
            })
            .catch(err => {
                console.log("Error while inserting", err);
                dispatch(showToast(
                    "danger",
                    "En error occured while creating meeting. Try again later."
                ))
                setTimeout(() => {
                    dispatch(hideToast())
                }, 5000);
                return;
            });
    }
};

export const addRoom = (room, rooms) => {
    return (dispatch) => {
        return axios
            .post(urlServer + "/rooms/add-room", { room: room })
            .then(res => {
                fetchRooms();
                dispatch(showToast(
                    "success",
                    "Room " + room + " is added successfully."
                ))
                setTimeout(() => {
                    dispatch(hideToast())
                }, 5000);


                dispatch(
                    { type: "ADD_ROOM", message: res })
                return res
            })
            .catch(err => {
                console.log(err)
                dispatch(showToast(
                    "danger",
                    "En error occured. Room could not be added."
                ))
                setTimeout(() => {
                    dispatch(hideToast())
                }, 5000);
            });
    }
};

export const deleteRoom = (room, rooms) => {
    return (dispatch) => {
        return axios
            .post(urlServer + "/rooms/delete-room", { room: room })
            .then(res => {
                fetchRooms();
                dispatch(
                    { type: "DELETE_ROOM", message: res })
                dispatch(showToast(
                    "success",
                    "Room " + room + " is deleted successfully."
                ))
                setTimeout(() => {
                    dispatch(hideToast())
                }, 5000);
                return res
            })
            .catch(err => {
                dispatch(showToast(
                    "danger",
                    "En error occured. Room could not be deleted."
                ))
                setTimeout(() => {
                    dispatch(hideToast())
                }, 5000);
            });
    }
};

export const deleteAllMeetings = () => {
    return (dispatch) => {
        return axios
            .get(urlServer + "/meeting/remove-all-meeting")
            .then(res => {
                dispatch(
                    { type: "DELETE_ALL_MEETINGS", message: res })
                return res
            })
            .catch(err => {
                dispatch(showToast(
                    "danger",
                    "En error occured while deleting meetings."
                ))
                setTimeout(() => {
                    dispatch(hideToast())
                }, 5000);
            });
    }
};

export const adminSetSchedule = (start, end, interval) => {
    return (dispatch) => {

        const timeSlot = {
            start: convertStringToTime(start),
            end: convertStringToTime(end),
            interval: convertStringToTime(interval)
        };
        return axios
            .post(urlServer + "/admin/set-slots-only-slots/", {
                beginSlot: start,
                durationSlot: interval,
                finishSlot: end
            })
            .then(res => {
                dispatch(
                    { type: "ADMIN_SET_SCHEDULE", message: timeSlot })
                return timeSlot
            })
            .catch(err => {
                console.log("Error while inserting settings to database");
            });
    }
};