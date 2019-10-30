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
        console.log("get slots from app.js", res)
        console.log("get slots from app.js", currentSettings.surveyInterval)
        this.setState({ surveyInterval: adminInterval }, () => { });
        // this.state.surveyInterval = adminInterval;
        // console.log(this.state.surveyInterval, " NEW INTERVAL FROM DB");
      })
      .catch(err => { });
  };

  render() {
    return (
      <Router>
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

export default App;
