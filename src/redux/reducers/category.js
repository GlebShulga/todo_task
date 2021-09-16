import axios from "axios";

const ADD_CATEGORY = "ADD_CATEGORY";
const GET_CATEGORIES_LIST = "GET_CATEGORIES_LIST";
const GET_CATEGORIES_TITLE_LIST = "GET_CATEGORIES_TITLE_LIST";
const GET_ROOT_CATEGORY_LIST = "GET_ROOT_CATEGORY_LIST";
const RENAME_CATEGORY = "RENAME_CATEGORY";
const DEL_CATEGORY = "DEL_CATEGORY";
const UPDATE_CHOSEN_CATEGORY = "UPDATE_CHOSEN_CATEGORY";
const SET_IS_FILTER_STATUS_DONE = "SET_IS_FILTER_STATUS_DONE";
const SET_IS_CREATE_TASK_MODAL = "SET_IS_CREATE_TASK_MODAL";
const SET_IS_OPEN_TASK_TABLE = "SET_IS_OPEN_TASK_TABLE";

const initialState = {
  categoryList: [],
  rootCategoryList: [],
  categoryTitleList: [],
  chosenCategory: {},
  isFilterStatusDone: false,
  isCreateTaskModalOpen: false,
  isOpenTaskTable: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_LIST:
    case ADD_CATEGORY:
    case DEL_CATEGORY:
    case RENAME_CATEGORY: {
      return { ...state, categoryList: action.categoryList };
    }
    case GET_ROOT_CATEGORY_LIST: {
      return { ...state, rootCategoryList: action.rootList };
    }
    case GET_CATEGORIES_TITLE_LIST: {
      return { ...state, categoryTitleList: action.titleList };
    }
    case UPDATE_CHOSEN_CATEGORY: {
      return { ...state, chosenCategory: action.chosenCategory };
    }
    case SET_IS_FILTER_STATUS_DONE: {
      return { ...state, isFilterStatusDone: action.data };
    }
    case SET_IS_CREATE_TASK_MODAL: {
      return { ...state, isCreateTaskModalOpen: action.data };
    }
    case SET_IS_OPEN_TASK_TABLE: {
      return { ...state, isOpenTaskTable: action.data };
    }
    default:
      return state;
  }
};

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
        const rootList = categoryList.filter(
          (el) => el.parentCategoryId === null
        );
        dispatch({ type: RENAME_CATEGORY, categoryList });
        dispatch({ type: ADD_CATEGORY, categoryList });
        dispatch({ type: GET_ROOT_CATEGORY_LIST, rootList });
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
      dispatch({ type: ADD_CATEGORY, categoryList });
      dispatch({ type: GET_ROOT_CATEGORY_LIST, rootList });
    });
  };
}

export function updateChosenCategory(chosenCategory) {
  return (dispatch) => {
    dispatch({ type: UPDATE_CHOSEN_CATEGORY, chosenCategory });
  };
}

export function setIsFilterStatusDone(data) {
  return (dispatch) => {
    dispatch({ type: SET_IS_FILTER_STATUS_DONE, data });
  };
}

export function setIsCreateTaskModalOpen(data) {
  return (dispatch) => {
    dispatch({ type: SET_IS_CREATE_TASK_MODAL, data });
  };
}

export function setIsOpenTaskTable(data) {
  return (dispatch) => {
    dispatch({ type: SET_IS_OPEN_TASK_TABLE, data });
  };
}
