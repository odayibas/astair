import React, { Component } from "react";
import { Col, Row, Button } from "reactstrap";
import Icon from "@mdi/react";
import { mdiThermometerPlus, mdiThermometerMinus } from "@mdi/js";

class Temperature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <div>
        <Col />
        <Col>
          <Row>
            <Button
              style={{ backgroundColor: "transparent" }}
              onClick={() => {
                this.props.adjustTemp(-1);
              }}
            >
              <Icon path={mdiThermometerMinus} size={1.5} horizontal />
            </Button>
            <div style={{ paddingLeft: 15, paddingRight: 15 }}>
              {this.state.show ? <h1>{this.props.temperature}</h1> : ""}
            </div>

            <Button
              style={{ backgroundColor: "transparent" }}
              onClick={() => {
                this.props.adjustTemp(1);
              }}
            >
              <Icon path={mdiThermometerPlus} size={1.5} horizontal />
            </Button>
          </Row>
        </Col>
        <Col />
      </div>
    );
  }
}
export default Temperature;
