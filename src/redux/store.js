import { configureStore } from "@reduxjs/toolkit";
import category from "./reducers/category";
import task from "./reducers/task"

export const store = configureStore({
  reducer: {
    category,
    task
  },
});
