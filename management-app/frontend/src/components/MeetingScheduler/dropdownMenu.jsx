import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

class DropdownMenu extends Component {
  state = {
    currentName: ""
  };

  itemList;
  tempName;
  index = 0;

  constructor(props) {
    super(props);
    this.itemList = this.indexItems(props.items);
    this.tempName = props.items[0];
  }

  componentDidMount() {
    this.setState({ currentName: this.tempName }, () => {
      this.tempName = undefined;
      delete this.tempName;
    });
  }

  handleItemClick = id => {
    let val = this.props.items[id];
    this.setState({ currentName: val });
    this.props.onSelected(id);
  };

  indexItems = arr => {
    let result = [];
    arr.map(item => {
      result.push({
        id: this.index,
        value: item
      });
      this.index++;
    });
    return result;
  };

  getMenuItems = () => {
    return (
      <Dropdown.Menu>
        {this.itemList.map(item => {
          return (
            <Dropdown.Item
              as="button"
              key={item.id}
              //eventKey={item.id}
              onClick={() => {
                this.handleItemClick(item.id);
              }}
            >
              {item.value}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    );
  };

  render() {
    this.index = 0;
    return (
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          {this.state.currentName}
        </Dropdown.Toggle>
        {this.getMenuItems()}
      </Dropdown>
    );
  }
}

export default DropdownMenu;
