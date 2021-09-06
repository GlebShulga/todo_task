import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./Task.scss";

const Task = ({ task, setEditingTaskMode, setChoosenTask }) => {
  const onClickEditTask = () => {
    setEditingTaskMode(true);
    setChoosenTask(task);
  };

  return (
    <div key={task.taskId} className="task">
      {task.title}
      <button
        className="task-edit_icon"
        type="button"
        onClick={onClickEditTask}
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
    </div>
  );
};

export default Task;
