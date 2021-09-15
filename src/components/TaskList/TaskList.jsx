import React, { useState, useEffect } from "react";
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
  const [currentTaskList, setCurrentTaskList] = useState(taskList);

  useEffect(() => {
    if (isFilterStatusDone && isSearch) {
      setCurrentTaskList(
        taskList.filter(
          (task) =>
            task.status === "done" &&
            task.title.toLowerCase().includes(searchCriteria)
        )
      );
    } else if (isFilterStatusDone) {
      setCurrentTaskList(
        taskList.filter((task) => task.status === "done")
      );
      } else if (isSearch) {
              setCurrentTaskList(
                taskList.filter(
                  (task) =>
                    task.title.toLowerCase().includes(searchCriteria)
                )
              );
      } else {
        setCurrentTaskList(taskList)
      }
  }, [isFilterStatusDone, isSearch, searchCriteria, taskList]);


  return (
    <div className="task-list">
      {currentTaskList
        .filter((task) => choosenCategory?.categoryId === task.categoryId)
        .map((task) => {
          return (
            <div className="task-table " key={task.taskId}>
              <FontAwesomeIcon
                icon={faCheckSquare}
                className={
                  task.status === "done" ? "check-mark" : "check-mark--hidden"
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
