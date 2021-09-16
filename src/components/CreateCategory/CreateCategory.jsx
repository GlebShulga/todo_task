import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../../redux/reducers/category";
import "./CreateCategory.scss";
import { setIsCreateTaskModalOpen } from "../../redux/reducers/category";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const { chosenCategory, categoryTitleList, isCreateTaskModalOpen } =
    useSelector((s) => s.category);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [lengthError, setLengthError] = useState(false);
  const [categoryAlreadyExist, setCategoryAlreadyExist] = useState(false);

  const onChange = (e) => {
    setCategoryTitle(e.target.value);
    setLengthError(false);
    setCategoryAlreadyExist(false);
  };

  const parentCategoryId = chosenCategory?.categoryId ?? null;

  const lvl = chosenCategory?.lvl === undefined ? 0 : chosenCategory?.lvl + 1;

  const onClickAddTask = () => {
    if (
      categoryTitle?.trim().length <= 20 &&
      categoryTitle?.trim().length >= 3
    ) {
      if (categoryTitleList.indexOf(categoryTitle) === -1) {
        dispatch(addCategory(categoryTitle, parentCategoryId, lvl));
        setCategoryTitle("");
        if (isCreateTaskModalOpen) {
          dispatch(setIsCreateTaskModalOpen(false));
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
    <div className="create_category">
      <div className="create_category-form">
        <input
          className="create_category-form_input"
          type="text"
          value={categoryTitle}
          onChange={onChange}
          placeholder="Add new category"
          onKeyPress={handleKeypress}
        />
        {isCreateTaskModalOpen && (
          <button
            type="button"
            className="create_category-form_button_close"
            onClick={() => {
              dispatch(setIsCreateTaskModalOpen(false));
            }}
          >
            Close
          </button>
        )}
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
      {categoryAlreadyExist && (
        <div className="error">
          <div> Channel`s name already exist</div>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;
