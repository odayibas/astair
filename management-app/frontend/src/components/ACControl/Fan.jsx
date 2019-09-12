import React, { Component } from "react";
import { CardHeader } from "reactstrap";
import { Container, Col, Row } from "react-bootstrap";

import Icon from "@mdi/react";
import { mdiFan } from "@mdi/js";
import { maxWidth } from "@material-ui/system";

class Fan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1
    };
  }

  radioSelect = () => {
    let selected = 0;
    if (this.state.selected === 3) {
      selected = 1;
    } else {
      selected = this.state.selected + 1;
    }
    this.setState({ selected: selected });
    if (selected === 1) {
      this.props.setFan("LOW");
    } else if (selected === 2) {
      this.props.setFan("MEDIUM");
    } else if (selected === 3) {
      this.props.setFan("HIGH");
    }
  };

  getButton = () => {
    if (this.props.mode === "LOW" || !this.props.mode) {
      return (
        <Col
          xs={4}
          value="LOW"
          style={{
            textAlign: "center"
            // paddingLeft: "10%"
          }}
          onClick={() => this.radioSelect()}
          active={this.state.radioSelected === 1}
        >
          <div
            style={{
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon path={mdiFan} size={1} horizontal />
          </div>
          <h3>LOW</h3>
        </Col>
      );
    } else if (this.props.mode === "MEDIUM") {
      return (
        <Col
          xs={4}
          value="MEDIUM"
          style={{
            textAlign: "center"
            // paddingLeft: "10%"
          }}
          onClick={() => this.radioSelect()}
          active={this.state.radioSelected === 2}
        >
          <div
            style={{
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon path={mdiFan} size={1.5} horizontal />
          </div>
          <h3>MEDIUM</h3>
        </Col>
      );
    } else if (this.props.mode === "HIGH") {
      return (
        <Col
          xs={4}
          value="HIGH"
          style={{
            textAlign: "center"
            // paddingLeft: "10%"
          }}
          onClick={() => this.radioSelect()}
          active={this.state.radioSelected === 3}
        >
          <div
            style={{
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon path={mdiFan} size={2} horizontal />
          </div>
          <h3>HIGH</h3>
        </Col>
      );
    }
    return <div />;
  };

  changeColor(value) {
    if (this.props.mode === value) return "rgba(238, 238, 238, 1)";
  }
  render() {
    return (
      <Row
        style={{
          MozUserSelect: "none",
          WebkitUserSelect: "none",
          msUserSelect: "none"
        }}
      >
        <Col xs={4} />
        {this.getButton()}
        <Col xs={4} />
      </Row>
    );
  }
}
export default Fan;
