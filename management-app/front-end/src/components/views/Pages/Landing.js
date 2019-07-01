import  React, {Component} from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import {
MDBMask, MDBRow,
MDBCol, MDBIcon,
MDBBtn, MDBView, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBFormInline
} from "mdbreact";
import "./Landing.css";

class ClassicFormPage extends Component {
  state = {
    collapseID: ""
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  }));

  render() {
    const overlay = (
      <div id="sidenav-overlay" style={{ backgroundColor: "transparent" }} onClick={this.toggleCollapse("navbarCollapse")} />
    );
    return (
    <div id="classicformpage">
    
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
                    <div className="form-group">
                                <label htmlFor="email">Email Adress</label>
                                <input type="email" className="form-control"
                                name="email" required
                                placeholder= "email"
                                value={this.state.email}
                                onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control"
                                name="password" required
                                placeholder= "password"
                                value={this.state.password}
                                onChange={this.onChange}/>
                    </div>
                    <div className="text-center mt-4 black-text">
                      <MDBBtn color="indigo">Submit</MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBMask>
      </MDBView>

    </div>
    );
  }
}

export default ClassicFormPage;