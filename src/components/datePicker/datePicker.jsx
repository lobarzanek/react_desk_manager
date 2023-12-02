import React, { Component } from "react";
import "./datePicker.scss";

class DatePicker extends Component {
  state = { minValue: "", value: "" };

  SetCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    this.setState({ minValue: formattedDate });
  };

  handleValueChange = (event) => {
    const selectedValue = event.target.value;
    this.setState({ value: selectedValue });
  };

  componentDidMount() {
    this.SetCurrentDate();
  }
  render() {
    return (
      <input
        className="datePicker"
        type="date"
        name="trip-start"
        defaultValue={this.state.valminValueue}
        min={this.state.minValue}
        onChange={this.handleValueChange}
      />
    );
  }
}

export default DatePicker;
