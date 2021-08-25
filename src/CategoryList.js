import React, { useEffect, useState } from "react";
import axios from "axios";
import editIcon from "./assets/images/editIcon.svg";
import checkMark from "./assets/images/checkMark.svg";
import basketIcon from "./assets/images/basketIcon.svg";
import "./assets/scss/CategoryList.scss";

const CategoryList = ({ choosenCategoryId, setChoosenCategoryId }) => {
  const [categoryList, setCategoryList] = useState([]);
  // const [choosenCategoryId, setChoosenCategoryId] = useState('')

  useEffect(() => {
    axios("/api/v1/category")
      .then((res) => {
        const data = res.data;
        console.log(data, "data");
        setCategoryList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="CategoryList">
      {categoryList.map((category) => {
        return (
          <div className="Category">
            <img
              src={checkMark}
              className={
                category.categoryId === choosenCategoryId
                  ? "checkMark"
                  : "checkMark_hidden"
              }
              alt="check mark icon"
            />
            <button
              key={category.categoryId}
              className="Category-title"
              onClick={() => {
                setChoosenCategoryId(category.categoryId);
              }}
            >
              {category.categoryTitle}
            </button>
            <img src={editIcon} className="Edit_icon" alt="edit icon" />
            <img src={basketIcon} className="Basket_icon" alt="delete icon" />
            <button type="button" className="Plus_icon" onClick={""}>
              +
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
