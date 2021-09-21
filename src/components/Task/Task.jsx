import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./Task.scss";
import { updateChosenTask, setEditingTaskMode } from "../../redux/actions/task";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { category: choosenCategoryTitle } = useParams();
  const title = task.title;

  const onClickEditTask = () => {
    dispatch(setEditingTaskMode(true));
    dispatch(updateChosenTask(task));
    history.push(`/${choosenCategoryTitle}/${title}/edit`);
  };

  return (
    <div key={task.taskId} className="task">
      {title}
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
