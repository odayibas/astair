import axios from 'axios';

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;
const urlArr = Array.from(
    Array(parseInt(process.env.REACT_APP_LENGTH)).keys()
).map(x => (x + 1).toString());


export const getAcData = () => {
    return (dispatch) => {
        var ac = [];
        return Promise.all(
            urlArr.map(url =>
                axios(urlServer + "/AC/get-zone/" + url).then(res => {
                    ac[parseInt(url) - 1] = {
                        ac_id: res.data[res.data.length - 1].ac_id,
                        ac_degree: res.data[res.data.length - 1].ac_degree,
                        ac_mode: res.data[res.data.length - 1].ac_mode,
                        ac_fan_speed: res.data[res.data.length - 1].ac_fan_speed,
                        active: res.data[res.data.length - 1].active
                    };
                })
            )
        )
            .then((e) => {
                dispatch(
                    { type: "GET_AC_DATA", message: ac })
                return ac
            })
            .catch(err => dispatch(
                { type: "ERROR", msg: err }))
    }
}


export const getAcAverage = () => {
    return (dispatch) => {
        return axios
            .get(urlServer + "/AC/get-avg-degree")
            .then(res => {
                dispatch(
                    { type: "GET_AC_AVERAGE", message: res })
                return res.data
            })
    }
}

export const getSensorAverageData = () => {
    return (dispatch) => {
        return axios
            .get(urlServer + "/sensor/get-ave-degree")
            .then(res => {
                dispatch(
                    { type: "GET_SENSOR_AVERAGE_DATA", message: res })
                return res.data
            })
    }
}

export const getSensorData = () => {
    return (dispatch) => {
        const sensorTemp = [];
        const sensorHum = [];
        return Promise.all(
            urlArr.map(url =>
                axios
                    .get(urlServer + "/sensor/get-zone/" + url)
                    .then(res => {
                        sensorTemp[url] =
                            res.data[res.data.length - 1].sensor_degree;
                        sensorHum[url] =
                            res.data[res.data.length - 1].sensor_humidity;
                        const degrees = res.data.map(p => p.sensor_degree);

                        dispatch(
                            { type: "GET_SENSOR_DATA", message: res })
                        return [sensorTemp, sensorHum,degrees]

                    })

            )
        )

    }
}

export const getOutdoorData = () => {
    const url =
        "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/eda3e07c6d1ebeb49dd8a4353a0666a9/39.925533,32.866287?units=si";
    return (dispatch) => {
        return axios
            .get(url, {
                headers: {
                    "Access-Control-Allow-Origin": true
                }
            })
            .then(res => {
                dispatch(
                    { type: "GET_OUTDOOR_DATA", message: res.data.currently.apparentTemperature })
                return res.data.currently.apparentTemperature
            })
    }
}

export const getcompVisionControllerData = () => {
    return (dispatch) => {
        return axios
            .get(urlServer + "/get-all")
            .then(res => {
                const numberOfPeople = res.data.map(p => p.occupancy);

                dispatch(
                    { type: "GET_VISION_DATA", message: numberOfPeople })
                return numberOfPeople

            })
            .catch(error => {
                console.log(error);
            });
    }
};

