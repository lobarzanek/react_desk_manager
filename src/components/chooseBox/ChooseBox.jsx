import React, { Component } from "react";
import "./chooseBox.scss";

class ChooseBox extends Component {
  render() {
    return (
      <select className="chooseBox">
        <option value="">--Please choose an option--</option>
      </select>
    );
  }
}

export default ChooseBox;
