import React, { useState } from "react";
import ChooseBox from "../../components/chooseBox/ChooseBox";
import Button from "../../components/button/Button";
import "./issue.scss";

const Issue = () => {
  const [selectedId, setSelectedId] = useState({
    floor: "",
    room: "",
  });

  const handleBoxChange = (selectedType, selectedValue) => {
    setSelectedId((prevOptions) => ({
      ...prevOptions,
      [selectedType]: selectedValue,
    }));
  };
  {
    return (
      <div className="issue">
        <div className="choose-boxes">
          <ChooseBox type="floor" onChange={handleBoxChange} />
          <ChooseBox
            type="room"
            selectedId={selectedId.floor}
            onChange={handleBoxChange}
          />
          <ChooseBox
            type="desk"
            selectedId={selectedId.room}
            onChange={handleBoxChange}
          />
          <Button text={"zgłoś usterke"} />
        </div>
        <div className="text-area">
          <textarea placeholder="Opisz tutaj swoją usterke"></textarea>
        </div>
      </div>
    );
  }
};

export default Issue;
