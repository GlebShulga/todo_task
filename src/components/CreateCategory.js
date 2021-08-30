import React, { useState } from "react";
import axios from "axios";
import "../assets/scss/CreateCategory.scss";

const CreateCategory = ({
  choosenCategory,
  categoryTitleList,
  isCreateTaskModalOpen,
  setIsCreateTaskModalOpen,
  fetchCategoryList
}) => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [lengthError, setLengthError] = useState(false);
  const [categoryAlreadyExist, setCategoryAlreadyExist] = useState(false);

  const onChange = (e) => {
    setCategoryTitle(e.target.value);
    setLengthError(false);
    setCategoryAlreadyExist(false);
  };

  const postCategory = async () => {
    await axios({
      method: "post",
      url: "/api/v1/category",
      data: {
        categoryTitle,
        parentCategoryId,
        lvl,
      },
    });
  };

  const parentCategoryId = choosenCategory.categoryId ?? null;

  const lvl = choosenCategory?.lvl === undefined ? 0 : choosenCategory?.lvl + 1;

  const onClickAddTask = async () => {
    if (categoryTitle.length <= 20 && categoryTitle.length >= 3) {
      if (categoryTitleList.indexOf(categoryTitle) === -1) {
        await postCategory();
        await fetchCategoryList();
        if (isCreateTaskModalOpen) {
          setIsCreateTaskModalOpen(false);
        }
      } else {
        setCategoryAlreadyExist(true);
      }
    } else {
      setLengthError(true);
    }
  };
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      onClickAddTask();
    }
  };

  return (
    <div className="CreateCategory">
      <div className="CreateCategory-form">
        <input
          className="CreateCategory-form_input"
          type="text"
          value={categoryTitle}
          onChange={onChange}
          placeholder="Add new category"
          onKeyPress={handleKeypress}
        />
        {isCreateTaskModalOpen && (
          <button
            type="button"
            className="CreateCategory-form_button_close"
            onClick={() => {
              setIsCreateTaskModalOpen(false);
            }}
          >
            Close
          </button>
        )}
        <button
          type="button"
          className="CreateCategory-form_button_add"
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
      {categoryAlreadyExist && (
        <div className="Error">
          <div> Channel`s name already exist</div>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;
