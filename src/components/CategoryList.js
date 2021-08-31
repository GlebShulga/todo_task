import React from "react";
import axios from "axios";
import Category from "./Category";
import "../assets/scss/CategoryList.scss";

const CategoryList = ({
  choosenCategory,
  setChoosenCategory,
  categoryList,
  categoryTitleList,
  fetchCategoryList,
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
        categoryTitle
      },
    });
  };

  return (
    <ul className="CategoryList">
      {categoryList.map((category) => {
        // const visibleCategory =
        //   category.parentCategoryId === null ||
        //   category.parentCategoryId === choosenCategoryId ||
        //   category.categoryId === choosenCategoryId;
        return (
          <li
            // className={
            //   visibleCategory ? "CategoryTable" : "CategoryTable_hidden"
            // }
            className="CategoryTable"
            key={category.categoryId}
          >
            <Category
              category={category}
              patchCategory={patchCategory}
              deleteCategory={deleteCategory}
              setChoosenCategory={setChoosenCategory}
              choosenCategory={choosenCategory}
              fetchCategoryList={fetchCategoryList}
              categoryTitleList={categoryTitleList}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryList;
