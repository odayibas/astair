import React, {Component} from 'react'
import axios from 'axios'

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND 
class Register extends Component {
    constructor(){
        super()
        this.state = {
            username : '',
            password : ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }


    onSubmit(e){
        e.preventDefault()

        const user = {
            username : this.state.username,
            role : 2, //user role is 2 
            password : this.state.password
        }

    return axios.post( urlServer + "/user/register/", {
        username : user.username,
        role : user.role,
        password : user.password
    })
    .then(res =>{
        console.log(res.data)

        if(res){
            if(res.data === -2 || res.data === -1 )  {
                alert('Invalid Credentials')   
                return  this.props.history.push('/register')
                }
                else{
                alert('Register Successful')
                return res.data && this.props.history.push('/login');
                }

        }

    }).catch(err =>{

       alert(err.response.data)
            
    })
}


render(){

    return(
        <div>
        <div className="container">
            <div className="row">
                <div className= "col-md-6 mt-5 mx-auto">
                    <form noValidate onSubmit={this.onSubmit}>
                        <h1  className=  "h3 mb-3 font-weight-normal">Sign Up </h1>
                        <div className="form-group">
                            <label htmlFor="username">Please enter your slack username</label>
                            <input type="text" className="form-control"
                            name="username"
                            placeholder= "Username "
                            value={this.state.username}
                            onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control"
                            name="password"
                            placeholder= "password"
                            value={this.state.password}
                            onChange={this.onChange}/>
                        </div>
                        <button type="submit"
                        className="btn btn-lg btn-primary btn-block">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
          <div style={{height : '10%', display : 'flex',justifyContent : 'center', alignItems : 'center'}}>
          <img height={150} src="/assets/Logo-Astair-w.png" alt = {'logo'}/>
         </div>
         </div>


    )
}

  
}

export default Register
