import React, { Component } from "react";
import "./button.scss";

class Button extends Component {
  render() {
    const { text } = this.props;

    return <button className="button">{text}</button>;
  }
}

export default Button;
