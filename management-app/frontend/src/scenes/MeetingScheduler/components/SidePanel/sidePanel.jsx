import React, { Component } from "react";
import { Container } from "react-bootstrap";
import CheckBoxGroup from "../CheckBoxGroup/checkboxgroup";
import SummaryPanel from "../SummaryPanel/summarypanel";
import Options from "../Options/options";


class ButtonPanel extends Component {
  state = {};

  getSummaryPanel = () => {
    if (this.props.showSummary) {
      return (
        <SummaryPanel
          showToast={this.props.showToast}
          hideToast={this.props.hideToast}
          data={this.props.summaryData}
          onCreateMeeting={this.props.onCreateMeeting}
          onShowDialog={this.props.onShowDialog}
        />
      );
    } else {
      return;
    }
  };

  getRoomsPanel = () => {
    return (
      <CheckBoxGroup
        getCheckedCount={this.props.getCheckedCount}
        onSelectedItems={roomset => {
          this.props.onMultiRoomSelected(roomset);
        }}
        items={this.props.rooms}
      />
    );
  };

  getOptionsPanel = () => {
    return (
      <Options
        showWeekly={this.props.showWeekly}
        onRangeClick={this.props.onRangeClick}
      ></Options>
    );
  };

  render() {
    return (
      <div>
        <Container>
          {this.getOptionsPanel()}
          {this.getRoomsPanel()}
          {this.getSummaryPanel()}
        </Container>
      </div>
    );
  }
}

export default ButtonPanel;
