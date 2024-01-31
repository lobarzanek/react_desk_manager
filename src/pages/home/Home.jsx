import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetRoomMap, SendDeskReservation } from "../../data/restService.js";
import ChooseBox from "../../components/chooseBox/ChooseBox";
import Button from "../../components/button/Button";
import DatePicker from "../../components/datePicker/datePicker";
import DeskMap from "../../components/deskMap/DeskMap";
import "./home.scss";

const Home = () => {
  {
    const [isLoading, SetIsLoading] = useState(false);
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
        SetMapSVG(emptySVG);
        return;
      }
      try {
        SetIsLoading(true);
        const mapResponse = await GetRoomMap(selected.room, selected.date);
        if (mapResponse.status === 200) {
          SetMapSVG(mapResponse.data[0].svgMap);
        } else {
          SetMapSVG(emptySVG);
        }
        SetIsLoading(false);
      } catch {
        SetMapSVG(emptySVG);
        SetIsLoading(false);
      }
    };

    const sendReservation = async () => {
      if (selected.date === "" || selected.desk == 0) {
        toast.error("Musisz najpierw wybrać datę i biurko!");
        return;
      }
      try {
        SetIsLoading(true);
        const deskResponse = await toast.promise(
          SendDeskReservation(selected.date, selected.desk),
          {
            pending: "Dodawanie rezerwacji..",
            success: "Rezerwacja dodana! 👌",
            error: "Nie udało się dodać rezerwacji 😥",
          }
        );

        if (deskResponse.status === 201) {
          selected.desk = 0;
          await getRoomSvg();
        } else {
          SetIsLoading(false);
        }
      } catch {
        SetIsLoading(false);
      }
    };

    const handleBoxChange = (selectedType, selectedValue) => {
      setSelected((prevOptions) => ({
        ...prevOptions,
        [selectedType]: selectedValue,
      }));
    };

    useEffect(() => {
      selected.desk = 0;
      getRoomSvg();
    }, [selected.room, selected.date]);

    useEffect(() => {
      selected.room = 0;
      selected.desk = 0;
      getRoomSvg();
    }, [selected.floor]);

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
            <Button text={"Rezerwuj"} onClick={sendReservation} />
          </div>
          <div className="shadow-box">
            <DeskMap
              isLoading={isLoading}
              date={selected.date}
              roomId={selected.room}
              deskId={selected.desk}
              onChange={handleBoxChange}
              mapSVG={mapSVG}
            />
          </div>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  }
};

export default Home;
