import reducer from "./task";
import {
  GET_TASK_LIST,
  UPDATE_CHOSEN_TASK,
  SET_NEW_CATEGORY_FOR_TASK,
} from "../types/task";

describe('Task reducer tests', () => {
it("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    taskList: [],
    chosenTask: {},
    searchCriteria: "",
    isEditingTaskMode: false,
    newCategoryIdForTask: "",
  });
});

it("GET_TASK_LIST", () => {
  expect(
    reducer(undefined, {
      type: GET_TASK_LIST,
      taskList: [
        {
          categoryId: "3",
          taskId: "1",
          title: "Just do it",
          description: "bla",
          status: "new",
        },
        {
          categoryId: "3",
          taskId: "2",
          title: "Do it one more time",
          status: "new",
          description: "",
        },
      ],
    })
  ).toEqual({
    chosenTask: {},
    searchCriteria: "",
    isEditingTaskMode: false,
    newCategoryIdForTask: "",
    taskList: [
      {
        categoryId: "3",
        taskId: "1",
        title: "Just do it",
        description: "bla",
        status: "new",
      },
      {
        categoryId: "3",
        taskId: "2",
        title: "Do it one more time",
        status: "new",
        description: "",
      },
    ],
  });
});

it("UPDATE_CHOSEN_TASK", () => {
  const chosenTask = {
    categoryId: "3",
    taskId: "2",
    title: "Do it one more time",
    status: "new",
    description: "",
  };
  expect(
    reducer(undefined, {
      type: UPDATE_CHOSEN_TASK,
      chosenTask: chosenTask,
    })
  ).toEqual({
    chosenTask: chosenTask,
    searchCriteria: "",
    isEditingTaskMode: false,
    newCategoryIdForTask: "",
    taskList: [],
  });
});

it("SET_NEW_CATEGORY_FOR_TASK", () => {
  const categoryId = "3";
  expect(
    reducer(undefined, {
      type: SET_NEW_CATEGORY_FOR_TASK,
      categoryId: categoryId,
    })
  ).toEqual({
    chosenTask: {},
    searchCriteria: "",
    isEditingTaskMode: false,
    newCategoryIdForTask: categoryId,
    taskList: [],
  });
});

it("Unknown updates state", () => {
  const tasklist = [
          {
            categoryId: "3",
            taskId: "1",
            title: "Just do it",
            description: "bla",
            status: "new",
          }
        ]
  expect(
    reducer(
      {
        taskList: tasklist,
      },
      {
        type: "UNKNOWN",
        taskList: [
          {
            categoryId: "3",
            taskId: "2",
            title: "Do it one more time",
            status: "new",
            description: "",
          },
        ],
      }
    )
  ).toEqual({
    taskList: tasklist,
  });
});
})



