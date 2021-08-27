import React, { useState } from "react";
import axios from "axios";
import basketIcon from "../assets/images/basketIcon.svg";
import plusIcon from "../assets/images/plusIcon.svg";
import checkMark from "../assets/images/checkMark.svg";
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
  const [toggle, setToggle] = useState(false);

  const choosenCategoryId = choosenCategory.categoryId;

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
        const categoryId = category.categoryId;
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
            <img
              src={checkMark}
              className={
                category.categoryId === choosenCategoryId
                  ? "checkMark"
                  : "checkMark_hidden"
              }
              alt="check mark icon"
            />
            <Category
              category={category}
              patchCategory={patchCategory}
              setChoosenCategory={setChoosenCategory}
              fetchCategoryList={fetchCategoryList}
            />
            <div className="Icon">
              <button
                onClick={async () => {
                  await deleteCategory(categoryId);
                  await fetchCategoryList();
                }}
              >
                <img src={basketIcon} className="" alt="delete icon" />
              </button>
              <button
                type="button"
                className="Plus_icon"
                onClick={() => {
                  setChoosenCategory(category);
                  setToggle(!toggle);
                }}
              >
                <img src={plusIcon} className="" alt="add icon" />
              </button>
            </div>
          </div>
        );
      })}
      {toggle && (
        <div className="CreateCategoryModal">
          <CreateCategory
            toggle={toggle}
            setToggle={setToggle}
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
