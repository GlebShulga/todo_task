import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { matchPath } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faEdit,
  faSave,
  faCheckSquare,
  faReply,
} from "@fortawesome/free-solid-svg-icons";
import {
  delCategory,
  renameCategory,
  updateChosenCategory,
  setIsCreateTaskModalOpen,
} from "../../redux/actions/category";
import CreateCategory from "../CreateCategory/CreateCategory";
import { setNewCategoryIdForTask } from "../../redux/actions/task";
import "./Category.scss";

const Category = ({ category, categoryListWithDoneFlag }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const {
    categoryList,
    chosenCategory,
    isFilterStatusDone,
    isCreateTaskModalOpen,
  } = useSelector((s) => s.category);
  const { isEditingTaskMode, chosenTask } = useSelector((s) => s.task);
  const categoryId = category.categoryId;
  const categoryTitle = category.categoryTitle;

  const categoryParams = matchPath(pathname, { path: "/:category" });
  const urlCategoryTitle = categoryParams?.params.category;

  const [isEditingCategoryMode, setIsEditingCategoryMode] =
    React.useState(false);
  const [newTitle, setNewTitle] = useState(category.categoryTitle);
  const [isExpanded, setIsExpanded] = useState(category?.isExpanded ?? false);

  useEffect(() => {
    if (isFilterStatusDone) {
      const isCurrentCategoryDone = categoryListWithDoneFlag?.find(
        (cat) => cat.categoryId === chosenCategory.categoryId
      )?.isAllTasksDone;
      if (isFilterStatusDone && !isCurrentCategoryDone) {
        dispatch(updateChosenCategory({}));
      }
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

  const onChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const onClickEditCategoryTitle = (categoryId, newTitle) => {
    if (isEditingCategoryMode) {
      dispatch(renameCategory(categoryId, newTitle));
    }
    setIsEditingCategoryMode(!isEditingCategoryMode);
  };

  const onClickDeleteCategory = (categoryId) => {
    dispatch(delCategory(categoryId));
  };

  const onClickCreateTaskModalOpen = (category, isCreateTaskModalOpen) => {
    dispatch(updateChosenCategory(category));
    dispatch(setIsCreateTaskModalOpen(!isCreateTaskModalOpen));
  };

  const onClickChangeCategory = (categoryId) => {
    dispatch(setNewCategoryIdForTask(categoryId));
  };

  const onClickExpandedTree = () => {
    setIsExpanded(!isExpanded);
  };

  const onClickChooseCategory = (category) => {
    dispatch(updateChosenCategory(category));
    history.push(`/${category.categoryTitle}`);
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
            categoryTitle === urlCategoryTitle
              ? "check-mark"
              : "check-mark--hidden"
          }
          data-testid="faCheckSquare"
        />
        {!isEditingCategoryMode ? (
          <button
            className={
              categoryTitle === urlCategoryTitle
                ? "category-title category-title--green"
                : "category-title"
            }
            onClick={() => onClickChooseCategory(category)}
            data-testid="ChooseCategoryButton"
          >
            {category.categoryTitle}
          </button>
        ) : (
          <input
            className="category-edit_input"
            type="text"
            value={newTitle}
            onChange={onChangeTitle}
            data-testid="NewTitleInput"
          />
        )}
        <button
          onClick={() => onClickEditCategoryTitle(categoryId, newTitle)}
          data-testid="RenameCategoryButton"
        >
          {edit}
        </button>

        <div className="icon">
          {!isEditingTaskMode && (
            <>
              <button
                type="button"
                onClick={() => onClickDeleteCategory(categoryId)}
                data-testid="DelCategoryButton"
              >
                <FontAwesomeIcon icon={faTrashAlt} data-testid="faTrashAlt" />
              </button>
              <button
                type="button"
                className="plus-icon"
                onClick={() =>
                  onClickCreateTaskModalOpen(category, isCreateTaskModalOpen)
                }
                data-testid="CreateTaskModalButton"
              >
                <FontAwesomeIcon icon={faPlus} data-testid="faPlus" />
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
              onClick={() => onClickChangeCategory(categoryId)}
              data-testid="ChangeCategoryForTaskButton"
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
