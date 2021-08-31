import React from "react";
import "./ProgressBar.scss";

const ProgressBar = ({ completed }) => {

  return (
    <div className="container">
      <div style={{ width: `${completed}%` }} className="filler">
        <span className="label">{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
