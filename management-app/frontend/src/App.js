import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from "react";
import Navbar from "./scenes/Home/Navbar";
import Dashboard from "./scenes/Dashboard/Dashboard";
import Login from "./scenes/Login/Login";
import Landing from "./scenes/Home/Landing";
import Monitor from "./scenes/Monitor/Monitor";
import WebForm from "./scenes/Form/Form";
import ACControl from "./scenes/ACControl/ACControl";
import Register from "./scenes/Login/Register";
import SchedulerTop from "./scenes/MeetingScheduler/components/SchedulerTop/schedulertop";
import axios from "axios";
import Toast from "./components/Toast/toast";
import { showToast, hideToast } from "./services/session/Toast/actions";
import { connect } from 'react-redux'

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

class App extends Component {
  state = {
    showBadge: false,
    surveyInterval: undefined
  };

  componentDidMount() {
    this.getTimeInterval();
  }

  showNotification = b => {
    this.setState({ showBadge: b });
  };

  getTimeInterval = () => {
    return axios
      .get(urlServer + "/meeting/get-slots/")
      .then(res => {
        let currentSettings = res.data[res.data.length - 1];
        const adminInterval = parseInt(currentSettings.surveyInterval, 10);
        this.setState({ surveyInterval: adminInterval }, () => { });
      })
      .catch(err => { });
  };

  render() {
    return (
      <Router>
        <Toast message={this.props.data .toastMessage}
          level={this.props.data.toastLevel}
          visible={this.props.data.showToast}>
        </Toast>
        <div className="App">
          <Navbar showBadge={this.state.showBadge} />
          <Route exact path="/" component={Landing} />{" "}
          <Route exact path="/login" component={Login} />{" "}
          <Route exact path="/dashboard" component={Dashboard} />{" "}
          <Route exact path="/monitor" component={Monitor} />{" "}

          <Route exact path="/ac" component={ACControl} />{" "}
          <Route exact path="/register" component={Register} />{" "}
          <Route exact path="/meetingscheduler" component={SchedulerTop} />{" "}

          {this.state.surveyInterval &&
            <Route
              exact
              path="/form"
              render={routeProps => {
                return (
                  <WebForm
                    {...routeProps}
                    showNotification={this.showNotification}
                    surveyInterval={this.state.surveyInterval}
                  />
                );
              }}
            />}

        </div>
      </Router>
    );
  }
}


const mapStatetoProps = (state) => {
  return { data: state.toastReducer, error: state.error }
}

const mapDispatchprops = (dispatch) => {
  return {
    onShowToast: (level, message) => dispatch(showToast(level, message)),
    onHideToast: () => dispatch(hideToast())
  }
}

export default connect(mapStatetoProps, mapDispatchprops)(App);
