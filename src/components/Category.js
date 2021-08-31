import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faPen,
  faSave,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import CreateCategory from "./CreateCategory";
import "../assets/scss/Category.scss";

const Category = ({
  category,
  setChoosenCategory,
  choosenCategory,
  fetchCategoryList,
  patchCategory,
  deleteCategory,
  categoryTitleList,
}) => {
  const [isEditingMode, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(category.categoryTitle);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  const categoryId = category.categoryId;
  const choosenCategoryId = choosenCategory.categoryId;

  const onChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const onClickEditCategoryTitle = async (categoryId, newTitle) => {
    if (isEditingMode) {
      await patchCategory(categoryId, newTitle);
      await fetchCategoryList();
    }
    setEditing(!isEditingMode);
  };

  const onClickChooseCategory = (category) => {
    setChoosenCategory(category);
  };

  const onClickDeleteCategory = async (categoryId) => {
    await deleteCategory(categoryId);
    await fetchCategoryList();
  };

  const onClickCreateTaskModalOpen = (category, isCreateTaskModalOpen) => {
    setChoosenCategory(category);
    setIsCreateTaskModalOpen(!isCreateTaskModalOpen);
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
          onClick={() => onClickChooseCategory(category)}
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
      <button onClick={() => onClickEditCategoryTitle(categoryId, newTitle)}>
        {edit}
      </button>
      <div className="Icon">
        <button type="button" onClick={() => onClickDeleteCategory(categoryId)}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
        <button
          type="button"
          className="Plus_icon"
          onClick={() =>
            onClickCreateTaskModalOpen(category, isCreateTaskModalOpen)
          }
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {isCreateTaskModalOpen && (
        <div className="CreateCategoryModal">
          <CreateCategory
            isCreateTaskModalOpen={isCreateTaskModalOpen}
            setIsCreateTaskModalOpen={setIsCreateTaskModalOpen}
            categoryTitleList={categoryTitleList}
            choosenCategory={choosenCategory}
            fetchCategoryList={fetchCategoryList}
          />
        </div>
      )}
    </div>
  );
};

export default Category;
