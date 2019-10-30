import axios from "axios";
import { get as getCookie, set as setCookie } from "es-cookie";

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

export const getData = () => {
    return (dispatch) => {
        return axios
            .get(urlServer + "/vote/get-by-user_id/" + getCookie("token"))
            .then(res => {

                dispatch(
                    { type: "GET_DATA", message: res })
                return res

            })
            .catch(error => {
                console.log(error);
            });
    }
};