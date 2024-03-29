import React, { useEffect, useState, useRef } from "react";
import {
  GetBasicFloorInfo,
  GetBasicRoomInfoByFloorId,
} from "../../data/restService.js";
import "./chooseBox.scss";

const ChooseBox = ({
  type,
  selectedId,
  onChange,
  secondId,
  data,
  issue = false,
}) => {
  const ref = useRef(null);
  const [value, setValue] = useState("");
  const [defValue, setDefValue] = useState("");
  const [boxData, setBoxData] = useState([]);

  const setDefaultValue = () => {
    switch (type) {
      case "floor":
        setValue("");
        setDefValue("Wybierz piętro");
        break;
      case "room":
        setValue("");
        setDefValue("Wybierz pokój");
        break;
      case "desk":
        setValue("");
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
          if (selectedId == 0) return;
          const roomResponse = await GetBasicRoomInfoByFloorId(selectedId);
          if (roomResponse.status === 200 && roomResponse.data.length > 0) {
            setBoxData(roomResponse.data);
          }
          break;
        case "desk":
          if (selectedId == 0) return;
          if (!issue && data.desks.length > 0) {
            const desks = data.desks.filter((d) => d.status === "Free");
            setBoxData(desks);
          } else if (issue && data.length > 0) {
            const desks = data.filter((d) => d.status !== "Broken");
            setBoxData(desks);
          } else {
            setBoxData([]);
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

  useEffect(() => {
    if (type === "desk") {
      getBoxData();
      setDefaultValue();
    }
  }, [data]);

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
