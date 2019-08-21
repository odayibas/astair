import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import DropdownMenu from "./dropdownMenu";
import CheckBoxGroup from "./checkboxgroup";
import { Button } from "@material-ui/core";
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
            width: maxWidth,
            height: 300
          }}
        >
          <SummaryPanel data={this.props.summaryData} />
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
          <button
            type="button"
            className="btn btn-outline-danger"
            style={{ margin: "10px" }}
            onClick={this.props.onClear}
          >
            Clear
          </button>
          <button
            type="button"
            className="btn btn-outline-dark"
            style={{ margin: "10px" }}
            onClick={() => {
              // this.props.onCreateMeeting
              return axios
                .get(urlServer + "/meeting/get-last-meeting")
                .then(res => {
                  console.log(
                    "The url was " + urlServer + "/meeting/get-last-meeting"
                  );
                  console.log(res.data[0]);
                })
                .catch(err => {
                  console.log(
                    "The url was " + urlServer + "/meeting/get-last-meeting"
                  );
                  console.log("****", err);
                });
            }}
          >
            Create
          </button>
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
            items={["Room A", "Room B", "Room C"]}
          />
          <Row>
            <Col md={6}>
              <Button
                onClick={() => {
                  this.props.onNextSchedule(-1);
                }}
              >
                Prev
              </Button>
            </Col>
            <Col md={6}>
              <Button
                onClick={() => {
                  this.props.onNextSchedule(1);
                }}
              >
                Next
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
