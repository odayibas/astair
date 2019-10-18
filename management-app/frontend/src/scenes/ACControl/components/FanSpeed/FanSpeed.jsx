import React, { Component } from "react";
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";

class FanSpeed extends Component {
  onChange = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <FormLabel> FAN</FormLabel>
            <h5>FAN</h5>
            <FormControl
              name="fan_speed"
              value={this.props.fan_speed}
              onChange={this.onChange}
              as="select"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </FormControl>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
export default FanSpeed;
