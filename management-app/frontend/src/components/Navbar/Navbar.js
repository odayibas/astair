import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {get as getCookie, remove as removeCookie } from 'es-cookie';

class Navbar extends Component{

    logout(e){
        e.preventDefault()
        removeCookie('usertoken')
        this.props.history.push('/')

    }

    render(){
        const loginRegLink =(
            <ul className ="navbar-nav">
                <li className = "nav -item">
                    <Link to= "/login" className="nav-link">
                    <h5>Login</h5> 
                    </Link>
                </li>
            </ul>
        )

        const userLink =(
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
        )

        return(

            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark" style={{paddingTop: '20px'}}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-brand"><h2>ASTAiR</h2></div>  
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav">
            </ul>
            {getCookie('usertoken') ? userLink : loginRegLink}
            </div>
             </nav>

           

        )
    }
}

export default withRouter(Navbar)