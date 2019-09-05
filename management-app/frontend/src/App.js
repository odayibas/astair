import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Pages/Login";
import Landing from "./components/Pages/Landing";
import Monitor from "./components/Monitor/Monitor";
import WebForm from "./components/Form/Form";
import ACControl from "./components/ACControl/ACControl";
import Register from "./components/Pages/Register";
import SchedulerTop from "./components/MeetingScheduler/schedulertop";
import axios from "axios";

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

class App extends Component {
  state = {
    showBadge: false,
    surveyInterval: undefined
  };

  constructor() {
    super();

    console.log("APP CONST");
  }

  componentDidMount() {
    this.getTimeInterval();
  }

  showNotification = b => {
    console.log("show notificiation.");
    this.setState({ showBadge: b });
  };

  getTimeInterval = () => {
    console.log("REQUESTING");
    return axios
      .get(urlServer + "/meeting/get-slots/")
      .then(res => {
        let currentSettings = res.data[res.data.length - 1];
        const adminInterval = parseInt(currentSettings.surveyInterval, 10);
        console.log("GOT DATA");
        this.setState({ surveyInterval: adminInterval }, () => {
          console.log(this.state.surveyInterval, " NEW INTERVAL FROM DB");
        });
        // this.state.surveyInterval = adminInterval;
        // console.log(this.state.surveyInterval, " NEW INTERVAL FROM DB");
      })
      .catch(err => {});
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
          />{" "}
          <Route exact path="/ac" component={ACControl} />{" "}
          <Route exact path="/register" component={Register} />{" "}
          <Route exact path="/meetingscheduler" component={SchedulerTop} />{" "}
        </div>
      </Router>
    );
  }
}

export default App;
