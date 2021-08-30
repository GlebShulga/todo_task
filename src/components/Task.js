import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,

} from "@fortawesome/free-solid-svg-icons";
import "../assets/scss/Task.scss";

const Task = ({ task, setEditingTaskMode, setChoosenTask }) => {
  return (
    <div key={task.taskId} className="Task">
      {task.title}
      <button
        className="Task-Edit_icon"
        type="button"
        onClick={() => {
          setEditingTaskMode(true);
          setChoosenTask(task);
        }}
      >
        <FontAwesomeIcon icon={faPen} />
      </button>
    </div>
  );
};

export default Task;
