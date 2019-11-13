import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ButtonToolbar,
  ButtonGroup,
  Button
} from "react-bootstrap";

class Options extends Component {
  state = {};

  getButtons = () => {
    const buttons = ["Day", "Week"];
    const active = "btn-dark";
    const inactive = "btn-outline-dark";

    return buttons.map(button => {
      let classStr = "";
      if (button === "Day")
        classStr = this.props.showWeekly ? inactive : active;
      else classStr = this.props.showWeekly ? active : inactive;

      return (
        <Button
          className={classStr}
          onClick={() => {
            this.props.onRangeClick(button);
          }}
        >
          {button}
        </Button>
      );
    });
  };

  render() {
    return (
      <div className="border rounded" style={{ marginBottom: 10 }}>
        <Container>
          <Row>
            <Col xs={12} style={{ marginTop: 10 }}>
              <span style={{ fontSize: "1.25em" }}>Options</span>
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              className="text-center"
              style={{ textAlign: "-webkit-center", justifyContent: "center" }}
            >
              <div className="d-flex justify-content-center">
                <ButtonToolbar style={{ paddingBottom: 10 }}>
                  <ButtonGroup toggle className="mt-3">
                    {this.getButtons()}
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Options;
