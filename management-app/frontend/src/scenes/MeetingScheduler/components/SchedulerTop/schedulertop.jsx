import React, { Component } from "react";
import MeetingScheduler from "../../meetingscheduler";
import { Row, Col, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { maxHeight } from "@material-ui/system";
import { get as getCookie } from "es-cookie";
import Toast from "../../toast";

class SchedulerTop extends Component {
  state = {
    toastMessage: "YES",
    showToast: false,
    toastLevel: "warning"
  };

  showToast = (level, message) => {
    this.setState({ toastLevel: level }, () => {
      this.setState({ toastMessage: message }, () => {
        this.setState({ showToast: true }, () => {
          setTimeout(() => {
            this.hideToast();
          }, 3000);
        });
      });
    });
  };

  hideToast = () => {
    this.setState({ showToast: false });
  };

  render() {
    if (getCookie("usertoken") === "1" || getCookie("usertoken") === "2") {
      return (
        <div style={{ textAlign: "center" }}>
          <Container>
            <Row md={1}>
              <div style={{ height: 20 }} />
            </Row>
            <Row md={11}>
              <MeetingScheduler
                showToast={this.showToast}
                hideToast={this.hideToast}
              />
            </Row>
          </Container>
          <img
            src="/assets/logo-Astair-w.png"
            style={{ maxWidth: 400, marginTop: 10 }}
          />
          <Toast
            message={this.state.toastMessage}
            level={this.state.toastLevel}
            visible={this.state.showToast}
          />
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default SchedulerTop;
