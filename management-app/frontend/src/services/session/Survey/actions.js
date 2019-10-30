
import axios from "axios";
const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;


export const postData = (vote) => {
    console.log("data written",vote)

    return (dispatch) => {
        axios
            .post(urlServer + "/vote/save-vote", vote)
            .then(res => { 
                console.log("data written",res)
                
            })
            .catch(err => {
                console.log(err);
            });
    }
};