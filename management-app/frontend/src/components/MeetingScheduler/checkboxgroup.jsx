import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import update from "immutability-helper";
import { Container, Row, Col } from "react-bootstrap";

class CheckBoxGroup extends Component {
  state = {
    items: []
  };
  checkedButtons;
  checkedCount = 0;

  constructor(props) {
    super(props);
    this.checkedButtons = new Set();
  }

  componentWillReceiveProps(newProps) {
    console.log("NEEEWWWW", newProps.items);
    if (
      (!this.props.items && newProps.items) ||
      this.props.items !== newProps.items
    ) {
      const indexedItems = this.indexItems(newProps.items);
      this.setState({ items: indexedItems });
    }
  }

  componentDidMount() {}

  indexItems = arr => {
    if (!arr) return [];
    let index = 0;
    let result = [];
    arr.forEach(element => {
      result.push({ id: index, checked: false, label: element });
      index++;
    });
    return result;
  };

  handleClick = id => {
    const cur = this.state.items[id].checked;

    if (cur) {
      this.checkedCount--;
      this.checkedButtons.delete(id);
    } else {
      this.checkedCount++;
      this.checkedButtons.add(id);
    }

    let newStatus = update(this.state.items, {
      [id]: {
        checked: {
          $set: !cur
        }
      }
    });
    this.setState({ items: newStatus }, () => {
      this.props.onSelectedItems(this.checkedButtons);
    });
  };

  handleClickAsRadioButtons = id => {
    const cur = this.state.items[id].checked;

    if (cur)
      if (this.checkedCount === 1) return;
      else {
        this.checkedCount--;
        this.checkedButtons.delete(id);
      }
    else {
      this.checkedCount = 1;
      let it = this.checkedButtons.values();
      it = it.next();
      // console.log("Close ", it.value);
      let up = update(this.state.items, {
        [it.value]: {
          checked: {
            $set: false
          }
        }
      });
      this.setState({ items: up }, () => {
        // console.log("Final items", this.state.items);
        let newStatus = update(this.state.items, {
          [id]: {
            checked: {
              $set: !cur
            }
          }
        });
        this.setState({ items: newStatus }, () => {
          this.props.onSelectedItems(this.checkedButtons);
        });
        this.props.onSelectedItems(this.checkedButtons);
      });
      this.checkedButtons.clear();

      this.checkedButtons.add(id);
    }
  };

  getCheckBoxes = () => {
    if (this.state.items.length === 0) return <div />;

    return this.state.items.map(item => {
      return (
        <Row>
          <Col xs={12} className="text-left">
            <FormControlLabel
              control={
                <Checkbox
                  color={"default"}
                  key={item.id}
                  onChange={() => {
                    this.handleClick(item.id);
                  }}
                  checked={item.checked}
                />
              }
              label={item.label}
            />
          </Col>
        </Row>
      );
    });
  };

  render() {
    return (
      <div className="border rounded">
        <Container>
          <Row>
            <Col xs={12} style={{ marginBottom: 10, marginTop: 10 }}>
              <span style={{ fontSize: "1.25em" }}>Rooms</span>
            </Col>
          </Row>
          <div style={{ maxHeight: 150, overflowY: "auto" }}>
            {this.getCheckBoxes()}
          </div>
        </Container>
      </div>
    );
  }
}

export default CheckBoxGroup;
