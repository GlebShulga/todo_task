import React, { useState } from "react";
import axios from "axios";
import editIcon from "../assets/images/editIcon.svg";
import saveIcon from "../assets/images/saveIcon.svg";
import checkMark from "../assets/images/checkMark.svg";
import basketIcon from "../assets/images/basketIcon.svg";
import CreateCategory from "./CreateCategory";
import "../assets/scss/CategoryList.scss";

const CategoryList = ({
  choosenCategory,
  setChoosenCategory,
  setIsCategoryListUpdated,
  isCategoryListUpdated,
  categoryList,
  categoryTitleList,
  fetchCategoryList,
}) => {
  const [toggle, setToggle] = useState(false);
  const [isEditingMode, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(choosenCategory.categoryTitle);

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

  const onTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const edit = isEditingMode ? (
    <img src={saveIcon} className="" alt="save icon" />
  ) : (
    <img src={editIcon} className="" alt="edit icon" />
  );

  return (
    <div className="CategoryList">
      {categoryList.map((category) => {
        const categoryId = category.categoryId;
        const visibleCategory =
          category.parentCategoryId === null ||
          category.parentCategoryId === choosenCategoryId ||
          category.categoryId === choosenCategoryId;

        return (
          <div
            className={visibleCategory ? "Category" : "Category_hidden"}
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
            {!isEditingMode && (
              <button
                className="Category-title"
                style={{ marginLeft: `${category.lvl}rem` }}
                onClick={() => {
                  setChoosenCategory(category);
                }}
              >
                {category.categoryTitle}
              </button>
            )}
            {isEditingMode && (
              <input
                className="Edit_input"
                type="text"
                value={newTitle}
                onChange={onTitleChange}
              />
            )}
            <button
              onClick={() => {
                if (isEditingMode) {
                  patchCategory(categoryId, newTitle);
                }
                setEditing(!isEditingMode);
              }}
            >
              {edit}
            </button>
            <button
              onClick={async () => {
                await deleteCategory(categoryId);
                await fetchCategoryList();
                // setIsCategoryListUpdated(!isCategoryListUpdated);
              }}
            >
              <img src={basketIcon} className="Basket_icon" alt="delete icon" />
            </button>
            <button
              type="button"
              className="Plus_icon"
              onClick={() => {
                setChoosenCategory(category);
                setToggle(!toggle);
              }}
            >
              +
            </button>
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
            setIsCategoryListUpdated={setIsCategoryListUpdated}
            isCategoryListUpdated={isCategoryListUpdated}
            fetchCategoryList={fetchCategoryList}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryList;
