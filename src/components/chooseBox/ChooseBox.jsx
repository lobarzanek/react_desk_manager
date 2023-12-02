import React, { useState } from "react";
import "./chooseBox.scss";

const ChooseBox = (props) => {
  const arr = ["asd", "asda"];
  const [value, setValue] = useState("");
  const [defValue, setDefValue] = useState("");

  const setDefaultValue = () => {
    switch (props.type) {
      case "floor":
        setDefValue("Wybierz piętro");
        break;
      case "room":
        setDefValue("Wybierz pokój");
        break;
      case "desk":
        setDefValue("Wybierz biurko");
        break;
    }
  };
  const handleOptionChange = (event) => {
    setValue(event.target.value);
  };

  useState(() => {
    setDefaultValue();
  });
  return (
    <select value={value} className="chooseBox" onChange={handleOptionChange}>
      <option value={""}>{defValue}</option>
      {arr.map((option, index) => (
        <option value={option} key={index}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default ChooseBox;
