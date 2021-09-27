import axios from "axios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer from "../reducers/category";
import {
  setIsFilterStatusDone,
  setIsCreateTaskModalOpen,
  fetchCategoryList,
  updateChosenCategory,
} from "./category";
import {
  GET_ROOT_CATEGORY_LIST,
  GET_CATEGORIES_LIST,
  GET_CATEGORIES_TITLE_LIST,
} from "../types/category";

jest.mock("axios");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("category action creators", () => {
  // it("categoryList fetch and dispatch successfully", () => {
  //   axios.get.mockImplementationOnce(() => {
  //     return Promise.resolve({
  //       data: {
  //         rootList: [
  //           {
  //             categoryId: "HD6CryOdGgYn4QJdKgs5G",
  //             parentCategoryId: null,
  //             categoryTitle: "Nikita's tasks",
  //             lvl: 1,
  //           },
  //           {
  //             categoryId: "JO8Am3bmIIOMpnbYhwsVt",
  //             parentCategoryId: null,
  //             categoryTitle: "category 2_1",
  //             lvl: 1,
  //           },
  //         ],
  //         categoryList: [
  //           {
  //             categoryId: "HD6CryOdGgYn4QJdKgs5G",
  //             parentCategoryId: null,
  //             categoryTitle: "Nikita's tasks",
  //             lvl: 1,
  //           },
  //           {
  //             categoryId: "JO8Am3bmIIOMpnbYhwsVt",
  //             parentCategoryId: null,
  //             categoryTitle: "category 2_1",
  //             lvl: 1,
  //           },
  //           {
  //             categoryId: "zi-jOQAPVMcHdpGIXd9jk",
  //             parentCategoryId: "zgcWQhZIDrbYzhSTGiOMC",
  //             categoryTitle: "test 7_3_1",
  //             lvl: 2,
  //           },
  //           {
  //             categoryId: "5ssRmvIUcEACosuj7UfbE",
  //             parentCategoryId: "Dxggo-RHZqSEoDByG1rB6",
  //             categoryTitle: "test 7_1_2",
  //             lvl: 2,
  //           },
  //         ],
  //         titleList: [
  //           "Nikita's tasks",
  //           "category 2_1",
  //           "test 7_3_1",
  //           "test 7_1_2",
  //           "test 7_3",
  //           "test 7_2",
  //           "test 7 1_1_2",
  //           "test 7_1_1_1_2",
  //         ],
  //       },
  //     });
  //   });
  //   const cb = fetchCategoryList();
  //   expect(typeof cb).toBe("function");

  //   const store = mockStore({
  //     router: {
  //       location: { pathname: "/", search: "", hash: "", query: {} },
  //       action: "POP",
  //     },
  //     category: {
  //       categoryList: [],
  //       titleList: [],
  //       rootList: [],
  //     },
  //   });
  //   store.dispatch(fetchCategoryList()).then(() => {
  //     expect(store.getActions()).toEqual([
  //       {
  //         type: GET_ROOT_CATEGORY_LIST,
  //         rootList: [
  //           {
  //             categoryId: "HD6CryOdGgYn4QJdKgs5G",
  //             parentCategoryId: null,
  //             categoryTitle: "Nikita's tasks",
  //             lvl: 1,
  //           },
  //           {
  //             categoryId: "JO8Am3bmIIOMpnbYhwsVt",
  //             parentCategoryId: null,
  //             categoryTitle: "category 2_1",
  //             lvl: 1,
  //           },
  //         ],
  //       },
  //       {
  //         type: GET_CATEGORIES_LIST,
  //         categoryList: [
  //           {
  //             categoryId: "HD6CryOdGgYn4QJdKgs5G",
  //             parentCategoryId: null,
  //             categoryTitle: "Nikita's tasks",
  //             lvl: 1,
  //           },
  //           {
  //             categoryId: "JO8Am3bmIIOMpnbYhwsVt",
  //             parentCategoryId: null,
  //             categoryTitle: "category 2_1",
  //             lvl: 1,
  //           },
  //           {
  //             categoryId: "zi-jOQAPVMcHdpGIXd9jk",
  //             parentCategoryId: "zgcWQhZIDrbYzhSTGiOMC",
  //             categoryTitle: "test 7_3_1",
  //             lvl: 2,
  //           },
  // {
  //   categoryId: "5ssRmvIUcEACosuj7UfbE",
  //   parentCategoryId: "Dxggo-RHZqSEoDByG1rB6",
  //   categoryTitle: "test 7_1_2",
  //   lvl: 2,
  // },
  //         ],
  //       },
  //       {
  //         type: GET_CATEGORIES_TITLE_LIST,
  //         titleList: [
  //           "Nikita's tasks",
  //           "category 2_1",
  //           "test 7_3_1",
  //           "test 7_1_2",
  //           "test 7_3",
  //           "test 7_2",
  //           "test 7 1_1_2",
  //           "test 7_1_1_1_2",
  //         ],
  //       },
  //     ]);
  //   });
  // });
  it("should change IsFilterStatusDone flag", () => {
    const previousState = [];
    expect(reducer(previousState, setIsFilterStatusDone(true))).toEqual({
      isFilterStatusDone: true,
    });
  });

  it("should change IsCreateTaskModalOpen flag", () => {
    const previousState = [];
    expect(reducer(previousState, setIsCreateTaskModalOpen(true))).toEqual({
      isCreateTaskModalOpen: true,
    });
  });

  it("should update chosen category", () => {
    const previousState = {};
    expect(
      reducer(
        previousState,
        updateChosenCategory({
          categoryId: "5ssRmvIUcEACosuj7UfbE",
          parentCategoryId: "Dxggo-RHZqSEoDByG1rB6",
          categoryTitle: "test 7_1_2",
          lvl: 2,
        })
      )
    ).toEqual({
      chosenCategory: {
        categoryId: "5ssRmvIUcEACosuj7UfbE",
        parentCategoryId: "Dxggo-RHZqSEoDByG1rB6",
        categoryTitle: "test 7_1_2",
        lvl: 2,
      },
    });
  });
});
