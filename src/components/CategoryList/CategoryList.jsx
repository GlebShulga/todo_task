import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Category from "../Category/Category";
import { catListWithDoneFlag } from "./helpers";
import "./CategoryList.scss";

const CategoryList = () => {
  const { categoryList, rootCategoryList, isFilterStatusDone } = useSelector(
    (s) => s.category
  );
  const { isEditingTaskMode, chosenTask, taskList } = useSelector(
    (s) => s.task
  );

  const categoryListWithDoneFlag = useMemo(
    () => catListWithDoneFlag(taskList, categoryList),
    [taskList, categoryList]
  );

  const rootlist = isFilterStatusDone
    ? categoryListWithDoneFlag.filter(
        (el) => el.parentCategoryId === null && el.isAllTasksDone
      )
    : rootCategoryList;

  const chosenTaskTitle = chosenTask.title;

  const rootCategoryItem = rootlist?.map((category) => {
    return (
      <li key={category.categoryId} className="category-table">
        <Category
          category={category}
          categoryListWithDoneFlag={categoryListWithDoneFlag}
        />
      </li>
    );
  });

  return (
    <div className="category-list_editing-mode">
      {isEditingTaskMode && (
        <div className="task-title">To-Do {chosenTaskTitle}</div>
      )}
      <ul className="category-list category-list_width scroll">
        {rootCategoryItem}
      </ul>
    </div>
  );
};

export default CategoryList;
