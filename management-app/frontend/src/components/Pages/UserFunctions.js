import axios from 'axios'
import {get as getCookie, set as setCookie} from 'es-cookie';

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND 


export const register  = user => {
    return axios
    .post( urlServer + "/user/register/", {
        username : user.username,
        role : user.role,
        password : user.password
    })
    .then(res =>{

        if(res !== -2 || res !== -1 || (res)) {
            setCookie('usertoken',  res.data)
        }
        return res.data

    }).catch(err =>{

       alert(err.response.data)
            
    })
}

export const getUserData =  async(res) =>{
    return await axios
    .get(urlServer +"/user/"+ res,{
        
    });
}
  
export const login = user =>{
    return axios
    .post( urlServer + "/user/login/" + user.username +'/' + user.password, {
        username : user.username,
        role : user.role,
        password:  user.password,
    })
    .then(res =>{
        console.log(res)

        if((res !== -2 || res !== -1) && (res)) {
            /* const response = getUserData(res)
            console.log(response) */
            setCookie('usertoken',  res.data)
        }

        return res.data

    })
    .catch(err =>{
        alert(err.response.data)

    })
}
