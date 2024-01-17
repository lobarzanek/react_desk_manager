import { useEffect } from "react";
import "./loadingIcon.scss";
import errorImg from "../../assets/images/cross.png";

const LoadingIcon = ({ error }) => {
  {
    useEffect(() => {}, [error]);
    return (
      <div className="loadingIcon ">
        {error ? (
          <>
            <img src={errorImg} className="errorImg" />
            <span>Coś poszło nie tak podczas ładowania..</span>
          </>
        ) : (
          <div className="circle-out rotateAnimation">
            <div className="circle-in"></div>
          </div>
        )}
      </div>
    );
  }
};

export default LoadingIcon;
