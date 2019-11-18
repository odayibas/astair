import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { submit } from '../../services/session/Login/actions';

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
    e.preventDefault();
    this.props.onSubmit(this.props.history,this.state.username,this.state.password);
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

const mapStatetoProps = (state) => {
  return { data: state.data, error: state.error }
}

const mapDispatchProps = (dispatch) => {
  return {
    onSubmit: (history,username,password) => dispatch(submit(history,username,password)),

  }
}

export default connect(mapStatetoProps,mapDispatchProps)(Login);
