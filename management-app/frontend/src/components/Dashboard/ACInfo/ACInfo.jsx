import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

import AC from "@material-ui/icons/AcUnit";

class ACInfo extends Component {
  OnOff(x) {
    if (x === "0")
      return (
        <div>
          <h4 style={{ textAlign: "center" }}> OFF </h4>{" "}
        </div>
      );
    else
      return (
        <div>
          <h4 style={{ textAlign: "center" }}> ON </h4>{" "}
        </div>
      );
  }

  // creates the ac info cards
  getACInfo = acArr => {
    return acArr.map((ac, i) => (
      <Col style={{ margin: 20, marginTop: "-20px" }}>
        <Card style={{ background: hexToRgba("#663399", 10) }}>
          <CardBody className="pb-0">
            <div>
              <h3 style={{ textAlign: "center" }}>
                {" "}
                <AC /> REGION {i + 1} AC INFO{" "}
                <p></p>
              </h3>
            </div>
            <div>
              <h4 style={{ textAlign: "center" }}>
                {Math.round(this.props.ac[i].ac_degree * 10) / 10} °C
              </h4>{" "}
            </div>
            <div>
              <h4 style={{ textAlign: "center" }}>
                {" "}
                {this.props.ac[i].ac_mode}{" "}
              </h4>{" "}
            </div>
            <div>
              <h4 style={{ textAlign: "center" }}>
                {" "}
                {this.props.ac[i].ac_fan_speed}{" "}
              </h4>{" "}
            </div>
            <div>
              <h4 style={{ textAlign: "center" }}>
                {" "}
                {this.OnOff(this.props.ac[i].active)}
              </h4>{" "}
            </div>
          </CardBody>
          <div className="chart-wrapper mx-3" style={{ height: "40px" }} />
        </Card>
      </Col>
    ));
  };

  render() {
    const acArr = this.props.ac.sort((ac, ac2) => ac[0] - ac2[0]);

    return <Row>{this.getACInfo(acArr)}</Row>;
  }
}

export default ACInfo;
