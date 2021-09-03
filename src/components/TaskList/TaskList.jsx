import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import Task from "../Task/Task";
import "./TaskList.scss";

const TaskList = ({
  choosenCategory,
  setEditingTaskMode,
  setChoosenTask,
  taskList,
  isFilterStatusDone,
  searchCriteria,
  isSearch,
}) => {

  const currentTaskList = taskList.filter(
    (task) =>
      (isFilterStatusDone && task.status === "done") ||
      (isSearch && task.title.toLowerCase().includes(searchCriteria)) ||
      (!isFilterStatusDone && !isSearch && task.status)
  );

  return (
    <div className="TaskList">
      {currentTaskList
        .filter((task) => choosenCategory.categoryId === task.categoryId)
        .map((task) => {
          return (
            <div className="TaskTable" key={task.taskId}>
              <FontAwesomeIcon
                icon={faCheckSquare}
                className={
                  task.status === "done" ? "checkMark" : "checkMark_hidden"
                }
              />
              <Task
                task={task}
                setEditingTaskMode={setEditingTaskMode}
                setChoosenTask={setChoosenTask}
              />
            </div>
          );
        })}
    </div>
  );
};

export default TaskList;
