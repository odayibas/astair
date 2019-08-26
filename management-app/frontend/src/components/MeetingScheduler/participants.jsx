import React, { Component } from "react";
import { Table } from "react-bootstrap";
import update from "immutability-helper";

class ParticipantTable extends Component {
  state = {};
  index = -1;
  selectedItems;
  constructor(props) {
    super(props);
    this.state.items = this.indexItems(props.data);
    this.selectedItems = new Set([]);
  }

  indexItems = items => {
    let index = 0;
    let result = [];
    items.forEach(element => {
      result.push({ id: index, value: element, active: false });
      index++;
    });
    return result;
  };

  handleParticipantClick = id => {
    const curVal = this.state.items[id].active;

    if (curVal === false) {
      // addition
      this.selectedItems.add(id);
    } else {
      // deletion
      this.selectedItems.delete(id);
    }
    this.props.updateParticipants(this.selectedItems);
    let newItems = update(this.state.items, {
      [id]: {
        active: { $set: !curVal }
      }
    });
    this.setState({ items: newItems });
  };

  getBody = () => {
    this.index = -1;
    return this.state.items.map(item => {
      this.index++;
      let txt = "";
      if (item.active === true) {
        txt += "bg-success text-white";
      }

      return (
        <tr>
          <th
            className={txt}
            onClick={() => {
              this.handleParticipantClick(item.id);
            }}
          >
            {item.value}
          </th>
        </tr>
      );
    });
  };

  render() {
    return (
      <div style={{ overflowY: "auto", height: 200 }}>
        <Table responsive="xs" hover>
          <tbody>{this.getBody()}</tbody>
        </Table>
      </div>
    );
  }
}

export default ParticipantTable;
