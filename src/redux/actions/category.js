import axios from "axios";
import {
  ADD_CATEGORY,
  GET_CATEGORIES_LIST,
  GET_CATEGORIES_TITLE_LIST,
  GET_ROOT_CATEGORY_LIST,
  RENAME_CATEGORY,
  DEL_CATEGORY,
  UPDATE_CHOSEN_CATEGORY,
  SET_IS_FILTER_STATUS_DONE,
  SET_IS_CREATE_TASK_MODAL,
} from "../types/category";

export function fetchCategoryList() {
  return (dispatch) => {
    axios("/api/v1/category")
      .then(({ data }) => {
        const rootList = data.filter((el) => el.parentCategoryId === null);
        const titleList = data.map((category) => category.categoryTitle);
        dispatch({ type: GET_ROOT_CATEGORY_LIST, rootList });
        dispatch({ type: GET_CATEGORIES_LIST, categoryList: data });
        dispatch({ type: GET_CATEGORIES_TITLE_LIST, titleList });
      })
      .catch((err) => console.log(err));
  };
}

export function addCategory(categoryTitle, parentCategoryId, lvl) {
  return (dispatch) => {
    axios({
      method: "post",
      url: "/api/v1/category/:categoryTitle",
      data: {
        categoryTitle,
        parentCategoryId,
        lvl,
      },
    })
      .then(({ data: categoryList }) => {
        const rootList = categoryList.filter(
          (el) => el.parentCategoryId === null
        );
        dispatch({ type: ADD_CATEGORY, categoryList });
        dispatch({ type: GET_ROOT_CATEGORY_LIST, rootList });
      })
      .catch((err) => console.log(err));
  };
}

export function renameCategory(categoryId, categoryTitle) {
  return (dispatch) => {
    axios({
      method: "patch",
      url: "/api/v1/category",
      data: {
        categoryId,
        categoryTitle,
      },
    })
      .then(({ data: categoryList }) => {
        dispatch({ type: RENAME_CATEGORY, categoryList });
      })
      .catch((err) => console.log(err));
  };
}

export function delCategory(categoryId) {
  return (dispatch) => {
    axios({
      method: "delete",
      url: "/api/v1/category",
      data: {
        categoryId,
      },
    }).then(({ data: categoryList }) => {
      const rootList = categoryList.filter(
        (el) => el.parentCategoryId === null
      );
      dispatch({ type: DEL_CATEGORY, categoryList });
      dispatch({ type: GET_ROOT_CATEGORY_LIST, rootList });
    });
  };
}

export function updateChosenCategory(chosenCategory) {
  return (dispatch) => {
    dispatch({ type: UPDATE_CHOSEN_CATEGORY, chosenCategory })
   }
}

export function setIsFilterStatusDone(data) {
  return ({ type: SET_IS_FILTER_STATUS_DONE, data });

}

export function setIsCreateTaskModalOpen(data) {
  return ({ type: SET_IS_CREATE_TASK_MODAL, data });
}

