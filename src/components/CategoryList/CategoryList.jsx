import React from "react";
import axios from "axios";
import Category from "../Category/Category";
import "./CategoryList.scss";

const CategoryList = ({
  choosenCategory,
  setChoosenCategory,
  categoryList,
  categoryTitleList,
  fetchCategoryList,
  rootCategories,
  isEditingTaskMode,
  choosenTask,
  setNewCategoryIdForTask,
}) => {
  const deleteCategory = async (categoryId) => {
    await axios({
      method: "delete",
      url: "/api/v1/category",
      data: {
        categoryId,
      },
    });
  };

  const patchCategory = async (categoryId, categoryTitle) => {
    await axios({
      method: "patch",
      url: "/api/v1/category",
      data: {
        categoryId,
        categoryTitle,
      },
    });
  };

  return (
    <ul className="CategoryList">
      {rootCategories.map((category) => {
        return (
          <li className="CategoryTable" key={category.categoryId}>
            <Category
              category={category}
              patchCategory={patchCategory}
              deleteCategory={deleteCategory}
              setChoosenCategory={setChoosenCategory}
              choosenCategory={choosenCategory}
              fetchCategoryList={fetchCategoryList}
              categoryTitleList={categoryTitleList}
              categoryList={categoryList}
              isEditingTaskMode={isEditingTaskMode}
              choosenTask={choosenTask}
              setNewCategoryIdForTask={setNewCategoryIdForTask}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryList;
