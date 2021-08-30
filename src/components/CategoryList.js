import React, { useState } from "react";
import axios from "axios";
import CreateCategory from "./CreateCategory";
import Category from "./Category";
import "../assets/scss/CategoryList.scss";

const CategoryList = ({
  choosenCategory,
  setChoosenCategory,
  categoryList,
  categoryTitleList,
  fetchCategoryList,
}) => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

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
    <div className="CategoryList">
      {categoryList.map((category) => {
        // const visibleCategory =
        //   category.parentCategoryId === null ||
        //   category.parentCategoryId === choosenCategoryId ||
        //   category.categoryId === choosenCategoryId;
        return (
          <div
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
              isCreateTaskModalOpen={isCreateTaskModalOpen}
              setIsCreateTaskModalOpen={setIsCreateTaskModalOpen}
            />
          </div>
        );
      })}
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

export default CategoryList;
