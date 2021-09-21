import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Category from "../Category/Category";
import "./CategoryList.scss";
import { catListWithDoneFlag } from "./helpers";

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
      <li className="category-table" key={category.categoryId}>
        <Category
          category={category}
          categoryListWithDoneFlag={categoryListWithDoneFlag}
        />
      </li>
    );
  });

  return (
    <>
      {isEditingTaskMode && (
        <div className="task-title">To-Do {chosenTaskTitle}</div>
      )}
      <ul className="category-list scroll">{rootCategoryItem}</ul>
    </>
  );
};

export default CategoryList;
