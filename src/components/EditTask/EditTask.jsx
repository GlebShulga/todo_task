import React, { useState } from "react";
import "./EditTask.scss";

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
  const [status, setStatus] = useState('new')
  const [lengthError, setLengthError] = useState(false);
  const taskId = task.taskId;
  // const status = task.status


  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    setLengthError(false);
  };

    const onChangeStatus = (e) => {
      e.target.value ? setStatus("done") : setStatus("new");
    };
    console.log(status, "status");

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
  const taskDescription =
    task.description === ""
      ? "Write description of your task"
      : task.description;

  return (
    <div className="EditTask">
      <div className="">
        <div className="EditTask-buttons">
          <button
            type="button"
            className="CreateTask-form_button"
            onClick={() => onClickEditTask(taskId, title, description, status)}
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
            // checked={true}
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
    </div>
  );
};

export default EditTask;
