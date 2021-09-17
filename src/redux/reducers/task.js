import {
  ADD_TASK,
  GET_TASK_LIST,
  PATCH_TASK,
  UPDATE_CHOSEN_TASK,
  SET_EDITING_TASK_MODE,
  SET_NEW_CATEGORY_FOR_TASK,
  SET_IS_SEARCH,
  SET_SEARCH_CRITERIA,
} from "../types/task";

const initialState = {
  taskList: [],
  chosenTask: {},
  searchCriteria: "",
  isEditingTaskMode: false,
  isSearch: false,
  newCategoryIdForTask: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_LIST:
    case ADD_TASK:
    case PATCH_TASK: {
      return { ...state, taskList: action.taskList };
    }
    case UPDATE_CHOSEN_TASK: {
      return { ...state, chosenTask: action.chosenTask };
    }
    case SET_EDITING_TASK_MODE: {
      return { ...state, isEditingTaskMode: action.data };
    }
    case SET_IS_SEARCH: {
      return { ...state, isSearch: action.data };
    }
    case SET_SEARCH_CRITERIA: {
      return { ...state, searchCriteria: action.searchCriteria };
    }
    case SET_NEW_CATEGORY_FOR_TASK: {
      return { ...state, newCategoryIdForTask: action.categoryId };
    }
    default:
      return state;
  }
};


