import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import Task from "../Task/Task";
import { useSelector } from "react-redux";
import "./TaskList.scss";

const TaskList = () => {
  const { category: choosenCategoryTitle, subString: searchCriteria } = useParams();
  const { taskList } = useSelector((s) => s.task);
  const { categoryList } = useSelector((s) => s.category);
  const [currentTaskList, setCurrentTaskList] = useState(taskList);

  const chosenCategory = categoryList.find(
    (cat) => cat.categoryTitle === choosenCategoryTitle
  );

  useEffect(() => {
    if (searchCriteria) {
      setCurrentTaskList(
        taskList.filter((task) =>
          task.title.toLowerCase().includes(searchCriteria)
        )
      );
    } else {
      setCurrentTaskList(taskList);
    }
  }, [searchCriteria, taskList]);

  return (
    <div className="task-list">
      {currentTaskList
        .filter((task) => chosenCategory?.categoryId === task.categoryId)
        .map((task) => {
          return (
            <div className="task-table " key={task.taskId}>
              <FontAwesomeIcon
                icon={faCheckSquare}
                className={
                  task.status === "done" ? "check-mark" : "check-mark--hidden"
                }
              />
              <Task task={task} />
            </div>
          );
        })}
    </div>
  );
};

export default TaskList;
