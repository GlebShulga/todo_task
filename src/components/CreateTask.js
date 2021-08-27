import React, { useState } from "react";
import axios from "axios";
import "../assets/scss/CreateTask.scss";

const CreateTask = ({ choosenCategory, setIsNewTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [lengthError, setLengthError] = useState(false);
  const [noCategoryError, setNoCategoryError] = useState(false)

  const onChange = (e) => {
    setTitle(e.target.value);
    setLengthError(false);
  };

    const postTask = async () => {
      await axios({
        method: "post",
        url: "/api/v1/task",
        data: {
          title,
          categoryId,
        },
      });
    };

  const categoryId = choosenCategory.categoryId

  const onClickAddTask = async () => {
    if (categoryId) {
      if (title.length <= 20 && title.length >= 3) {
        await postTask()
        setIsNewTaskCreated(true);
      } else {
        setNoCategoryError(false);
        setLengthError(true);
      }
    } else {
      setNoCategoryError(true)
    }

  };
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      onClickAddTask();
    }
  };

  return (
    <div className="CreateTask">
      <div className="CreateTask-form">
        <input
          className="CreateTask-form_input"
          type="text"
          value={title}
          onChange={onChange}
          placeholder="Add new task"
          onKeyPress={handleKeypress}
        />
          <button
            type="button"
            className="CreateTask-form_button"
            onClick={onClickAddTask}
          >
            Add
          </button>
      </div>
      {lengthError && (
        <div className="Error">
          <div> The task length must not be shorter than 3 characters</div>
          <div>and</div>
          <div>must not exceed 20 characters.</div>
        </div>
      )}
      {noCategoryError && (
        <div className="Error">
          <div>Please, choose category</div>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
