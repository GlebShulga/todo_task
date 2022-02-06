import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../../redux/actions/category";
import "./CreateCategory.scss";
import { setIsCreateTaskModalOpen } from "../../redux/actions/category";

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

  const MAX_SYMBOLS_NUMBER = 20
  const MIN_SYMBOLS_NUMBER = 3

  const onClickAddCategory = () => {
    if (
      categoryTitle?.trim().length <= MAX_SYMBOLS_NUMBER &&
      categoryTitle?.trim().length >= MIN_SYMBOLS_NUMBER
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
      onClickAddCategory();
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
          data-testid="AddCategoryInputField"
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
          onClick={onClickAddCategory}
          data-testid="AddCategoryButton"
        >
          Add
        </button>
      </div>
      {lengthError && (
        <div className="error">
          <div> The category's name length </div>
          <div>must not be shorter than {MIN_SYMBOLS_NUMBER} characters</div>
          <div>and</div>
          <div>must not exceed {MAX_SYMBOLS_NUMBER} characters.</div>
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
