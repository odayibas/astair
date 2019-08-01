import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { get as getCookie, remove as removeCookie } from "es-cookie";

class Navbar extends Component {
  logout(e) {
    e.preventDefault();
    removeCookie("usertoken");
    this.props.history.push("/");
  }

  getNavbar() {
    if (getCookie("usertoken") === "1") {
      return (
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <div className="navbar-brand">
            <img height={50} src="/assets/Logo-Astair-w-1.png" alt={"logo"} />
          </div>
          <ul className="navbar-nav">
            <li className="nav -item">
              <Link to="/" className="nav-link">
                <h5>Home</h5>
              </Link>
            </li>
            <li className="nav -item">
              <Link to="/dashboard" className="nav-link">
                <h5>Dashboard</h5>
              </Link>
            </li>
            <li className="nav -item">
              <Link to="/ac" className="nav-link">
                <h5>AC Control</h5>
              </Link>
            </li>
            <li className="nav -item">
              <Link to="/form" className="nav-link">
                <h5>Form</h5>
              </Link>
            </li>
            <li className="nav -item">
              <li onClick={this.logout.bind(this)} className="nav-link">
                <h5>Logout</h5>
              </li>
            </li>
          </ul>
        </div>
      );
    } else if (getCookie("usertoken") === "2") {
      return (
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <div className="navbar-brand">
            <img height={50} src="/assets/Logo-Astair-w-1.png" alt={"logo"} />
          </div>
          <ul className="navbar-nav">
            <li className="nav -item">
              <Link to="/" className="nav-link">
                <h5>Home</h5>
              </Link>
            </li>
            <li className="nav -item">
              <Link to="/dashboard" className="nav-link">
                <h5>Dashboard</h5>
              </Link>
            </li>
            <li className="nav -item">
              <Link to="/form" className="nav-link">
                <h5>Form</h5>
              </Link>
            </li>
            <li className="nav -item">
              <li onClick={this.logout.bind(this)} className="nav-link">
                <h5>Logout</h5>
              </li>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <div className="navbar-brand">
            <img height={50} src="/assets/Logo-Astair-w-1.png" alt={"logo"} />
          </div>
          <ul className="navbar-nav">
            <li className="nav -item">
              <Link to="/" className="nav-link">
                <h5>Home</h5>
              </Link>
            </li>
            <li className="nav -item">
              <Link to="/login" className="nav-link">
                <h5>Login</h5>
              </Link>
            </li>
          </ul>
        </div>
      );
    }
  }

  render() {
    return (
      <nav
        className="navbar fixed-top navbar-expand-lg navbar-dark "
        style={{ backgroundColor: "#212529", paddingTop: "20px" }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {this.getNavbar()}
      </nav>
    );
  }
}

export default withRouter(Navbar);