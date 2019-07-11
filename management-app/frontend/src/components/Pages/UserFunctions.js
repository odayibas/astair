import axios from 'axios'
import {set as setCookie} from 'es-cookie';

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND 


export const login = user =>{
    return axios
    .get( urlServer + "/user/login/" + user.username +'/' + user.password, {
        username : user.username,
        password:  user.password
    })
    .then(res =>{
        if(!(res.data === -2 || res.data === -1)) {
        setCookie('usertoken',  res.data)
        }
        
        return res.data
     

    })
    .catch(err =>{
        console.log(err)
    })
}
