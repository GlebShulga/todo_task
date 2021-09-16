import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./Task.scss";
import { useDispatch } from "react-redux";
import {
  updateChosenTask,
  setEditingTaskMode,
} from "../../redux/reducers/task";

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const onClickEditTask = () => {
    dispatch(setEditingTaskMode(true));
    dispatch(updateChosenTask(task));
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
