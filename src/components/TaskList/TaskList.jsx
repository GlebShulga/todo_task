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
  searchResultsList,
  isSearch,
}) => {
  const doneTasksList = taskList.filter((task) => task.status === "done");

  const list = isFilterStatusDone ? doneTasksList : taskList;
  const currentTaskList = isSearch ? searchResultsList : list

  console.log(searchResultsList, "searchResultsList");

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
