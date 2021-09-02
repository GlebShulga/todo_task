import React, { useState } from "react";
import "./EditTask.scss";

const EditTask = ({
  task,
  patchTask,
  fetchTaskList,
  setEditingTaskMode,
  newCategoryIdForTask,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [lengthError, setLengthError] = useState(false);
  const taskId = task.taskId;
  const categoryId = newCategoryIdForTask;

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
      await fetchTaskList();
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
          className="EditTask-buttons_close"
          onClick={() => {
            setEditingTaskMode(false);
          }}
        >
          Cancel
        </button>
      </div>
      <div className="EditTask-title">
        <input
          className="EditTask-title_input"
          type="text"
          value={title}
          onChange={onChangeTitle}
          placeholder={task.title}
          defaultValue={task.title ?? ''}
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
          checked={status === "done"}
          value={true}
          onChange={onChangeStatus}
        />
        <label htmlFor="status">Done</label>
      </div>
      <textarea
        className="EditTask-description_input"
        type="text"
        value={description}
        onChange={onChangeDescription}
        placeholder={taskDescription}
      />
    </div>
  );
};

export default EditTask;
