import React from "react";
import "./ProgressBar.scss";

const ProgressBar = ({ taskList, choosenCategory }) => {
  const commonTaskData = Object.values(
    taskList.reduce((r, e) => {
      let categoryId = `${e.categoryId}`;
      let status = `${e.status}`;

      if (!r[categoryId]) {
        if (status === "done") {
          r[categoryId] = {
            categoryId: e.categoryId,
            sumOfDoneTasks: 1,
            sumOfTasks: 1,
          };
        } else {
          r[categoryId] = { categoryId: e.categoryId, sumOfTasks: 1 };
        }
      } else {
        r[categoryId].sumOfTasks = (r[categoryId].sumOfTasks ?? 0) + 1;
        if (status === "done") {
          r[categoryId].sumOfDoneTasks =
            (r[categoryId].sumOfDoneTasks ?? 0) + 1;
        }
      }
      return r;
    }, {})
  );

  const resultList = commonTaskData.reduce((acc, rec) => {
    if (rec.sumOfDoneTasks) {
      const completed = Math.round((rec.sumOfDoneTasks / rec.sumOfTasks) * 100);
      return [...acc, { ...rec, completed }];
    }
    return acc;
  }, []);

  const choosenCategoryResult = resultList?.reduce((acc, rec) => {
    const categoriesWithTasks = commonTaskData.map((task) => task.categoryId);
    if (
      rec.categoryId === choosenCategory.categoryId ||
      categoriesWithTasks.includes(choosenCategory.categoryId) === false
    ) {
      return rec.completed;
    }
    return acc;
  }, 0);

  return (
    <progress
      value={choosenCategoryResult}
      max="100"
      className="progress-bar"
    ></progress>
  );
};

export default ProgressBar;
