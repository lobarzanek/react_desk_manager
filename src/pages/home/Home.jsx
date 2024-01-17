import React, { useState, useEffect } from "react";
import { GetRoomMap } from "../../data/restService.js";
import ChooseBox from "../../components/chooseBox/ChooseBox";
import Button from "../../components/button/Button";
import DatePicker from "../../components/datePicker/datePicker";
import DeskMap from "../../components/deskMap/DeskMap";
import "./home.scss";

const Home = () => {
  {
    const [selected, setSelected] = useState({
      floor: 0,
      room: 0,
      desk: 0,
      date: "",
    });

    const emptySVG = {
      mapViewBox: "10 10 10 10",
      mapWidth: "10",
      mapHeight: "10",
      mapXmlns: "http://www.w3.org/2000/svg",
      desks: [],
    };

    const [mapSVG, SetMapSVG] = useState(emptySVG);

    const getRoomSvg = async () => {
      if (selected.room === 0 || selected.date == "") {
        return;
      }
      try {
        const mapResponse = await GetRoomMap(selected.room, selected.date);
        if (mapResponse.status === 200) {
          SetMapSVG(mapResponse.data.svgMap);
        } else {
          SetMapSVG(emptySVG);
        }
      } catch {
        SetMapSVG(emptySVG);
      }
    };

    const handleBoxChange = (selectedType, selectedValue) => {
      setSelected((prevOptions) => ({
        ...prevOptions,
        [selectedType]: selectedValue,
      }));
    };

    useEffect(() => {
      getRoomSvg();
    }, [selected.room, selected.date]);

    return (
      <div className="home">
        <div className="wrapper">
          <div className="choose-boxes">
            <DatePicker onChange={handleBoxChange} />
            <ChooseBox type="floor" onChange={handleBoxChange} />
            <ChooseBox
              type="room"
              selectedId={selected.floor}
              onChange={handleBoxChange}
            />
            <ChooseBox
              type="desk"
              data={mapSVG}
              selectedDate={selected.date}
              selectedId={selected.room}
              secondId={selected.desk}
              onChange={handleBoxChange}
            />
            <Button text={"Rezerwuj"} />
          </div>
          <div className="shadow-box">
            <DeskMap
              date={selected.date}
              roomId={selected.room}
              deskId={selected.desk}
              onChange={handleBoxChange}
              mapSVG={mapSVG}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
