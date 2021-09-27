import React from "react";
import { useSelector } from "react-redux";
import "./ProgressBar.scss";

const ProgressBar = () => {
  const { taskList } = useSelector((s) => s.task);
  const { chosenCategory } = useSelector((s) => s.category);

  let isDone = 0;
  let count = 0;
  taskList
    ?.filter((item) => item.categoryId === chosenCategory?.categoryId)
    .forEach((item) => {
      if (item.status === "done") {
        isDone += 1;
      }
      count += 1;
    });

  const result = count > 0 ? Math.round((isDone / count) * 100) : 100;

  return (
    <progress
      value={result}
      max="100"
      className="progress-bar"
      data-testid="ProgressBar"
    ></progress>
  );
};

export default ProgressBar;
