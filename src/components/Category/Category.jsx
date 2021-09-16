import React, { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import {
  delCategory,
  renameCategory,
  updateChosenCategory,
  setIsEditingCategoryMode,
  setIsCreateTaskModalOpen,
} from "../../redux/reducers/category";
import { setNewCategoryIdForTask } from "../../redux/reducers/task";

const Category = ({ category, categoryListWithDoneFlag }) => {
  const dispatch = useDispatch();
  const {
    categoryList,
    chosenCategory,
    isFilterStatusDone,
    isEditingCategoryMode,
    isCreateTaskModalOpen,
  } = useSelector((s) => s.category);
  const { isEditingTaskMode, chosenTask } = useSelector((s) => s.task);

  const [newTitle, setNewTitle] = useState(category.categoryTitle);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const isCurrentCategoryDone = categoryListWithDoneFlag?.find(
      (cat) => cat.categoryId === chosenCategory.categoryId
    )?.isAllTasksDone;
    if (isFilterStatusDone && !isCurrentCategoryDone) {
      dispatch(updateChosenCategory({}));
    }
  }, [isFilterStatusDone]);

  const children = isFilterStatusDone
    ? categoryListWithDoneFlag.filter(
        (cat) =>
          cat.parentCategoryId === category.categoryId && cat.isAllTasksDone
      )
    : categoryList?.filter(
        (cat) => cat.parentCategoryId === category.categoryId
      );

  const categoryExpandedConditions = children?.length > 0 && isExpanded;
  const categoryId = category.categoryId;
  const categoryTitle = category.categoryTitle;

  const onChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const onClickEditCategoryTitle = (categoryId, newTitle) => {
    if (isEditingCategoryMode) {
      dispatch(renameCategory(categoryId, newTitle));
    }
    dispatch(setIsEditingCategoryMode(!isEditingCategoryMode));
  };

  const onClickChooseCategory = (category) => {
    dispatch(updateChosenCategory(category));
  };

  const onClickDeleteCategory = (categoryId) => {
    dispatch(delCategory(categoryId));
  };

  const onClickCreateTaskModalOpen = (category, isCreateTaskModalOpen) => {
    dispatch(updateChosenCategory(category));
    dispatch(setIsCreateTaskModalOpen(!isCreateTaskModalOpen));
  };

  const onClickEditCategory = (categoryId) => {
    dispatch(setNewCategoryIdForTask(categoryId));
  };

  const onClickExpandedTree = () => {
    setIsExpanded(!isExpanded);
  };

  const edit = isEditingCategoryMode ? (
    <FontAwesomeIcon icon={faSave} />
  ) : (
    <FontAwesomeIcon icon={faEdit} />
  );

  const childrenCategoryItem =
    categoryExpandedConditions &&
    children.map((child) => (
      <li key={child.categoryId}>
        <Category
          category={child}
          categoryListWithDoneFlag={categoryListWithDoneFlag}
        />
      </li>
    ));

  return (
    <>
      <div
        className="category"
        style={{ marginLeft: `${category.lvl}rem` }}
        onClick={onClickExpandedTree}
      >
        <FontAwesomeIcon
          icon={faCheckSquare}
          className={
            categoryTitle === chosenCategory.categoryTitle
              ? "check-mark"
              : "check-mark--hidden"
          }
        />
        {!isEditingCategoryMode ? (
          <button
            className={
              categoryTitle === chosenCategory.categoryTitle
                ? "category-title category-title--green"
                : "category-title"
            }
            onClick={() => onClickChooseCategory(category)}
          >
            {category.categoryTitle}
          </button>
        ) : (
          <input
            className="category-edit_input"
            type="text"
            value={newTitle}
            onChange={onChangeTitle}
          />
        )}
        <button onClick={() => onClickEditCategoryTitle(categoryId, newTitle)}>
          {edit}
        </button>

        <div className="icon">
          {!isEditingTaskMode && (
            <>
              <button
                type="button"
                onClick={() => onClickDeleteCategory(categoryId)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button
                type="button"
                className="plus-icon"
                onClick={() =>
                  onClickCreateTaskModalOpen(category, isCreateTaskModalOpen)
                }
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </>
          )}
          {isEditingTaskMode && (
            <button
              className={
                categoryId === chosenTask.categoryId
                  ? "check-mark--hidden"
                  : "reply-icon"
              }
              type="button"
              onClick={() => onClickEditCategory(categoryId)}
            >
              <FontAwesomeIcon icon={faReply} />
            </button>
          )}
        </div>

        {isCreateTaskModalOpen && (
          <div className="create-category-modal">
            <CreateCategory />
          </div>
        )}
      </div>
      <ul className="category-list">{childrenCategoryItem}</ul>
    </>
  );
};

export default Category;
