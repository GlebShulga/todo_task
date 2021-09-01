import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import Task from '../Task/Task'
import EditTask from '../EditTask/EditTask'
import "./TaskList.scss";

const TaskList = ({
  choosenCategory,
  isEditingTaskMode,
  setEditingTaskMode,
  choosenTask,
  setChoosenTask,
  newCategoryIdForTask,
  taskList,
  fetchTaskList,
}) => {
  const patchTask = async (taskId, status, title, description, categoryId) => {
    await axios({
      method: "patch",
      url: "/api/v1/task",
      data: {
        taskId,
        status,
        title,
        description,
        categoryId,
      },
    });
  };

  return (
    <div className="TaskList">
      {isEditingTaskMode && (
        <EditTask
          setEditingTaskMode={setEditingTaskMode}
          task={choosenTask}
          patchTask={patchTask}
          fetchTaskList={fetchTaskList}
          newCategoryIdForTask={newCategoryIdForTask}
        />
      )}
      {!isEditingTaskMode &&
        taskList
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
