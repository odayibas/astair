import axios from 'axios';

// asynchronous action creator
const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;
const urlArr = Array.from(
    Array(parseInt(process.env.REACT_APP_LENGTH)).keys()
).map(x => (x + 1).toString());

export const getCompVisionControllerData = () => {
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

export const getSensorData = () => {
    return (dispatch) => {
        return Promise.all(
            urlArr.map(url =>
                axios
                    .get(urlServer + "/sensor/get-zone/" + url)
                    .then(res => {
                        const degrees = res.data.map(p => p.sensor_degree);

                        dispatch(
                            { type: "GET_SENSOR_DATA", message: res })
                        return degrees

                    })

            )
        )

    }
};