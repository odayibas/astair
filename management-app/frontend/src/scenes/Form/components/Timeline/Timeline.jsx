import React, { Component } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Row } from "reactstrap";

import Icon from "@mdi/react";
import {
  mdiFlagOutline,
  mdiBriefcaseOutline,
  mdiSnowflakeVariant,
  mdiThumbUpOutline,
  mdiWeatherSunny
} from "@mdi/js";

//sets the icon of each timeline event
function setIcon(resultArr, i) {
  if (resultArr[i].vote === "Hot") {
    return <Icon path={mdiWeatherSunny} size={1} />;
  } else if (resultArr[i].vote === "Nice") {
    return <Icon path={mdiThumbUpOutline} size={1} />;
  } else if (resultArr[i].vote === "Cold") {
    return <Icon path={mdiSnowflakeVariant} size={1} />;
  } else {
    return <Icon path={mdiBriefcaseOutline} size={1} />;
  }
}

//sets the color of each timeline event
function colorChange(resultArr, i) {
  if (resultArr[i].vote === "Hot") {
    return "rgb(233, 30, 99)";
  } else if (resultArr[i].vote === "Nice") {
    return "rgb(16, 204, 82)";
  } else if (resultArr[i].vote === "Cold") {
    return "rgb(33, 150, 243)";
  } else return "rgba(238, 238, 238, 1)";
}

class Timeline extends Component {
  //creates the timeline
  createTimeLine(resultArr) {
    return resultArr.map((result, i) => (
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date={resultArr[i].date_time}
        iconStyle={{ background: colorChange(resultArr, i), color: "#fff" }}
        icon={setIcon(resultArr, i)}
      >
        <Row>
          <Icon path={mdiFlagOutline} size={1} horizontal />
          {resultArr[i].region}
        </Row>
        <Row>{resultArr[i].vote}</Row>
      </VerticalTimelineElement>
    ));
  }

  render() {
    var resultArr = this.props.results;
    return (
      <div>
        <VerticalTimeline style={{ background: "rgb(33, 150, 243)" }}>
          {this.createTimeLine(resultArr)}
        </VerticalTimeline>
      </div>
    );
  }
}

export default Timeline;
