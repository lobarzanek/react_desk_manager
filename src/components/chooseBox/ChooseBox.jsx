import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  GetBasicFloorInfo,
  GetBasicRoomInfoByFloorId,
  GetBasicDeskInfoByRoomId,
} from "../../data/getData.js";
import "./chooseBox.scss";

const ChooseBox = ({ type, selectedId, onChange, secondId }) => {
  const ref = useRef(null);
  const [value, setValue] = useState("");
  const [defValue, setDefValue] = useState("");
  const [boxData, setBoxData] = useState([]);

  const setDefaultValue = () => {
    switch (type) {
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
    const selectedId = event.target[event.target.selectedIndex].id;
    onChange(type, selectedId);
  };

  async function getBoxData() {
    try {
      switch (type) {
        case "floor":
          const floorResponse = await GetBasicFloorInfo();
          if (floorResponse.status === 200 && floorResponse.data.length > 0) {
            setBoxData(floorResponse.data);
          }
          break;
        case "room":
          const roomResponse = await GetBasicRoomInfoByFloorId(selectedId);
          if (roomResponse.status === 200 && roomResponse.data.length > 0) {
            setBoxData(roomResponse.data);
          }
          break;
        case "desk":
          const deskResponse = await GetBasicDeskInfoByRoomId(selectedId);
          if (deskResponse.status === 200 && deskResponse.data.length > 0) {
            setBoxData(deskResponse.data);
          }
          break;
      }
    } catch (error) {}
  }

  const setValueToChoosenDesk = () => {
    if (boxData.length > 0 && secondId > 0) {
      const desk = boxData.find((d) => d.id == secondId);
      const element = ref.current;
      element.value = desk.name;
    }
  };

  useState(() => {
    if (type === "floor") {
      getBoxData();
    }
    setDefaultValue();
  }, []);

  useEffect(() => {
    setBoxData([]);
    setDefaultValue();
    getBoxData();
  }, [selectedId]);

  useEffect(() => {
    if (type === "desk") {
      setValueToChoosenDesk();
    }
  }, [secondId]);

  return (
    <div className={`chooseBox ${type}`}>
      <select
        ref={ref}
        value={value}
        className={`select`}
        onChange={handleOptionChange}
      >
        <option value={""}>{defValue}</option>
        {boxData.map((option) => (
          <option value={option.name} key={option.id} id={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChooseBox;
