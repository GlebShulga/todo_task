import React, { useEffect, useState } from "react";
import "./EditTask.scss";

const EditTask = ({
  task,
  patchTask,
  setEditingTaskMode,
  newCategoryIdForTask,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [lengthError, setLengthError] = useState(false);
  const taskId = task.taskId;
  const categoryId = newCategoryIdForTask;

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description)
    setStatus(task.status)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (title?.length <= 20 && title?.length >= 3) {
      await patchTask(taskId, status, title, description, categoryId);
      setEditingTaskMode(false);
    } else {
      setLengthError(true);
    }
  };

  const taskDescription =
    task.description === ""
      ? "Write description of your task"
      : task.description;

  return (
    <div className="EditTask">
      <div className="EditTask-buttons">
        <button
          type="button"
          className="CreateTask-form_button"
          onClick={onClickEditTask}
        >
          Save changes
        </button>
        <button
          type="button"
          className="EditTask-buttons__close"
          onClick={() => {
            setEditingTaskMode(false);
          }}
        >
          Cancel
        </button>
      </div>
      <div className="EditTask-title">
        <input
          className="EditTask-title__input"
          type="text"
          value={title ?? null}
          onChange={onChangeTitle}
        />
        {lengthError && (
          <div className="EditTask-Error">
            The task length must not be shorter than 3 characters and must not
            exceed 20 characters.
          </div>
        )}
      </div>
      <div className="EditTask-status">
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
        className="EditTask-description__input"
        type="text"
        value={description ?? null}
        onChange={onChangeDescription}
        placeholder={taskDescription}
      />
    </div>
  );
};

export default EditTask;
