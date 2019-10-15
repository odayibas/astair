import React, { Component } from "react";

class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  render() {
    let classes = `toast ${this.props.level} `;
    classes += this.state.visible ? "visible" : "";
    return (
      <div className={classes}>
        <figure>
          <img src={this.getIcon()} />
        </figure>
        <span style={{ color: "#ffffff" }}>{this.props.message}</span>
      </div>
    );
  }

  getIcon() {
    switch (this.props.level) {
      case "warning":
        return "http://svgshare.com/i/19x.svg";
      case "danger":
        return "http://svgshare.com/i/19E.svg";
      case "success":
        return "http://svgshare.com/i/19y.svg";
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({
        visible: nextProps.visible
      });
    }
  }
}

export default Toast;
