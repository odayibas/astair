import axios from "axios";

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

export const getData = () => {
    return (dispatch) => {
        return axios
            .get(urlServer + "/vote/get-web-result-hot-cold-nice")
            .then(res => {
                // this.setState({
                //     cold: res.data.cold,
                //     hot: res.data.hot,
                //     nice: res.data.nice
                // });

                // this.drawVoteChart(res);

                dispatch(
                    { type: "GET_DATA", message: res })
                return [res.data.cold, res.data.hot, res.data.nice]
            })
            .catch(err => {
                console.log(err);
            });
    }
};