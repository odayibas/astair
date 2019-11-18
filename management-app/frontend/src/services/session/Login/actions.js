import axios from 'axios';
import { set as setCookie } from "es-cookie";

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

export const submit = (history, username, password) => {
    return (dispatch) => {
        const user = {
            username: username,
            role: 1,
            password: password
        };

        axios
            .post(urlServer + "/user/login/" + user.username + "/" + user.password, {
                username: user.username,
                role: user.role,
                password: user.password
            })
            .then(res => {
                if (res) {
                    if (res.data !== -2 && res.data !== -1) {
                        var promise1 = Promise.resolve(res.data);
                        promise1.then(function (value) {
                            axios.post(urlServer + "/user/" + value).then(res => {
                                setCookie("usertoken", res.data.role);
                                setCookie("token", res.data.id);

                                return history.push("/dashboard");
                            });
                        });
                    } else {
                        alert("Invalid Credentials");
                        return history.push("/login");
                    }
                    return res.data;
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
}