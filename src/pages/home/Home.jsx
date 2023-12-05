import React, { useState } from "react";
import ChooseBox from "../../components/chooseBox/ChooseBox";
import Button from "../../components/button/Button";
import DatePicker from "../../components/datePicker/datePicker";
import DeskMap from "../../components/deskMap/DeskMap";
import "./home.scss";

const Home = () => {
  {
    const [selectedId, setSelectedId] = useState({
      floor: 0,
      room: 0,
      desk: 0,
    });

    const handleBoxChange = (selectedType, selectedValue) => {
      setSelectedId((prevOptions) => ({
        ...prevOptions,
        [selectedType]: selectedValue,
        
      }));
    };

    return (
      <div className="home">
        <div className="wrapper">
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
              secondId={selectedId.desk}
              onChange={handleBoxChange}
            />
            <Button text={"Rezerwuj"} />
          </div>
          <div className="shadow-box">
            <DeskMap
              roomId={selectedId.room}
              deskId={selectedId.desk}
              onChange={handleBoxChange}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
