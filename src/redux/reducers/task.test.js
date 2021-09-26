import reducer from "./task";
import { setEditingTaskMode } from "../actions/task";

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    taskList: [],
    chosenTask: {},
    searchCriteria: "",
    isEditingTaskMode: false,
    newCategoryIdForTask: "",
  });
});

test("should change isEditingTaskMode flag", () => {
  const previousState = [];
  expect(reducer(previousState, setEditingTaskMode(true))).toEqual({
    isEditingTaskMode: true,
  });
});