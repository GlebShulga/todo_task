import React from "react";
import { render } from "@testing-library/react";
import store from "../../redux";
import { ADD_TASK } from "../../redux/types/task";
import { UPDATE_CHOSEN_CATEGORY } from "../../redux/types/category";
import ProgressBar from "./ProgressBar";
import AppTest from "../../../tests/AppTest";

describe("<ProgressBar />", () => {
  it("should render component with default progress value 100", () => {
    const { getByTestId } = render(
      <AppTest>
        <ProgressBar />
      </AppTest>
    );

    const progressBar = getByTestId("ProgressBar");
    expect(progressBar.value).toBe(100);
  });

  it("should render component with progress value", () => {
    store.dispatch({
      type: ADD_TASK,
      taskList: [
        { categoryId: 1, status: "done" },
        { categoryId: 1, status: "done" },
        { categoryId: 1, status: "new" },
        { categoryId: 1, status: "new" },
      ],
    });

    store.dispatch({
      type: UPDATE_CHOSEN_CATEGORY,
      chosenCategory: { categoryId: 1 },
    });

    const { getByTestId } = render(
      <AppTest>
        <ProgressBar />
      </AppTest>
    );

    const progressBar = getByTestId("ProgressBar");
    expect(progressBar.value).toBe(50);
  });
});
