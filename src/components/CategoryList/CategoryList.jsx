import React from "react";
import axios from "axios";
import Category from "../Category/Category";
import "./CategoryList.scss";

const CategoryList = ({
  choosenCategory,
  setChoosenCategory,
  categoryList,
  categoryTitleList,
  rootCategories,
  isEditingTaskMode,
  choosenTask,
  setNewCategoryIdForTask,
  setCategoryList,
  setRootCategories,
}) => {
  const deleteCategory = async (categoryId) => {
    await axios({
      method: "delete",
      url: "/api/v1/category",
      data: {
        categoryId,
      },
    }).then((res) => {
      const data = res.data;
      setCategoryList(data);
      setRootCategories(data.filter((el) => el.parentCategoryId === null));
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
    }).then((res) => {
      const data = res.data;
      setCategoryList(data);
      setRootCategories(data.filter((el) => el.parentCategoryId === null));
    });
  };

  const rootCategoryItem = rootCategories.map((category) => {
        return (
          <li className="category-table" key={category.categoryId}>
            <Category
              category={category}
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
          </li>
        );
      })

  return (
    <ul className="category-list scroll">{rootCategoryItem}</ul>
  );
};

export default CategoryList;
