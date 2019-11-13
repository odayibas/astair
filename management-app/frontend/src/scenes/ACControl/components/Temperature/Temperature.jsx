import React, { Component } from "react";
import { Col, Row, Button } from "reactstrap";
import Icon from "@mdi/react";
import {
  mdiPlusCircleOutline,
  mdiMinusCircleOutline
} from "@mdi/js";
import { Container } from "@material-ui/core";

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
        <Container>
          <Row>
            <Col xs={5} style={{ textAlign: "right", paddingRight: 0 }}>
              <Button
                style={{ backgroundColor: "transparent", border: "0" }}
                onClick={() => {
                  this.props.adjustTemp(-1);
                }}
              >
                <Icon path={mdiMinusCircleOutline} size={1.5} horizontal />
              </Button>
            </Col>
            <Col xs={2} style={{ padding: 0 }}>
              <div>
                {this.state.show ? (
                  <h1> {" " + this.props.temperature + "°"}</h1>
                ) : (
                  ""
                )}
              </div>
            </Col>
            <Col xs={5} style={{ textAlign: "left", paddingLeft: 0 }}>
              <Button
                style={{ backgroundColor: "transparent", border: "0" }}
                onClick={() => {
                  this.props.adjustTemp(1);
                }}
              >
                <Icon path={mdiPlusCircleOutline} size={1.5} horizontal />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Temperature;
