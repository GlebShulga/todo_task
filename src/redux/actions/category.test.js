import axios from "axios";
import reducer from "../reducers/category";
import {
  setIsFilterStatusDone,
  setIsCreateTaskModalOpen,
  fetchCategoryList,
  updateChosenCategory,
  delCategory,
  addCategory,
  renameCategory,
} from "./category";
import {
  GET_ROOT_CATEGORY_LIST,
  GET_CATEGORIES_LIST,
  GET_CATEGORIES_TITLE_LIST,
  ADD_CATEGORY,
  RENAME_CATEGORY,
  DEL_CATEGORY,
} from "../types/category";

jest.mock("axios");

describe("category action creators", () => {
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

  describe("Add Category action tests", () => {
    let dispatch = jest.fn();
    const categoryList = [
      {
        categoryId: "HD6CryOdGgYn4QJdKgs5G",
        parentCategoryId: null,
        categoryTitle: "Nikita's tasks",
        lvl: 1,
      },
      {
        categoryId: "JO8Am3bmIIOMpnbYhwsVt",
        parentCategoryId: null,
        categoryTitle: "category 2_1",
        lvl: 1,
      },
      {
        categoryId: "zi-jOQAPVMcHdpGIXd9jk",
        parentCategoryId: "zgcWQhZIDrbYzhSTGiOMC",
        categoryTitle: "test 7_3_1",
        lvl: 2,
      },
    ];

    beforeEach(async () => {
      const responseData = {
        status: 200,
        data: categoryList,
      };

      axios.mockResolvedValueOnce(responseData);
      await addCategory("test 7_1_2", "Dxggo-RHZqSEoDByG1rB6", 2)(dispatch);
    });

    it("Should ADD_CATEGORY action is dispacthed when post response comes to url - /api/v1/category/:categoryTitle", () => {
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ADD_CATEGORY,
        categoryList,
      });
    });

    it("Should GET_ROOT_CATEGORY_LIST action is dispacthed when post response comes to url - /api/v1/category/:categoryTitle", () => {
      const expectedList = [
        {
          categoryId: "HD6CryOdGgYn4QJdKgs5G",
          parentCategoryId: null,
          categoryTitle: "Nikita's tasks",
          lvl: 1,
        },
        {
          categoryId: "JO8Am3bmIIOMpnbYhwsVt",
          parentCategoryId: null,
          categoryTitle: "category 2_1",
          lvl: 1,
        },
      ];
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: GET_ROOT_CATEGORY_LIST,
        rootList: expectedList,
      });
    });
  });

  it("Should rename action is dispatched when rename api is called", async () => {
    let dispatch = jest.fn();
    const categoryList = [
      {
        categoryId: "HD6CryOdGgYn4QJdKgs5G",
        parentCategoryId: null,
        categoryTitle: "Nikita's tasks",
        lvl: 1,
      },
      {
        categoryId: "JO8Am3bmIIOMpnbYhwsVt",
        parentCategoryId: null,
        categoryTitle: "category 2_1",
        lvl: 1,
      },
    ];

    const responseData = {
      status: 200,
      data: categoryList,
    };
    axios.mockResolvedValueOnce(responseData);
    await renameCategory("HD6CryOdGgYn4QJdKgs5G", "Nikita's tasks")(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: RENAME_CATEGORY,
      categoryList,
    });
  });

  describe("Delete Category action tests", () => {
    let dispatch = jest.fn();
    const categoryList = [
      {
        categoryId: "JO8Am3bmIIOMpnbYhwsVt",
        parentCategoryId: null,
        categoryTitle: "category 2_1",
        lvl: 1,
      },
      {
        categoryId: "zi-jOQAPVMcHdpGIXd9jk",
        parentCategoryId: "zgcWQhZIDrbYzhSTGiOMC",
        categoryTitle: "test 7_3_1",
        lvl: 2,
      },
    ];

    beforeEach(async () => {
      const responseData = {
        status: 200,
        data: categoryList,
      };

      axios.mockResolvedValueOnce(responseData);
      await delCategory("HD6CryOdGgYn4QJdKgs5G")(dispatch);
    });

    it("Should DEL_CATEGORY action is dispatched", () => {
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: DEL_CATEGORY,
        categoryList,
      });
    });

    it("Should GET_ROOT_CATEGORY_LIST action is dispatched", () => {
      const expectedList = [
        {
          categoryId: "JO8Am3bmIIOMpnbYhwsVt",
          parentCategoryId: null,
          categoryTitle: "category 2_1",
          lvl: 1,
        },
      ];
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: GET_ROOT_CATEGORY_LIST,
        rootList: expectedList,
      });
    });
  });

  it("categoryList fetch and dispatch successfully", async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: [
          {
            categoryId: "HD6CryOdGgYn4QJdKgs5G",
            parentCategoryId: null,
            categoryTitle: "Nikita's tasks",
            lvl: 1,
          },
          {
            categoryId: "JO8Am3bmIIOMpnbYhwsVt",
            parentCategoryId: null,
            categoryTitle: "category 2_1",
            lvl: 1,
          },

          {
            categoryId: "HD6CryOdGgYn4QJdKgs5G",
            parentCategoryId: null,
            categoryTitle: "Nikita's tasks",
            lvl: 1,
          },
          {
            categoryId: "JO8Am3bmIIOMpnbYhwsVt",
            parentCategoryId: null,
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
        ],
      });
    });
    const dispatch = jest.fn();

    const getState = {
      router: {
        location: { pathname: "/", search: "", hash: "", query: {} },
        action: "POP",
      },
      category: {
        categoryList: [],
        titleList: [],
        rootList: [],
      },
    };
    await fetchCategoryList()(dispatch, () => getState);

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: GET_ROOT_CATEGORY_LIST,
      rootList: [
        {
          categoryId: "HD6CryOdGgYn4QJdKgs5G",
          categoryTitle: "Nikita's tasks",
          lvl: 1,
          parentCategoryId: null,
        },
        {
          categoryId: "JO8Am3bmIIOMpnbYhwsVt",
          categoryTitle: "category 2_1",
          lvl: 1,
          parentCategoryId: null,
        },
        {
          categoryId: "HD6CryOdGgYn4QJdKgs5G",
          categoryTitle: "Nikita's tasks",
          lvl: 1,
          parentCategoryId: null,
        },
        {
          categoryId: "JO8Am3bmIIOMpnbYhwsVt",
          categoryTitle: "category 2_1",
          lvl: 1,
          parentCategoryId: null,
        },
      ],
    });

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: GET_CATEGORIES_LIST,
      categoryList: [
        {
          categoryId: "HD6CryOdGgYn4QJdKgs5G",
          categoryTitle: "Nikita's tasks",
          lvl: 1,
          parentCategoryId: null,
        },
        {
          categoryId: "JO8Am3bmIIOMpnbYhwsVt",
          categoryTitle: "category 2_1",
          lvl: 1,
          parentCategoryId: null,
        },
        {
          categoryId: "HD6CryOdGgYn4QJdKgs5G",
          categoryTitle: "Nikita's tasks",
          lvl: 1,
          parentCategoryId: null,
        },
        {
          categoryId: "JO8Am3bmIIOMpnbYhwsVt",
          categoryTitle: "category 2_1",
          lvl: 1,
          parentCategoryId: null,
        },
        {
          categoryId: "zi-jOQAPVMcHdpGIXd9jk",
          categoryTitle: "test 7_3_1",
          lvl: 2,
          parentCategoryId: "zgcWQhZIDrbYzhSTGiOMC",
        },
        {
          categoryId: "5ssRmvIUcEACosuj7UfbE",
          categoryTitle: "test 7_1_2",
          lvl: 2,
          parentCategoryId: "Dxggo-RHZqSEoDByG1rB6",
        },
      ],
    });

    expect(dispatch).toHaveBeenNthCalledWith(3, {
      titleList: [
        "Nikita's tasks",
        "category 2_1",
        "Nikita's tasks",
        "category 2_1",
        "test 7_3_1",
        "test 7_1_2",
      ],
      type: GET_CATEGORIES_TITLE_LIST,
    });

  });
});
