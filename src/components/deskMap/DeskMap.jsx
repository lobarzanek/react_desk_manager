import { useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
import "./deskMap.scss";
import LoadingIcon from "../loadingIcon/LoadingIcon";

const DeskMap = ({ deskId, onChange, mapSVG, isLoading }) => {
  const handleDeskChange = (id, status) => {
    if (status === "Free" && id !== deskId) {
      onChange("desk", id);
    }
  };

  const isSelected = (id) => {
    if (id == deskId) {
      return "selected";
    }
  };

  useEffect(() => {}, [deskId, mapSVG]);
  useEffect(() => {}, [isLoading]);

  return (
    <div className="map">
      {isLoading ? (
        <div className="loadingWrapper">
          <LoadingIcon />
        </div>
      ) : (
        <>
          <svg
            viewBox={mapSVG.mapViewBox}
            width={mapSVG.mapWidth}
            height={mapSVG.mapHeight}
            xmlns={mapSVG.mapXmlns}
          >
            {mapSVG.desks.map((r, index) => (
              <rect
                key={uuidv4()}
                onClick={() => handleDeskChange(r.id, r.status)}
                className={`${r.status} rect-${index} ${isSelected(r.id)}`}
                x={r.mapXLocation}
                y={r.mapYLocation}
                width={r.width}
                height={r.height}
                rx={r._rx}
                ry={r._ry}
              />
            ))}
          </svg>
          {mapSVG.desks.map((r, index) => (
            <Tooltip key={uuidv4()} anchorSelect={`.rect-${index}`} place="top">
              <span className="title">{r.name}</span>
              <div className="wrapper">
                <div className="wrapper-left">
                  <span>Myszka:</span>
                  <span>Klawiatura:</span>
                  <span>Stacja dokująca:</span>
                  <span>Monitory:</span>
                </div>
                <div className="wrapper-right">
                  <span>{r.mouse ? "tak" : "nie"}</span>
                  <span>{r.keyboard ? "tak" : "nie"}</span>
                  <span>{r.dockStation ? "tak" : "nie"}</span>
                  <span>{r.monitorNumber}</span>
                </div>
              </div>
            </Tooltip>
          ))}
        </>
      )}
    </div>
  );
};
export default DeskMap;
