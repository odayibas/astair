import axios from 'axios';

export const getData = () => {
    return (dispatch) => {

        const url =
            "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/eda3e07c6d1ebeb49dd8a4353a0666a9/39.925533,32.866287?units=si";
        return axios
            .get(url, {
                headers: {
                    "Access-Control-Allow-Origin": true
                }
            })
            .then(res => {


                const data = {
                    temp: res.data.currently.apparentTemperature,
                    currentWeather: res.data.currently.summary,
                    dailySummary: res.data.hourly.summary,
                    dew: res.data.currently.dewPoint,
                    humidity: res.data.currently.humidity,
                    visibility: res.data.currently.visibility,
                    timezone: res.data.timezone,
                };

                dispatch(
                    { type: "GET_DATA", data: data })
                    return data
            })
            .catch(err => dispatch(
                { type: "ERROR", msg: err }))
    }
};