import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { GetBasicDeskInfoByRoomId, SendIssue } from "../../data/restService.js";
import ChooseBox from "../../components/chooseBox/ChooseBox";
import Button from "../../components/button/Button";
import "./issue.scss";

const Issue = () => {
  const [selected, setSelected] = useState({
    floor: 0,
    room: 0,
    desk: 0,
    description: "",
  });

  const [deskData, SetDeskData] = useState([]);

  const getDesks = async () => {
    if (selected.room === 0) {
      return;
    }
    try {
      const response = await GetBasicDeskInfoByRoomId(selected.room);
      if (response.status === 200) {
        SetDeskData(response.data);
      } else {
        SetDeskData([]);
      }
    } catch {
      SetDeskData([]);
    }
  };

  const sendIssue = async () => {
    if (selected.desk === 0 || selected.desk === "") {
      toast.error("Musisz najpierw wybrać biurko!");
      return;
    }
    if (selected.description.length < 3) {
      toast.error("Zbyt krótki opis zgłoszenia!");
      return;
    }

    try {
      await toast.promise(
        SendIssue(selected.desk, selected.description),
        {
          pending: "Dodawanie zgłoszenia..",
          success: "Zgłoszenie dodana! 👌",
          error: "Nie udało się dodać zgłoszenia 🤯",
        }
      );
    } catch {}
  };

  const handleBoxChange = (selectedType, selectedValue) => {
    setSelected((prevOptions) => ({
      ...prevOptions,
      [selectedType]: selectedValue,
    }));
  };

  useEffect(() => {
    getDesks();
  }, [selected.room]);

  {
    return (
      <div className="issue">
        <div className="choose-boxes">
          <ChooseBox type="floor" onChange={handleBoxChange} />
          <ChooseBox
            type="room"
            selectedId={selected.floor}
            onChange={handleBoxChange}
          />
          <ChooseBox
            type="desk"
            data={deskData}
            selectedDate={selected.date}
            selectedId={selected.room}
            secondId={selected.desk}
            onChange={handleBoxChange}
            issue={true}
          />
          <Button onClick={sendIssue} text={"zgłoś usterke"} />
        </div>
        <div className="text-area">
          <textarea
            onChange={(e) => handleBoxChange("description", e.target.value)}
            placeholder="Opisz tutaj swoją usterke"
          ></textarea>
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

export default Issue;
