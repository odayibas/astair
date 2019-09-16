import React, { Component } from "react";

import { Card, CardTitle, CardBody, Col, Progress, Row } from "reactstrap";

import Cloud from "@material-ui/icons/Cloud";
import Office from "@material-ui/icons/BusinessCenter";
import Charts from "../Dashboard/Charts-new/Charts";
import PieChart from "../Dashboard/Charts-new/PieChart";
import Icon from "@mdi/react";
import { mdiHumanMaleFemale } from "@mdi/js";
import { Divider, Grid, Image, Segment } from 'semantic-ui-react'


class DividerVertical extends Component {

    render() {
        return (
            <Segment>
                <Grid columns={2} relaxed='very'>
                    <Grid.Column>
                        <p><h4> OUTDOOR </h4></p>
                        <p><Cloud fontSize="large" /></p>
                        <p><h2> {Math.round(this.props.temp * 10) / 10} °C </h2></p>
                    </Grid.Column>

                    <Grid.Column>
                        <p><h4> INDOOR </h4></p>
                        <p><Office fontSize="large" /></p>
                        <p> <h2> {Math.round(this.props.avgsensor * 10) / 10} °C </h2></p>
                    </Grid.Column>
{/* 
                    <Grid.Column>
                        <p> <h4>SLACK</h4></p>
                        <p> <PieChart></PieChart></p>
                    </Grid.Column>

                    <Grid.Column>
                        <p>  <h4>PEOPLE</h4></p>
                        <p>  <Icon path={mdiHumanMaleFemale} size={2} horizontal /></p>
                        <p>  <h2>{this.props.people} </h2></p>
                    </Grid.Column> */}
                </Grid>

                {/* <Divider horizontal>sdsdssd</Divider> */}
            </Segment>
        );
    }
}

export default DividerVertical;
