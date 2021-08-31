import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import "../assets/scss/Task.scss";

const Task = ({ task, setEditingTaskMode, setChoosenTask }) => {
  const onClickEditTask = () => {
    setEditingTaskMode(true);
    setChoosenTask(task);
  };

  return (
    <div key={task.taskId} className="Task">
      {task.title}
      <button
        className="Task-Edit_icon"
        type="button"
        onClick={onClickEditTask}
      >
        <FontAwesomeIcon icon={faPen} />
      </button>
    </div>
  );
};

export default Task;
