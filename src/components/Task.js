import React from "react";
import editIcon from "../assets/images/editIcon.svg";
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
          setChoosenTask(task)
        }}
      >
        <img src={editIcon} alt="edit icon" />
      </button>
    </div>
  );
};

export default Task;
