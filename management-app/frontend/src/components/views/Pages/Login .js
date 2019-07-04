import React, {Component} from 'react'
import  {login} from "./UserFunctions"
import {
    MDBMask, MDBRow,
    MDBCol, MDBIcon,
     MDBView, MDBContainer, MDBCard, MDBCardBody
    } from "mdbreact";
import "./Login.css"
class Login extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            password:'',
            collapseID:""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  }));


    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }


    onSubmit(e){
        e.preventDefault()

        const user = {
            email : this.state.email,
            password : this.state.password
        }
        login(user)
        .then(res =>{
            if(res) {
                this.props.history.push('/profile');
            }
        })
        .catch(err =>{
            console.log(err)
            this.props.history.push('/')
        })
    }

    render(){
        const overlay = (
            <div id="sidenav-overlay" style={{ backgroundColor: "transparent" }} onClick={this.toggleCollapse("navbarCollapse")} />
            );
            return(
            <div>
            <MDBView>
        <MDBMask className="d-flex justify-content-center align-items-center gradient">
          <MDBContainer>
            <MDBRow>
              <div className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                <h1 className="h1-responsive font-weight-bold">
                  Welcome to ASTAiR!{" "}
                </h1>
                <hr className="hr-light" />
                <h6 className="mb-4">
                  Watch our video to learn more
                </h6>
                <a href="https://www.youtube.com/watch?v=RpF21VuUxXg">
                       <button  type="submit"
                       className="btn btn-primary">
                           Watch
                           </button>
                </a>
              </div>
              <MDBCol md="6" xl="5" className="mb-4">
                <MDBCard id="classic-card">
                  <MDBCardBody className="z-depth-2 white-text">
                    <h3 className="text-center">
                      <MDBIcon icon="user" /> Sign in:
                    </h3>
                    <hr className="hr-light" />
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1  className=  "h3 mb-3 font-weight-normal">Please sign in! </h1>
                            <div className="form-group">
                                <label htmlFor="email">Email Adress</label>
                                <input type="email" className="form-control"
                                name="email"
                                placeholder= "email"
                                value={this.state.email}
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
                                Submit
                            </button>
                        </form>
                        </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBMask>
      </MDBView>
      </div>

            
        )
    }
}

export default Login






