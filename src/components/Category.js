import React, { useState } from "react";
import editIcon from "../assets/images/editIcon.svg";
import saveIcon from "../assets/images/saveIcon.svg";

import "../assets/scss/Category.scss";

const Category = ({
  category,
  setChoosenCategory,
  fetchCategoryList,
  patchCategory,
}) => {
  const [isEditingMode, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(category.categoryTitle);

  const categoryId = category.categoryId;

  const onChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const edit = isEditingMode ? (
    <img src={saveIcon} className="" alt="save icon" />
  ) : (
    <img src={editIcon} className="" alt="edit icon" />
  );

  return (
    <div className="Category">
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
    </div>
  );
};

export default Category;
