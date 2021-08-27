import React from "react";
import "../assets/scss/ProgressBar.scss";

const ProgressBar = ({ bgcolor, completed }) => {

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div className="container">
      <div style={{ width: `${completed}%` }} className="filler">
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
