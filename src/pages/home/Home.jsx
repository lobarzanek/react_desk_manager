import React, { useState } from "react";
import ChooseBox from "../../components/chooseBox/ChooseBox";
import Button from "../../components/button/Button";
import DatePicker from "../../components/datePicker/datePicker";
import "./home.scss";

const Home = () => {
{
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

    return (
      <div className="home">
        <div className="choose-boxes">
          <DatePicker />
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
          <Button text={"Rezerwuj"} />
        </div>
        <div className="desk-map">desk map</div>
      </div>
    );
  }
}

export default Home;
