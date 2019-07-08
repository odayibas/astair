import axios from 'axios'
import {set as setCookie} from 'es-cookie';


export const login = user =>{
    return axios
    .post( "http://10.154.4.28:8090/login/" + user.username +'/' + user.password, {
        username : user.username,
        password:  user.password
    })
    .then(res =>{
        if(res != '-1') {
        setCookie('usertoken',  res.data)
        }
        return res.data



    })
    .catch(err =>{
        console.log(err)
    })
}
