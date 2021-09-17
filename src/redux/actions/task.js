import axios from "axios";
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
