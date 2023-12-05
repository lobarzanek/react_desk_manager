import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./deskMap.scss";
import { render } from "react-dom";

const DeskMap = ({ roomId, deskId, onChange }) => {
  const emptySVG = {
    _viewBox: "10 10 10 10",
    _width: "10",
    _height: "10",
    _xmlns: "http://www.w3.org/2000/svg",
    rect: [],
  };

  const [mapSVG, SetMapSVG] = useState(emptySVG);

  const getRoomSvg = async () => {
    if (roomId === 0) {
      return;
    }
    try {
      await axios
        .get(`http://localhost:8000/rooms/${roomId}`)
        .then((response) => {
          if (
            response.statusText === "OK" &&
            response.data.hasOwnProperty("svg")
          ) {
            SetMapSVG(response.data.svg);
          } else {
            SetMapSVG(emptySVG);
          }
        });
    } catch (error) {
      // console.log(error);
    }
  };

  const handleDeskChange = (id) => {
    onChange("desk", id);
  };

  const isSelected = (id) => {
    if (id == deskId) {
      return "selected";
    }
  };

  useEffect(() => {
    getRoomSvg();
  }, [roomId]);

  useEffect(() => {}, [deskId]);

  return (
    <div className="map">
      <svg
        viewBox={mapSVG._viewBox}
        width={mapSVG._width}
        height={mapSVG._height}
        xmlns={mapSVG._xmlns}
      >
        {mapSVG.rect.map((r, index) => (
          <rect
            key={uuidv4()}
            onClick={() => handleDeskChange(r.id)}
            className={`${r._className} rect-${index} ${isSelected(r.id)}`}
            x={r._x}
            y={r._y}
            width={r._width}
            height={r._height}
            rx={r._rx}
            ry={r._ry}
          />
        ))}
      </svg>
      {mapSVG.rect.map((r, index) => (
        <Tooltip key={uuidv4()} anchorSelect={`.rect-${index}`} place="top">
          <span className="title">{r.deskName}</span>
          <span>
            {r.deskName}
            {r.deskName}
          </span>
          <span>
            {r.deskName}
            {r.deskName}
          </span>
        </Tooltip>
      ))}
    </div>
  );
};
export default DeskMap;
