import React, { Component } from "react";
import { CardHeader, Col, Row } from "reactstrap";

import Icon from "@mdi/react";
import {
  mdiWaterOutline,
  mdiAutorenew,
  mdiSnowflakeVariant,
  mdiWeatherSunny,
  mdiFan
} from "@mdi/js";

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
    if (this.props.mode === value) return "rgba(238, 238, 238, 1)";
  }
  render() {
    return (
      <CardHeader>
        <div style={{ padding: 20 }}>
          <Row>
            <Col
              value="COOL"
              style={{
                backgroundColor: this.changeColor("COOL"),
                paddingLeft: "10%"
              }}
              onClick={() => this.radioSelect(1)}
              active={this.state.radioSelected === 1}
            >
              <h3>LOW</h3>
              <Icon path={mdiSnowflakeVariant} size={2} horizontal />
            </Col>
            <Col
              value="HEAT"
              style={{ backgroundColor: this.changeColor("HEAT") }}
              onClick={() => this.radioSelect(2)}
              active={this.state.radioSelected === 2}
            >
              <h3>MEDIUM</h3>
              <Icon path={mdiWeatherSunny} size={2} horizontal />
            </Col>
            <Col
              value="FAN"
              style={{ backgroundColor: this.changeColor("FAN") }}
              onClick={() => this.radioSelect(3)}
              active={this.state.radioSelected === 3}
            >
              <h3>HIGH</h3>
              <Icon path={mdiFan} size={2} horizontal />
            </Col>
          </Row>
        </div>
      </CardHeader>
    );
  }
}
export default Fan;
