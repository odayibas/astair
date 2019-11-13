import React, { Component } from "react";
import { Col, Row } from "reactstrap";

import Icon from "@mdi/react";
import {
  mdiWaterOutline,
  mdiAutorenew,
  mdiSnowflakeVariant,
  mdiWeatherSunny,
  mdiFan
} from "@mdi/js";

class Mode extends Component {
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
      this.props.setMode("COOL");
    } else if (selected === 2) {
      this.props.setMode("HEAT");
    } else if (selected === 3) {
      this.props.setMode("FAN");
    } else if (selected === 4) {
      this.props.setMode("AUTO");
    } else {
      this.props.setMode("DRY");
    }
  };

  changeColor(value) {
    if (this.props.mode === value) return "rgba(238, 238, 238, 1)";
  }
  render() {
    return (
      <div style={{ padding: 0 }}>
        <Row>
          <Col xs={1} style={{ padding: 0 }} />
          <Col
            className={this.props.mode === "COOL" ? "border border-dark" : ""}
            xs={2}
            value="COOL"
            style={{
              padding: 6
              // backgroundColor: this.changeColor("COOL")
            }}
            onClick={() => this.radioSelect(1)}
            active={this.state.radioSelected === 1}
          >
            <Icon path={mdiSnowflakeVariant} size={2} horizontal />
            <h3>COOL</h3>
          </Col>
          <Col
            className={this.props.mode === "HEAT" ? "border border-dark" : ""}
            xs={2}
            value="HEAT"
            style={{ padding: 6 }}
            onClick={() => this.radioSelect(2)}
            active={this.state.radioSelected === 2}
          >
            <Icon path={mdiWeatherSunny} size={2} horizontal />
            <h3>HEAT</h3>
          </Col>
          <Col
            className={this.props.mode === "FAN" ? "border border-dark" : ""}
            xs={2}
            value="FAN"
            // style={{ backgroundColor: this.changeColor("FAN") }}
            style={{ padding: 6 }}
            onClick={() => this.radioSelect(3)}
            active={this.state.radioSelected === 3}
          >
            <Icon path={mdiFan} size={2} horizontal />
            <h3>FAN</h3>
          </Col>
          <Col
            className={this.props.mode === "AUTO" ? "border border-dark" : ""}
            xs={2}
            value="AUTO"
            style={{ padding: 6 }}
            onClick={() => this.radioSelect(4)}
            active={this.state.radioSelected === 4}
          >
            <Icon path={mdiAutorenew} size={2} horizontal />
            <h3>AUTO</h3>
          </Col>
          <Col
            className={this.props.mode === "DRY" ? "border border-dark" : ""}
            xs={2}
            value="DRY"
            style={{ padding: 6 }}
            onClick={() => this.radioSelect(5)}
            active={this.state.radioSelected === 5}
          >
            <Icon path={mdiWaterOutline} size={2} horizontal />
            <h3>DRY</h3>
          </Col>
          <Col xs={1} style={{ padding: 0 }} />
        </Row>
      </div>
    );
  }
}
export default Mode;
