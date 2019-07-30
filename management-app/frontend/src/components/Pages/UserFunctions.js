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

        if(res){
/* 
            if(res.data !== -2 && res.data !== -1) {
              console.log(getUserData(res))  
            } */
            return res.data
        }

/*         if(res !== -2 || res !== -1 || (res)) {
            setCookie('usertoken',  res.data)
        } 
        return res.data */

    }).catch(err =>{

       alert(err.response.data)
            
    })
}

export const getUserData =  async(value) =>{

    return  axios.post(urlServer +"/user/"+ value)
    .then(res => {
        setCookie('usertoken',  res.data.role)
        console.log(getCookie('usertoken'))


    });
}
  
export const login = user =>{
    
    return axios.post( urlServer + "/user/login/" + user.username +'/' + user.password, {
        username : user.username,
        role : user.role,
        password:  user.password,
    })
    .then(res =>{
        if(res){
        if(res.data !== -2 && res.data !== -1) {
            var promise1 = Promise.resolve(res.data)
            promise1
                .then(function(value) {
                    getUserData(value)
                });

        }
        return res.data

    }}
    ).catch(err =>{
        alert(err.response.data)

    })
}
