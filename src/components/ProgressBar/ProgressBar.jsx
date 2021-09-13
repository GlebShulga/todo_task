import React from "react";
import "./ProgressBar.scss";

const ProgressBar = ({ taskList, choosenCategory }) => {
  let isDone = 0;
  let count = 0;
  taskList
    .filter((item) => item.categoryId === choosenCategory.categoryId)
    .forEach((item) => {
      if (item.status === "done") {
        isDone += 1;
      }
      count += 1;
    });

  const result = count > 0 ? Math.round((isDone / count) * 100) : 100

  return (
    <progress value={result} max="100" className="progress-bar"></progress>
  );
};

export default ProgressBar;
