import axios from 'axios';

// asynchronous action creator
const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

// eski adı getData
export const getLastAcRecords = (currentAC) => {
    return (dispatch) => {
        axios
            .get(urlServer + "/AC/get-last-records")
            .then(res => {
                let b = false;
                let active = "OFF";
                if (res.data[currentAC - 1].active === "1") {
                    b = true;
                    active = "ON";
                }
                const acData = {
                    id: currentAC,
                    mode: res.data[currentAC - 1].ac_mode,
                    fan_speed: res.data[currentAC - 1].ac_fan_speed,
                    temperature: res.data[currentAC - 1].ac_degree,
                    active: active,
                    isChecked: b
                };
                console.log("acdata",acData)
                dispatch(
                    { type: "GET_LAST_AC_RECORDS", data: acData })
            })
            .catch(err => dispatch(
                { type: "ERROR", msg: err }))
    }

}

export const setTemperature = (temperature) => {
    return (dispatch) => {
        dispatch(
            { type: "SET_TEMPERATURE", temperature: temperature })
    }
}

export const setFan = (fan) => {
    return (dispatch) => {
        dispatch(
            { type: "SET_FAN", fan: fan })
    }
}

export const setMode = (mode) => {
    return (dispatch) => {
        dispatch(
            { type: "SET_MODE", mode: mode })
    }
}

export const setActive = (active) => {
    return (dispatch) => {
        dispatch(
            { type: "SET_ACTIVE", active: active })
    }
}

export const setIsChecked = (isChecked) => {
    return (dispatch) => {
        dispatch(
            { type: "SET_IS_CHECKED", isChecked: isChecked })
    }
}

export const handleSubmit = (message1) => {
    const request = message1.split(',');
    return (dispatch) => {
        axios
            .post(urlServer + "/api/mqtt/publish", {
                message: message1,
                retained: false,
                topic: "Astair/MODEL/AC"
            })
            .then(res => {
                console.log("res",res)
                dispatch(
                    { type: "HANDLE_SUBMIT", message: request })
                alert("Data Send");
            })
            .catch(err => dispatch(
                { type: "ERROR", msg: err }))
    }
}



