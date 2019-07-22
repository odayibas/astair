import axios from 'axios'
import {set as setCookie} from 'es-cookie';

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND 


export const register  = user => {
    return axios
    .post( urlServer + "/us/register/", {
        username : user.username,
        password : user.password
    })
    .then(res =>{
        console.log("registered")
    })
}


export const userlogin = user =>{
    return axios
    .post( urlServer + "/us/login/" + user.username +'/' + user.password, {
        username : user.username,
        password:  user.password,
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

export const adminlogin = admin =>{
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
