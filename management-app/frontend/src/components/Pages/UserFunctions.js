import axios from 'axios'
import {set as setCookie} from 'es-cookie';


export const login = user =>{
    return axios
    .get( "/user/login/" + user.username +'/' + user.password, {
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
