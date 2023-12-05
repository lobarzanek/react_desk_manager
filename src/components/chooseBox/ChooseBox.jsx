import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
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
          await axios.get("http://localhost:8000/floors").then((response) => {
            if (response.statusText === "OK") {
              setBoxData(response.data);
            }
          });
          break;
        case "room":
          await axios
            .get(`http://localhost:8000/rooms?floorId=${selectedId}`)
            .then((response) => {
              if (response.statusText === "OK") {
                setBoxData(response.data);
              }
            });
          break;
        case "desk":
          await axios
            .get(`http://localhost:8000/desks?roomId=${selectedId}`)
            .then((response) => {
              if (response.statusText === "OK") {
                setBoxData(response.data);
              }
            });
          break;
      }
    } catch (error) {
      console.log(error);
    }
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
