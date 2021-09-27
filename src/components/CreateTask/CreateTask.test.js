import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";
import store from "../../redux";
import { UPDATE_CHOSEN_CATEGORY } from "../../redux/types/category";
import CreateTask from "./CreateTask";
import AppTest from "../../../tests/AppTest";

jest.mock("axios");

describe("<CreateTask />", () => {
  it("should validate task category", () => {
    const { getByTestId, getByText } = render(
      <AppTest>
        <CreateTask />
      </AppTest>
    );

    fireEvent.click(getByTestId("AddTaskButton"));
    expect(getByText("Please, choose category")).toBeTruthy();
  });

  it("should validate task title minlength", () => {
    store.dispatch({
      type: UPDATE_CHOSEN_CATEGORY,
      chosenCategory: { categoryId: 1 },
    });

    const { getByTestId, getByText } = render(
      <AppTest>
        <CreateTask />
      </AppTest>
    );

    fireEvent.change(getByTestId("AddTaskInputField"), {
      target: { value: "" },
    });
    fireEvent.click(getByTestId("AddTaskButton"));

    const error = "The task length must not be shorter than 3 characters";
    expect(getByText(error)).toBeTruthy();
  });

  it("should add new task on click event", () => {
    axios.mockResolvedValue({});

    store.dispatch({
      type: UPDATE_CHOSEN_CATEGORY,
      chosenCategory: { categoryId: 1 },
    });

    const { getByTestId } = render(
      <AppTest>
        <CreateTask />
      </AppTest>
    );

    fireEvent.change(getByTestId("AddTaskInputField"), {
      target: { value: "This is a demo task" },
    });
    fireEvent.click(getByTestId("AddTaskButton"));

    expect(axios).toHaveBeenCalledWith({
      data: {
        categoryId: 1,
        title: "This is a demo task",
      },
      method: "post",
      url: "/api/v1/task",
    });
  });
});