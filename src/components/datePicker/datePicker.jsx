import React, { useState, useEffect } from "react";
import "./datePicker.scss";

const DatePicker = ({ onChange }) => {
  const [minValue, setMinValue] = useState("");
  const [value, setValue] = useState("");

  const setMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    setMinValue(formattedDate);
  };

  const handleValueChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    onChange("date", selectedValue);
  };

  useEffect(() => {
    setMinDate();
  }, []);

  return (
    <input
      className="datePicker"
      type="date"
      name="trip-start"
      defaultValue={value}
      min={minValue}
      onChange={handleValueChange}
    />
  );
};

export default DatePicker;
