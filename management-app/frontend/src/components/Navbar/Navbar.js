import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {get as getCookie, remove as removeCookie } from 'es-cookie';
import logo from './logo_transparent.png'; // Tell Webpack this JS file uses this image


class Navbar extends Component{

    logout(e){
        e.preventDefault()
        removeCookie('usertoken')
        this.props.history.push('/')

    }

    render(){
        const loginRegLink =(
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <div className="navbar-brand"><h4>ASTAiR</h4></div>  
                <ul className ="navbar-nav">
                <li className = "nav -item">
                    <Link to= "/login" className="nav-link">
                    <h5>Login</h5> 
                    </Link>
                </li>
            </ul>
            </div>

        )

        const userLink =(
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <div className="navbar-brand"><img src={logo} 
                alt="Logo" 
                width="80"
                height="80"
                className="d-inline-block align-top"/></div>  
            <ul className ="navbar-nav">
                <li className = "nav -item">
                    <Link to= "/dashboard" className="nav-link">
                      <h5>Dashboard</h5>  
                    </Link>
                </li>
                <li className = "nav -item">
                    <a href="" onClick={this.logout.bind(this)} className="nav-link">
                       <h5>Logout</h5> 
                    </a>
                </li> 
            </ul>
            </div>
        )

        return(

            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark" style={{paddingTop: '20px'}}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            
           
     
            {getCookie('usertoken') ? userLink : loginRegLink}
             </nav>

           

        )
    }
}

export default withRouter(Navbar)