import axios from 'axios'
import {set as setCookie} from 'es-cookie';

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND 


export const login = admin =>{
    return axios
    .post( urlServer + "/user/login/" + admin.username +'/' + admin.password, {
        username : admin.username,
        password:  admin.password,
    })
    .then(res =>{
        if(!(res.data === -2 || res.data === -1)) {
        setCookie('admintoken',  res.data)
        }
        
        return res.data
     

    })
    .catch(err =>{
        console.log(err)
    })
}
