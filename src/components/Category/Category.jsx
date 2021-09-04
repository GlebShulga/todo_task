import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faEdit,
  faSave,
  faCheckSquare,
  faReply,
} from "@fortawesome/free-solid-svg-icons";
import CreateCategory from "../CreateCategory/CreateCategory";
import "./Category.scss";

const Category = ({
  category,
  setChoosenCategory,
  choosenCategory,
  patchCategory,
  deleteCategory,
  categoryTitleList,
  categoryList,
  isEditingTaskMode,
  choosenTask,
  setNewCategoryIdForTask,
  setCategoryList,
  setRootCategories,
}) => {
  const [isEditingCategoryMode, setIsEditingCategoryMode] = useState(false);
  const [newTitle, setNewTitle] = useState(category.categoryTitle);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const children = categoryList?.filter(
    (cat) => cat.parentCategoryId === category.categoryId
  );

  const categoryExpandedConditions = children.length > 0 && isExpanded;

  const categoryId = category.categoryId;
  const choosenCategoryId = choosenCategory.categoryId;

  const onChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const onClickEditCategoryTitle = async (categoryId, newTitle) => {
    if (isEditingCategoryMode) {
      await patchCategory(categoryId, newTitle);
    }
    setIsEditingCategoryMode(!isEditingCategoryMode);
  };

  const onClickChooseCategory = (category) => {
    setChoosenCategory(category);
  };

  const onClickDeleteCategory = async (categoryId) => {
    await deleteCategory(categoryId);
  };

  const onClickCreateTaskModalOpen = (category, isCreateTaskModalOpen) => {
    setChoosenCategory(category);
    setIsCreateTaskModalOpen(!isCreateTaskModalOpen);
  };

  const onClickChangeCategory = (categoryId) => {
    setNewCategoryIdForTask(categoryId);
  };

  const onClickExpandedTree = () => {
    setIsExpanded(!isExpanded);
  };

  const edit = isEditingCategoryMode ? (
    <FontAwesomeIcon icon={faSave} />
  ) : (
    <FontAwesomeIcon icon={faEdit} />
  );

  return (
    <>
      <div
        className="Category"
        style={{ marginLeft: `${category.lvl}rem` }}
        onClick={onClickExpandedTree}
      >
        <FontAwesomeIcon
          icon={faCheckSquare}
          className={
            categoryId === choosenCategoryId ? "checkMark" : "checkMark_hidden"
          }
        />
        {!isEditingCategoryMode ? (
          <button
            className="Category-title"
            onClick={() => onClickChooseCategory(category)}
          >
            {category.categoryTitle}
          </button>
        ) : (
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
          {!isEditingTaskMode ? (
            <>
              <button
                type="button"
                onClick={() => onClickDeleteCategory(categoryId)}
              >
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
            </>
          ) : (
            <button
              className={
                categoryId === choosenTask.categoryId
                  ? "checkMark_hidden"
                  : "ReplyIcon"
              }
              type="button"
              onClick={() => onClickChangeCategory(categoryId)}
            >
              <FontAwesomeIcon icon={faReply} />
            </button>
          )}
        </div>

        {isCreateTaskModalOpen && (
          <div className="CreateCategoryModal">
            <CreateCategory
              isCreateTaskModalOpen={isCreateTaskModalOpen}
              setIsCreateTaskModalOpen={setIsCreateTaskModalOpen}
              categoryTitleList={categoryTitleList}
              choosenCategory={choosenCategory}
              setCategoryList={setCategoryList}
              setRootCategories={setRootCategories}
            />
          </div>
        )}
      </div>
      {categoryExpandedConditions &&
        children.map((child) => (
          <div key={child.categoryId}>
            <Category
              category={child}
              patchCategory={patchCategory}
              deleteCategory={deleteCategory}
              setChoosenCategory={setChoosenCategory}
              choosenCategory={choosenCategory}
              categoryTitleList={categoryTitleList}
              categoryList={categoryList}
              isEditingTaskMode={isEditingTaskMode}
              choosenTask={choosenTask}
              setNewCategoryIdForTask={setNewCategoryIdForTask}
              setCategoryList={setCategoryList}
              setRootCategories={setRootCategories}
            />
          </div>
        ))}
    </>
  );
};

export default Category;
