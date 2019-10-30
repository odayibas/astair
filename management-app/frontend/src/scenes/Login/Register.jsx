import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux'
import { submit } from '../../services/session/Register/actions';

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;
class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.props.history,this.state.username,this.state.password);
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form noValidate onSubmit={this.onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Sign Up </h1>
                <div className="form-group">
                  <label htmlFor="username">
                    Please enter your slack username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username "
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="image">
          <img height={150} src="/assets/Logo-Astair-w.png" alt={"logo"} />
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  console.log("mapStatetoProps", state)
  return { data: state.data, error: state.error }
}

const mapDispatchProps = (dispatch) => {
  return {
    onSubmit: (history,username,password) => dispatch(submit(history,username,password)),

  }
}

export default connect(mapStatetoProps,mapDispatchProps)(Register);
