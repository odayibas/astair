import React, { Component } from "react";

import { Card, CardTitle, CardBody, Col, Progress, Row } from "reactstrap";
import Cloud from "@material-ui/icons/Cloud";
import Office from "@material-ui/icons/BusinessCenter";
import Charts from "../Charts-new/Charts";
import PieChart from "../Charts-new/PieChart";
import Icon from "@mdi/react";
import { mdiHumanMaleFemale } from "@mdi/js";

class InfoCards extends Component {
  //to show the percentage of slack data
  slack100(a) {
    var x = this.props.hot + this.props.cold + this.props.nice;
    a = a * 100;
    var y = (a / x) * 10;
    y = parseInt(y) / 10;
    return y;
  }

  render() {
    return (
      <Row className="text-center">
        <Col>
          <Card >
            <CardBody className="pb-0" icon>
              <div className="text-value">
                {" "}
                <CardTitle>

                  <h4> OUTDOOR </h4>
                </CardTitle>

                <Cloud fontSize="large" />
                <p></p>
                <p></p>
                <h2> {Math.round(this.props.temp * 10) / 10} °C </h2>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card >
            <CardBody className="pb-0" icon>
              <div className="bg-transparent">
                <CardTitle>

                  <h4> INDOOR </h4>
                </CardTitle>

                <Office fontSize="large" />
                <p></p>
                <p></p>
                <h2> {Math.round(this.props.avgsensor * 10) / 10} °C </h2>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card >
            <CardTitle>
              <h4>SLACK</h4>
            </CardTitle>
            <PieChart>
            </PieChart>
            {/* <strong>Cold %{this.slack100(this.props.cold)}</strong>
            <Progress
              className="progress-xs mt-2"
              color="primary"
              value={this.slack100(this.props.cold)}
            />
            <strong>Nice %{this.slack100(this.props.nice)}</strong>
            <Progress
              className="progress-xs mt-2"
              color="success"
              value={this.slack100(this.props.nice)}
            />
 
            <strong>Hot %{this.slack100(this.props.hot)}</strong>
            <Progress
              className="progress-xs mt-2"
              color="danger"
              value={this.slack100(this.props.hot)}
            /> */}
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody className="pb-0">
              <CardTitle>

                <h4>PEOPLE</h4>

              </CardTitle>

              <Icon path={mdiHumanMaleFemale} size={2} horizontal />
              <p></p>
              <h2>{this.props.people} </h2>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default InfoCards;