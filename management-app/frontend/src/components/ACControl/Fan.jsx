import React, { Component } from "react";
import { CardHeader } from "reactstrap";
import { Container, Col, Row } from "react-bootstrap";

import Icon from "@mdi/react";
import {
  mdiWaterOutline,
  mdiAutorenew,
  mdiSnowflakeVariant,
  mdiWeatherSunny,
  mdiFan
} from "@mdi/js";
import { maxWidth } from "@material-ui/system";

class Fan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1
    };
  }

  radioSelect = selected => {
    this.setState({
      selected: selected
    });

    if (selected === 1) {
      this.props.setFan("LOW");
    } else if (selected === 2) {
      this.props.setFan("MEDIUM");
    } else if (selected === 3) {
      this.props.setFan("HIGH");
    }
  };

  changeColor(value) {
    console.log("Val", value, "props", this.props.mode);
    if (this.props.mode === value) return "rgba(238, 238, 238, 1)";
  }
  render() {
    return (
      <Row>
        <Col
          xs={4}
          value="LOW"
          style={{
            backgroundColor: this.changeColor("LOW"),
            textAlign: "center"
            // paddingLeft: "10%"
          }}
          onClick={() => this.radioSelect(1)}
          active={this.state.radioSelected === 1}
        >
          <h3>LOW</h3>
          <Icon path={mdiSnowflakeVariant} size={2} horizontal />
        </Col>
        <Col
          xs={4}
          value="MEDIUM"
          style={{
            backgroundColor: this.changeColor("MEDIUM"),
            textAlign: "center"
          }}
          onClick={() => this.radioSelect(2)}
          active={this.state.radioSelected === 2}
        >
          <h3>MEDIUM</h3>
          <Icon path={mdiWeatherSunny} size={2} horizontal />
        </Col>
        <Col
          xs={4}
          value="HIGH"
          style={{
            backgroundColor: this.changeColor("HIGH"),
            textAlign: "center"
          }}
          onClick={() => this.radioSelect(3)}
          active={this.state.radioSelected === 3}
        >
          <h3>HIGH</h3>
          <Icon path={mdiFan} size={2} horizontal />
        </Col>
      </Row>
    );
  }
}
export default Fan;
