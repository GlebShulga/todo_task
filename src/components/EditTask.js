import React, { useState } from "react";
import "../assets/scss/EditTask.scss";

const EditTask = ({
  task,
  patchTask,
  fetchTaskList,
  setIsNewTaskCreated,
  isNewTaskCreated,
  setEditingTaskMode,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lengthError, setLengthError] = useState(false);
  const taskId = task.taskId;
  const status = task.status

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    setLengthError(false);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onClickEditTask = async (taskId, title, description, status) => {
    if (title?.length <= 20 && title?.length >= 3) {
      await patchTask(taskId, status, title, description);
      await fetchTaskList();
      setEditingTaskMode(false);
    } else {
      setLengthError(true);
    }
  };

  return (
    <div className="EditTask">
      <div className="">
        <div className="EditTask-buttons">
          <button
            type="button"
            className="CreateTask-form_button"
            onClick={() =>
              (onClickEditTask(taskId, title, description, status))
            }
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
            Close
          </button>
        </div>
        <div className="EditTask-title">
          <input
            className="EditTask-title_input"
            type="text"
            value={title}
            onChange={onChangeTitle}
            placeholder={task.title}
          />
          {lengthError && (
            <div className="EditTask-Error">
              The task length must not be shorter than 3 characters and must not
              exceed 20 characters.
            </div>
          )}
        </div>
        <div>
          <input
            type="checkbox"
            id="status"
            name="status"
            className=""
            // checked={data.status === done ?? false}
            // value={data.read_only ?? false}
            // onChange={""}
          />
          <label for="status">Done</label>
        </div>
        <input
          className="EditTask-description_input"
          type="text"
          value={description}
          onChange={onChangeDescription}
          placeholder={
            task.description === ""
              ? "Write description of your task"
              : task.description
          }
        />
      </div>
    </div>
  );
};

export default EditTask;
