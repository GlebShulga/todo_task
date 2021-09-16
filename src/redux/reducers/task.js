import axios from "axios";

const ADD_TASK = "ADD_TASK";
const GET_TASK_LIST = "GET_TASK_LIST";
const PATCH_TASK = "PATCH_TASK";
const UPDATE_CHOSEN_TASK = "UPDATE_CHOSEN_TASK";
const SET_EDITING_TASK_MODE = "SET_EDITING_TASK_MODE ";
const SET_NEW_CATEGORY_FOR_TASK = "SET_NEW_CATEGORY_FOR_TASK";
const SET_IS_SEARCH = "SET_IS_SEARCH";
const SET_SEARCH_CRITERIA = "SET_SEARCH_CRITERIA";

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

export function fetchTaskList() {
  return (dispatch) => {
    axios("/api/v1/task")
      .then(({ data }) => {
        dispatch({ type: GET_TASK_LIST, taskList: data });
      })
      .catch((err) => console.log(err));
  };
}

export function addTask(title, categoryId) {
  return (dispatch) => {
    axios({
      method: "post",
      url: "/api/v1/task",
      data: {
        title,
        categoryId,
      },
    })
      .then(({ data: taskList }) => {
        dispatch({ type: ADD_TASK, taskList });
        dispatch({ type: GET_TASK_LIST, taskList });
      })
      .catch((err) => console.log(err));
  };
}

export function patchTask(taskId, status, title, description, categoryId) {
  return (dispatch) => {
    axios({
      method: "patch",
      url: "/api/v1/task",
      data: {
        taskId,
        status,
        title,
        description,
        categoryId,
      },
    })
      .then(({ data: taskList }) => {
        dispatch({ type: PATCH_TASK, taskList });
      })
      .catch((err) => console.log(err));
  };
}

export function updateChosenTask(chosenTask) {
  return (dispatch) => {
    dispatch({ type: UPDATE_CHOSEN_TASK, chosenTask });
  };
}

export function setEditingTaskMode(data) {
  return (dispatch) => {
    dispatch({ type: SET_EDITING_TASK_MODE, data });
  };
}

export function setIsSearch(data) {
  return (dispatch) => {
    dispatch({ type: SET_IS_SEARCH, data });
  };
}

export function setSearchCriteria(searchCriteria) {
  return (dispatch) => {
    dispatch({ type: SET_SEARCH_CRITERIA, searchCriteria });
  };
}

export function setNewCategoryIdForTask(categoryId) {
  return (dispatch) => {
    dispatch({ type: SET_NEW_CATEGORY_FOR_TASK, categoryId });
  };
}
