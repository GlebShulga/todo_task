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
          r[categoryId] = {
            categoryId: e.categoryId,
            sumOfTasks: 1,
            sumOfDoneTasks: 0,
          };
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

  const categoriesWithTasks = commonTaskData.map((task) => task.categoryId);
  const choosenCategoryWOTasks = (categoriesWithTasks.includes(choosenCategory.categoryId) === false &&
    choosenCategory.categoryId) ? true : false

  const resultList = commonTaskData.reduce((acc, rec) => {
      const completed = Math.round((rec.sumOfDoneTasks / rec.sumOfTasks) * 100);
      return [...acc, { ...rec, completed }];
  }, []);

  const choosenCategoryResult = resultList?.reduce((acc, rec) => {
    if (rec.categoryId === choosenCategory.categoryId) {
      return rec.completed;
    }
    return acc;
  }, 0);

  const result = choosenCategoryWOTasks ? 100 : choosenCategoryResult;

  return (
    <progress value={result} max="100" className="progress-bar"></progress>
  );
};

export default ProgressBar;
