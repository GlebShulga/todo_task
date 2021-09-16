import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { patchTask, setEditingTaskMode } from "../../redux/reducers/task";
import "./EditTask.scss";

const EditTask = () => {
  const dispatch = useDispatch();
  const { newCategoryIdForTask, chosenTask } = useSelector((s) => s.task);

  const [title, setTitle] = useState(chosenTask.title);
  const [description, setDescription] = useState(chosenTask.description);
  const [status, setStatus] = useState(chosenTask.status);
  const [lengthError, setLengthError] = useState(false);
  const taskId = chosenTask.taskId;
  const categoryId = newCategoryIdForTask;

  const isChecked = status === "done";

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    setLengthError(false);
  };

  const onChangeStatus = (e) => {
    e.target.checked ? setStatus("done") : setStatus("new");
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onClickEditTask = async () => {
    if (title?.trim().length <= 20 && title?.trim().length >= 3) {
      dispatch(patchTask(taskId, status, title, description, categoryId));
      dispatch(setEditingTaskMode(false));
    } else {
      setLengthError(true);
    }
  };

  const taskDescription =
    chosenTask.description === "" || chosenTask.description === undefined
      ? "Write description of your task"
      : chosenTask.description;

  return (
    <div className="edit_task">
      <div className="edit_task-buttons">
        <button
          type="button"
          className="form_button_add"
          onClick={onClickEditTask}
        >
          Save changes
        </button>
        <button
          type="button"
          className="edit_task-buttons__close"
          onClick={() => {
            dispatch(setEditingTaskMode(false));
          }}
        >
          Cancel
        </button>
      </div>
      <div className="edit_task-title">
        <input
          className="edit_task-title__input"
          type="text"
          value={title ?? null}
          onChange={onChangeTitle}
        />
        {lengthError && (
          <div className="edit_task-error">
            The task length must not be shorter than 3 characters and must not
            exceed 20 characters.
          </div>
        )}
      </div>
      <div className="status">
        <input
          type="checkbox"
          id="status"
          name="status"
          checked={isChecked}
          value={true}
          onChange={onChangeStatus}
        />
        <label htmlFor="status">Done</label>
      </div>
      <textarea
        className="edit_task-description__input"
        type="text"
        value={description ?? null}
        onChange={onChangeDescription}
        placeholder={taskDescription}
      />
    </div>
  );
};

export default EditTask;
