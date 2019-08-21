import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import update from "immutability-helper";

class CheckBoxGroup extends Component {
  state = {
    items: []
  };
  checkedButtons;
  checkedCount = 1;

  constructor(props) {
    super(props);
    this.checkedButtons = new Set();
  }

  componentDidMount() {
    const indexedItems = this.indexItems(this.props.items);
    this.setState({ items: indexedItems });
  }

  indexItems = arr => {
    let index = 0;
    let result = [];
    arr.forEach(element => {
      result.push({ id: index, checked: false, label: element });
      index++;
    });
    result[0].checked = true;
    this.checkedButtons.add(0);
    return result;
  };

  handleClick = id => {
    const cur = this.state.items[id].checked;

    if (cur)
      if (this.checkedCount === 1) return;
      else {
        this.checkedCount--;
        this.checkedButtons.delete(id);
      }
    else {
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

  getCheckBoxes = () => {
    if (this.state.items.length === 0) return <div />;

    return this.state.items.map(item => {
      return (
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
      );
    });
  };

  render() {
    return this.getCheckBoxes();
  }
}

export default CheckBoxGroup;
