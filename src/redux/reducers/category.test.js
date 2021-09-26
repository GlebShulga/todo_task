import reducer from "./category";
import {
  setIsFilterStatusDone,
  setIsCreateTaskModalOpen,
} from "../actions/category";

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    categoryList: [],
    rootCategoryList: [],
    categoryTitleList: [],
    chosenCategory: {},
    isFilterStatusDone: false,
    isCreateTaskModalOpen: false,
  });
});

test("should change IsFilterStatusDone flag", () => {
  const previousState = [];
  expect(reducer(previousState, setIsFilterStatusDone(true))).toEqual({
    isFilterStatusDone: true,
  });
});

test("should change IsCreateTaskModalOpen flag", () => {
  const previousState = [];
  expect(reducer(previousState, setIsCreateTaskModalOpen(true))).toEqual({
    isCreateTaskModalOpen: true,
  });
});
