import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import thunk from "redux-thunk";
import Category from "./Category.jsx";


jest.mock("../../redux/actions/category", () => ({
  ...jest.requireActual("../../redux/actions/category"),
  renameCategory: jest.fn(),
}));



const middlewares = [thunk];
let mockStore;
const mockStoreConf = configureStore(middlewares);

describe("Category Component", () => {
  let props;
  beforeEach(() => {
    mockStore = mockStoreConf(
      {
        router: {
          location: { pathname: "/", search: "", hash: "", query: {} },
          action: "POP",
        },
        category: {
          categoryList: [
            {
              categoryId: "HD6CryOdGgYn4QJdKgs5G",
              parentCategoryId: "d1nN7oUmC1lTNtxGtEnbB",
              categoryTitle: "Nikita's tasks",
              lvl: 1,
            },
            {
              categoryId: "JO8Am3bmIIOMpnbYhwsVt",
              parentCategoryId: "5",
              categoryTitle: "category 2_1",
              lvl: 1,
            },
            {
              categoryId: "zi-jOQAPVMcHdpGIXd9jk",
              parentCategoryId: "zgcWQhZIDrbYzhSTGiOMC",
              categoryTitle: "test 7_3_1",
              lvl: 2,
            },
            {
              categoryId: "5ssRmvIUcEACosuj7UfbE",
              parentCategoryId: "Dxggo-RHZqSEoDByG1rB6",
              categoryTitle: "test 7_1_2",
              lvl: 2,
            },
            {
              categoryId: "zgcWQhZIDrbYzhSTGiOMC",
              parentCategoryId: "d1nN7oUmC1lTNtxGtEnbB",
              categoryTitle: "test 7_3",
              lvl: 1,
            },
            {
              categoryId: "24UUtTrRi-56blyyFBmuc",
              parentCategoryId: "d1nN7oUmC1lTNtxGtEnbB",
              categoryTitle: "test 7_2",
              lvl: 1,
            },
            {
              categoryId: "QbgbVXtxK2dLIHuQtlsne",
              parentCategoryId: "71QQpam8O1RZKItQjdVmY",
              categoryTitle: "test 7 1_1_2",
              lvl: 3,
            },
            {
              categoryId: "Anc96-W7mm7-gBn8_I7FZ",
              parentCategoryId: "Er20Gzc9qIcXW747oB56m",
              categoryTitle: "test 7_1_1_1_2",
              lvl: 4,
            },
            {
              categoryId: "EjscBBaQZwIpkEghrV8YG",
              parentCategoryId: "Er20Gzc9qIcXW747oB56m",
              categoryTitle: "test 7 1_1_1_1",
              lvl: 4,
            },
            {
              categoryId: "Er20Gzc9qIcXW747oB56m",
              parentCategoryId: "71QQpam8O1RZKItQjdVmY",
              categoryTitle: "test 7_1_1_1",
              lvl: 3,
            },
            {
              categoryId: "71QQpam8O1RZKItQjdVmY",
              parentCategoryId: "Dxggo-RHZqSEoDByG1rB6",
              categoryTitle: "test 7_1_1",
              lvl: 2,
            },
            {
              categoryId: "Dxggo-RHZqSEoDByG1rB6",
              parentCategoryId: "d1nN7oUmC1lTNtxGtEnbB",
              categoryTitle: "test 7_1",
              lvl: 1,
            },
            {
              categoryId: "d1nN7oUmC1lTNtxGtEnbB",
              parentCategoryId: null,
              categoryTitle: "test 7",
              lvl: 0,
            },
            {
              categoryId: "Wy1dXPxgnYdPJONBEFg5D",
              parentCategoryId: "wzvzJGZ_u7JggnKSlamOg",
              categoryTitle: "category 4_1_2",
              lvl: 2,
            },
            {
              categoryId: "wzvzJGZ_u7JggnKSlamOg",
              parentCategoryId: "RuQ3m0zrlNX9uY68zWCN1",
              categoryTitle: "test 4_1",
              lvl: 1,
            },
            {
              categoryId: "RuQ3m0zrlNX9uY68zWCN1",
              parentCategoryId: null,
              categoryTitle: "category 4",
              lvl: 0,
            },
            {
              categoryId: "6",
              categoryTitle: "category 2_3",
              parentCategoryId: "5",
              lvl: 1,
            },
            {
              categoryId: "8",
              categoryTitle: "category 2_2",
              parentCategoryId: "5",
              lvl: 1,
            },
            {
              categoryId: "7",
              categoryTitle: "category 2_1_1",
              parentCategoryId: "6",
              lvl: 2,
            },
            {
              categoryId: "5",
              categoryTitle: "category 2",
              parentCategoryId: null,
              lvl: 0,
            },
            {
              categoryId: "4",
              categoryTitle: "category 1_1_3",
              parentCategoryId: "2",
              lvl: 2,
            },
            {
              categoryId: "3",
              categoryTitle: "category 1_1_1",
              parentCategoryId: "2",
              lvl: 2,
            },
            {
              categoryId: "2",
              categoryTitle: "category 1_1",
              parentCategoryId: "1",
              lvl: 1,
            },
            {
              categoryId: "1",
              categoryTitle: "category 1",
              parentCategoryId: null,
              lvl: 0,
            },
            {
              categoryId: "PoMWPerFYXlI9_uCQH_Em",
              parentCategoryId: "Kbchx0i_c73rCkMJI8KCf",
              categoryTitle: "category 2_2_1_1",
              lvl: 3,
            },
            {
              categoryId: "Kbchx0i_c73rCkMJI8KCf",
              parentCategoryId: "8",
              categoryTitle: "category 2_2_1",
              lvl: 2,
            },
            {
              categoryId: "iQZpSMLpL0crGLqoS9M1d",
              parentCategoryId: null,
              categoryTitle: "category 3",
              lvl: 0,
            },
          ],
          rootCategoryList: [
            {
              categoryId: "d1nN7oUmC1lTNtxGtEnbB",
              parentCategoryId: null,
              categoryTitle: "test 7",
              lvl: 0,
            },
            {
              categoryId: "RuQ3m0zrlNX9uY68zWCN1",
              parentCategoryId: null,
              categoryTitle: "category 4",
              lvl: 0,
            },
            {
              categoryId: "5",
              categoryTitle: "category 2",
              parentCategoryId: null,
              lvl: 0,
            },
            {
              categoryId: "1",
              categoryTitle: "category 1",
              parentCategoryId: null,
              lvl: 0,
            },
            {
              categoryId: "iQZpSMLpL0crGLqoS9M1d",
              parentCategoryId: null,
              categoryTitle: "category 3",
              lvl: 0,
            },
          ],
          categoryTitleList: [
            "Nikita's tasks",
            "category 2_1",
            "test 7_3_1",
            "test 7_1_2",
            "test 7_3",
            "test 7_2",
            "test 7 1_1_2",
            "test 7_1_1_1_2",
            "test 7 1_1_1_1",
            "test 7_1_1_1",
            "test 7_1_1",
            "test 7_1",
            "test 7",
            "category 4_1_2",
            "test 4_1",
            "category 4",
            "category 2_3",
            "category 2_2",
            "category 2_1_1",
            "category 2",
            "category 1_1_3",
            "category 1_1_1",
            "category 1_1",
            "category 1",
            "category 2_2_1_1",
            "category 2_2_1",
            "category 3",
          ],
          chosenCategory: {},
          isFilterStatusDone: false,
          isCreateTaskModalOpen: false,
        },
        task: {
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
            {
              categoryId: "4",
              taskId: "3",
              title: "Fly to the Earth",
              description: "bla-bla",
              status: "new",
            },
            {
              categoryId: "d1nN7oUmC1lTNtxGtEnbB",
              taskId: "pI2IO5LGgVTfjlWchzpKx",
              title: "test task",
              description: "",
              status: "new",
            },
            {
              categoryId: "HD6CryOdGgYn4QJdKgs5G",
              taskId: "m0hOnN18ldu69axREN0Tw",
              title: "fry big fish",
              status: "done",
              description: "FRY THE fish.",
            },
            {
              categoryId: "RuQ3m0zrlNX9uY68zWCN1",
              taskId: "454zuMqEHrrcDxwj1B5_p",
              title: "One more task",
              description: "",
              status: "done",
            },
            {
              categoryId: "7",
              taskId: "6Ni_9cmf7oHxsrxz-R2EP",
              title: "Second real task",
              description: "",
              status: "done",
            },
            {
              categoryId: "5",
              taskId: "Osau79o53nO1OAPtFmBXg",
              title: "Save the world today",
              description: "Save all species",
              status: "done",
            },
            {
              categoryId: "4",
              taskId: "5",
              title: "Fly to the Neptune",
              description: "I believe I can fly",
              status: "done",
            },
            {
              categoryId: "d1nN7oUmC1lTNtxGtEnbB",
              taskId: "mmYWc9uO3xPriRWkB5nGy",
              title: "Test task 1.0",
              description: "Test",
              status: "done",
            },
            {
              categoryId: "1",
              taskId: "BHD3mf0sWR5HRmtELuECx",
              title: "Edited task",
              description: "Task Limited Edition 5.0",
              status: "done",
            },
            {
              categoryId: "4",
              taskId: "4",
              title: "Fly to the Mars",
              description: "bla-bla-bla",
              status: "done",
            },
            {
              categoryId: "d1nN7oUmC1lTNtxGtEnbB",
              taskId: "9ZU08mIPEV4ZXjQKCanqY",
              title: "to-do",
              status: "done",
            },
            {
              categoryId: "6",
              taskId: "vz3GkbGCTfPzTXx2Shfmd",
              title: "task 2_1",
              status: "done",
              description: "Very important task",
            },
          ],
          chosenTask: {},
          searchCriteria: "",
          isEditingTaskMode: false,
          newCategoryIdForTask: "",
        },
      },
      {
        type: "GET_TASK_LIST",
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
          {
            categoryId: "4",
            taskId: "3",
            title: "Fly to the Earth",
            description: "bla-bla",
            status: "new",
          },
          {
            categoryId: "d1nN7oUmC1lTNtxGtEnbB",
            taskId: "pI2IO5LGgVTfjlWchzpKx",
            title: "test task",
            description: "",
            status: "new",
          },
          {
            categoryId: "HD6CryOdGgYn4QJdKgs5G",
            taskId: "m0hOnN18ldu69axREN0Tw",
            title: "fry big fish",
            status: "done",
            description: "FRY THE fish.",
          },
          {
            categoryId: "RuQ3m0zrlNX9uY68zWCN1",
            taskId: "454zuMqEHrrcDxwj1B5_p",
            title: "One more task",
            description: "",
            status: "done",
          },
          {
            categoryId: "7",
            taskId: "6Ni_9cmf7oHxsrxz-R2EP",
            title: "Second real task",
            description: "",
            status: "done",
          },
          {
            categoryId: "5",
            taskId: "Osau79o53nO1OAPtFmBXg",
            title: "Save the world today",
            description: "Save all species",
            status: "done",
          },
          {
            categoryId: "4",
            taskId: "5",
            title: "Fly to the Neptune",
            description: "I believe I can fly",
            status: "done",
          },
          {
            categoryId: "d1nN7oUmC1lTNtxGtEnbB",
            taskId: "mmYWc9uO3xPriRWkB5nGy",
            title: "Test task 1.0",
            description: "Test",
            status: "done",
          },
          {
            categoryId: "1",
            taskId: "BHD3mf0sWR5HRmtELuECx",
            title: "Edited task",
            description: "Task Limited Edition 5.0",
            status: "done",
          },
          {
            categoryId: "4",
            taskId: "4",
            title: "Fly to the Mars",
            description: "bla-bla-bla",
            status: "done",
          },
          {
            categoryId: "d1nN7oUmC1lTNtxGtEnbB",
            taskId: "9ZU08mIPEV4ZXjQKCanqY",
            title: "to-do",
            status: "done",
          },
          {
            categoryId: "6",
            taskId: "vz3GkbGCTfPzTXx2Shfmd",
            title: "task 2_1",
            status: "done",
            description: "Very important task",
          },
        ],
      }
    );
    props = {
      category: {
        categoryId: "HD6CryOdGgYn4QJdKgs5G",
        parentCategoryId: "d1nN7oUmC1lTNtxGtEnbB",
        categoryTitle: "Nikita's tasks",
        lvl: 1,
      },
      categoryListWithDoneFlag: [
        {
          categoryId: "HD6CryOdGgYn4QJdKgs5G",
          parentCategoryId: "d1nN7oUmC1lTNtxGtEnbB",
          categoryTitle: "Nikita's tasks",
          lvl: 1,
          isAllTasksDone: true,
        },
        {
          categoryId: "RuQ3m0zrlNX9uY68zWCN1",
          parentCategoryId: null,
          categoryTitle: "category 4",
          lvl: 0,
          isAllTasksDone: true,
        },
        {
          categoryId: "6",
          categoryTitle: "category 2_3",
          parentCategoryId: "5",
          lvl: 1,
          isAllTasksDone: true,
        },
        {
          categoryId: "7",
          categoryTitle: "category 2_1_1",
          parentCategoryId: "6",
          lvl: 2,
          isAllTasksDone: true,
        },
        {
          categoryId: "5",
          categoryTitle: "category 2",
          parentCategoryId: null,
          lvl: 0,
          isAllTasksDone: true,
        },
        {
          categoryId: "1",
          categoryTitle: "category 1",
          parentCategoryId: null,
          lvl: 0,
          isAllTasksDone: true,
        },
      ],
    };
  });

  it("Category snapshot", () => {
    const component = renderer.create(
      <Router>
        <Provider store={mockStore}>
          <Category {...props} />
        </Provider>
      </Router>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
