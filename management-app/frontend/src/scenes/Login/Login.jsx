import React, { Component } from "react";

import axios from "axios";
import { set as setCookie } from "es-cookie";
import { Link } from "react-router-dom";

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { history } = this.props;
    e.preventDefault();

    const user = {
      username: this.state.username,
      role: 1,
      password: this.state.password
    };

    axios
      .post(urlServer + "/user/login/" + user.username + "/" + user.password, {
        username: user.username,
        role: user.role,
        password: user.password
      })
      .then(res => {
        if (res) {
          if (res.data !== -2 && res.data !== -1) {
            var promise1 = Promise.resolve(res.data);
            promise1.then(function(value) {
              axios.post(urlServer + "/user/" + value).then(res => {
                setCookie("usertoken", res.data.role);
                setCookie("token", res.data.id);

                return history.push("/dashboard");
              });
            });
          } else {
            alert("Invalid Credentials");
            return history.push("/login");
          }
          return res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };


  render() {
    return (
      <div className="login">
        <div className="login-body">
          <img height={500} src="/assets/image.png" alt={"logo"} />
        </div>
        <div style={{ width: "50%" }}>
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form noValidate onSubmit={this.onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in! </h1>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    className="form-control"
                    name="username"
                    placeholder="Username"
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
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <h5>Don't have an account?</h5>
              <h5>
                <Link to="/register"> Click here to register</Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
