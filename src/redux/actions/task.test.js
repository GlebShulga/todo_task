import axios from "axios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer from "../reducers/task";
import {
  setEditingTaskMode,
  fetchTaskList,
  updateChosenTask,
  setSearchCriteria,
  setNewCategoryIdForTask,
  addTask,
} from "./task";
import { GET_TASK_LIST, UPDATE_CHOSEN_TASK, ADD_TASK } from "../types/task";

jest.mock("axios");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("task action creators", () => {
  it("fetchTaskList fetch and dispatch successfully", () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: [
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
    const cb = fetchTaskList();
    expect(typeof cb).toBe("function");

    const store = mockStore({
      router: {
        location: { pathname: "/", search: "", hash: "", query: {} },
        action: "POP",
      },
      task: {
        taskList: [],
        chosenTask: {},
      },
    });
    store.dispatch(fetchTaskList()).then(() => {
      expect(store.getActions()).toEqual([
        {
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
        },
      ]);
    });
  });

  // it("post task successfully", () => {
  //   axios.post.mockImplementationOnce(() => {
  //     return Promise.resolve({
  //       data: [
  //         {
  //           categoryId: "3",
  //           title: "Just do it",
  //         },
  //       ],
  //     });
  //   });
  //   const cb = addTask();
  //   expect(typeof cb).toBe("function");

  //   const store = mockStore({
  //     task: {
  //       taskList: [],
  //     },
  //   });
  //   store.dispatch(addTask()).then(() => {
  //     expect(store.getActions()).toEqual([
  //       {
  //         type: ADD_TASK,
  //         taskList: [
  //           {
  //             categoryId: "3",
  //             title: "Just do it",
  //           },
  //         ],
  //       },
  //     ]);
  //   });
  // });

  it("should change isEditingTaskMode flag", () => {
    const previousState = [];
    expect(reducer(previousState, setEditingTaskMode(true))).toEqual({
      isEditingTaskMode: true,
    });

  });

  it("should update chosen task", () => {
    const previousState = {};
    expect(
      reducer(
        previousState,
        updateChosenTask({
          categoryId: "3",
          taskId: "2",
          title: "Do it one more time",
          status: "new",
          description: "",
        })
      )
    ).toEqual({
      chosenTask: {
        categoryId: "3",
        taskId: "2",
        title: "Do it one more time",
        status: "new",
        description: "",
      },
    });
  });

  it("should set search criteria", () => {
    const previousState = "";
    expect(reducer(previousState, setSearchCriteria("task"))).toEqual({
      searchCriteria: "task",
    });
  });

    it("should set new category id for task", () => {
      const previousState = "";
      expect(reducer(previousState, setNewCategoryIdForTask("3"))).toEqual({
        newCategoryIdForTask: "3",
      });
    });
});
