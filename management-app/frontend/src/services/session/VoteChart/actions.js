import axios from "axios";

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

export const getData = () => {
    return (dispatch) => {
        return axios
            .get(urlServer + "/vote/get-web-result-hot-cold-nice")
            .then(res => {
                dispatch(
                    { type: "GET_DATA", message: res })
                return [res.data.cold, res.data.hot, res.data.nice]
            })
            .catch(err => {
                console.log(err);
            });
    }
};