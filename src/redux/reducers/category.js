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

const initialState = {
  categoryList: [],
  rootCategoryList: [],
  categoryTitleList: [],
  chosenCategory: {},
  isFilterStatusDone: false,
  isCreateTaskModalOpen: false,
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
    default:
      return state;
  }
};


