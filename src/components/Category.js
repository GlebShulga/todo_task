import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt, faPen, faSave, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

import "../assets/scss/Category.scss";

const Category = ({
  category,
  setChoosenCategory,
  choosenCategory,
  fetchCategoryList,
  patchCategory,
  deleteCategory,
  isCreateTaskModalOpen,
  setIsCreateTaskModalOpen,
}) => {
  const [isEditingMode, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(category.categoryTitle);

  const categoryId = category.categoryId;
  const choosenCategoryId = choosenCategory.categoryId;

  const onChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const edit = isEditingMode ? (
    <FontAwesomeIcon icon={faSave} />
  ) : (
    <FontAwesomeIcon icon={faPen} />
  );

  return (
    <div className="Category">
      <FontAwesomeIcon
        icon={faCheckSquare}
        className={
          categoryId === choosenCategoryId ? "checkMark" : "checkMark_hidden"
        }
      />
      {!isEditingMode && (
        <button
          className="Category-title"
          style={{ marginLeft: `${category.lvl}rem` }}
          onClick={() => {
            setChoosenCategory(category);
          }}
        >
          {category.categoryTitle}
        </button>
      )}
      {isEditingMode && (
        <input
          className="Edit_input"
          type="text"
          value={newTitle}
          onChange={onChangeTitle}
        />
      )}
      <button
        onClick={async () => {
          if (isEditingMode) {
            await patchCategory(categoryId, newTitle);
            await fetchCategoryList();
          }
          setEditing(!isEditingMode);
        }}
      >
        {edit}
      </button>
      <div className="Icon">
        <button
          type="button"
          onClick={async () => {
            await deleteCategory(categoryId);
            await fetchCategoryList();
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
        <button
          type="button"
          className="Plus_icon"
          onClick={() => {
            setChoosenCategory(category);
            setIsCreateTaskModalOpen(!isCreateTaskModalOpen);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default Category;
