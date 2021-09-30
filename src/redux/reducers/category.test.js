import reducer from "./category";
import {
  GET_CATEGORIES_LIST,
  GET_CATEGORIES_TITLE_LIST,
  GET_ROOT_CATEGORY_LIST,
} from "../types/category";

describe("Category reducer tests", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      categoryList: [],
      rootCategoryList: [],
      categoryTitleList: [],
      chosenCategory: {},
      isFilterStatusDone: false,
      isCreateTaskModalOpen: false,
    });
  });

  it("GET_CATEGORIES_LIST", () => {
    const categoryList = [
          {
            categoryId: "HD6CryOdGgYn4QJdKgs5G",
            parentCategoryId: "d1nN7oUmC1lTNtxGtEnbB",
            categoryTitle: "Nikita's tasks",
            lvl: 1,
          }
        ]
    expect(
      reducer(undefined, {
        type: GET_CATEGORIES_LIST,
        categoryList: categoryList,
      })
    ).toEqual({
      categoryList: categoryList,
      rootCategoryList: [],
      categoryTitleList: [],
      chosenCategory: {},
      isFilterStatusDone: false,
      isCreateTaskModalOpen: false,
    });
  });

    it("GET_ROOT_CATEGORY_LIST", () => {
      const rootList = [
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
            }];
      expect(
        reducer(undefined, {
          type: GET_ROOT_CATEGORY_LIST,
          rootList: rootList,
        })
      ).toEqual({
        categoryList: [],
        rootCategoryList: rootList,
        categoryTitleList: [],
        chosenCategory: {},
        isFilterStatusDone: false,
        isCreateTaskModalOpen: false,
      });
    });

  it("GET_CATEGORIES_TITLE_LIST", () => {
    const titleList = ["category 2_1", "test 7_3_1", "test 7_1_2", "test 7_3"];
    expect(
      reducer(undefined, {
        type: GET_CATEGORIES_TITLE_LIST,
        titleList: titleList,
      })
    ).toEqual({
      categoryList: [],
      rootCategoryList: [],
      categoryTitleList: titleList,
      chosenCategory: {},
      isFilterStatusDone: false,
      isCreateTaskModalOpen: false,
    });
  });
});
