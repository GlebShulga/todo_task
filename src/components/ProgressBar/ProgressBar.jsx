import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ProgressBar.scss";

const ProgressBar = () => {
  const { taskList } = useSelector((s) => s.task);
  const { chosenCategory } = useSelector((s) => s.category);
  const [isDone, setIsDone] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let insideUseEffectDone = isDone;
    let insideUseEffectCount = count;
    if (taskList.length > 0 && chosenCategory.categoryTitle?.length > 0) {
      taskList
        ?.filter((item) => item.categoryId === chosenCategory?.categoryId)
        .forEach((item) => {
          if (item.status === "done") {
            insideUseEffectDone += 1;
            setIsDone(insideUseEffectDone);
          }
          insideUseEffectCount += 1;
          setCount(insideUseEffectCount);
        });
    }
  }, [taskList, chosenCategory]);

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
