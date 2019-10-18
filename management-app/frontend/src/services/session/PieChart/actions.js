import axios from 'axios';

// asynchronous action creator
const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

export const getSlackData = () => {
    return (dispatch) => {

        return axios
            .get(urlServer + "/slack/get-poll-result-hot-cold-nice")
            .then(res => {
                var cold = res.data.cold;
                var nice = res.data.nice;
                var hot = res.data.hot;


                dispatch(
                    { type: "GET_SLACK_DATA", message: [cold, nice, hot] })
                return [cold, nice, hot]
            })
            .catch(error => {
                console.log(error);
            });

        //console.log([cold,nice,hot]);    // poll results from slack

    }
}
