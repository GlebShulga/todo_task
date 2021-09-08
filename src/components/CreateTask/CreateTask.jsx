import React, { useState } from "react";
import axios from "axios";
import "./CreateTask.scss";

const CreateTask = ({ choosenCategory, setTaskList }) => {
  const [title, setTitle] = useState("");
  const [lengthError, setLengthError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

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
    })
      .then((res) => {
        const data = res.data;
        setTaskList(data);
      })
      .catch((err) => console.log(err));
  };

  const categoryId = choosenCategory.categoryId;

  const onClickAddTask = async () => {
    if (categoryId) {
      if (title?.trim().length <= 20 && title?.trim().length >= 3) {
        setCategoryError(false);
        setLengthError(false);
        await postTask();
      } else {
        setLengthError(true);
        setCategoryError(false);
      }
    } else {
      setCategoryError(true);
    }
  };
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      onClickAddTask();
    }
  };

  return (
    <div className="create_task">
      <div className="create_task-form">
        <input
          className="create_task-form_input"
          type="text"
          value={title}
          onChange={onChange}
          placeholder="Add new task"
          onKeyPress={handleKeypress}
        />
        <button
          type="button"
          className="form_button_add"
          onClick={onClickAddTask}
        >
          Add
        </button>
      </div>
      {lengthError && (
        <div className="error">
          <div> The task length must not be shorter than 3 characters</div>
          <div>and</div>
          <div>must not exceed 20 characters.</div>
        </div>
      )}
      {categoryError && (
        <div className="error">
          <div>Please, choose category</div>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
