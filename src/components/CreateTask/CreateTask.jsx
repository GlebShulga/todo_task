import React, { useState } from "react";
import axios from "axios";
import "./CreateTask.scss";

const CreateTask = ({
  choosenCategory,
  // setIsNewTaskCreated,
  // isNewTaskCreated,
  setTaskList,
}) => {
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
      if (title.length <= 20 && title.length >= 3) {
        await postTask();
        // setIsNewTaskCreated(!isNewTaskCreated);
      } else {
        setCategoryError(true);
        setLengthError(true);
      }
    } else {
      setCategoryError(false);
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
      {categoryError && (
        <div className="Error">
          <div>Please, choose category</div>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
