import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../redux/actions/task";
import "./CreateTask.scss";

const CreateTask = () => {
  const dispatch = useDispatch();
  const { chosenCategory } = useSelector((s) => s.category);
  const [title, setTitle] = useState("");
  const [lengthError, setLengthError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const onChange = (e) => {
    setTitle(e.target.value);
    setLengthError(false);
  };

  const categoryId = chosenCategory?.categoryId;
  const MAX_SYMBOLS_NUMBER = 20;
  const MIN_SYMBOLS_NUMBER = 3;

  const onClickAddTask = async () => {
    if (categoryId) {
      if (
        title?.trim().length <= MAX_SYMBOLS_NUMBER &&
        title?.trim().length >= MIN_SYMBOLS_NUMBER
      ) {
        setCategoryError(false);
        setLengthError(false);
        dispatch(addTask(title, categoryId));
        setTitle("");
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
          data-testid="AddTaskInputField"
        />
        <button
          type="button"
          className="form_button_add"
          onClick={onClickAddTask}
          data-testid="AddTaskButton"
        >
          Add
        </button>
      </div>
      {lengthError && (
        <div className="error">
          <div>
            The task length must not be shorter than {MIN_SYMBOLS_NUMBER}
            characters
          </div>
          <div>and</div>
          <div>must not exceed {MAX_SYMBOLS_NUMBER} characters.</div>
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
