import React, { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import DropdownMenu from "./dropdownMenu";
import CheckBoxGroup from "./checkboxgroup";
import color from "@material-ui/core/colors/brown";
import { maxWidth, maxHeight } from "@material-ui/system";
import SummaryPanel from "./summarypanel";

import axios from "axios";

const urlServer = process.env.REACT_APP_ASTAIR_MANAGEMENT_BACKEND;

class ButtonPanel extends Component {
  state = {};

  getSummaryPanel = () => {
    if (this.props.showSummary) {
      return (
        <div
          style={{
            marginTop: 30,
            backgroundColor: "#43494D",
            width: maxWidth
          }}
        >
          <SummaryPanel
            data={this.props.summaryData}
            onCreateMeeting={this.props.onCreateMeeting}
          />
        </div>
      );
    } else {
      return;
    }
  };

  render() {
    return (
      <div>
        <Container>
          {/* <button
            type="button"
            className="btn btn-outline-danger"
            style={{ margin: "10px" }}
            onClick={this.props.onClear}
          >
            Clear
          </button> */}

          {/* <DropdownMenu
            items={this.props.rooms}
            onSelected={id => {
              this.props.onSelected(id);
            }}
          /> */}

          <CheckBoxGroup
            onSelectedItems={roomset => {
              this.props.onMultiRoomSelected(roomset);
            }}
            items={this.props.rooms}
          />

          <Row className="flex-row">
            <Col xs={6}>
              <Button
                xs={12}
                block
                variant="warning"
                onClick={() => {
                  this.props.onNextSchedule(-1);
                }}
              >
                {"<"}
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                xs={12}
                block
                variant="warning"
                onClick={() => {
                  this.props.onNextSchedule(1);
                }}
              >
                {">"}
              </Button>
            </Col>
          </Row>
          {this.getSummaryPanel()}
        </Container>
      </div>
    );
  }
}

export default ButtonPanel;
