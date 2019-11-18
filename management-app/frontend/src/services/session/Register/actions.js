import axios from 'axios';

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

export const submit = (history, username, password) => {
    return (dispatch) => {
        const user = {
            username: username,
            role: 2, //user role is 2
            password: password
        };

        axios
            .post(urlServer + "/user/register/", {
                username: user.username,
                role: user.role,
                password: user.password
            })
            .then(res => {

                if (res) {
                    if (res.data === -2 || res.data === -1) {
                        alert("Invalid Credentials");
                        return history.push("/register");
                    } else {
                        alert("Register Successful");
                        return res.data && history.push("/login");
                    }
                }
            })
            .catch(err => {
                console.log(err.response.data);
            });
    }
}