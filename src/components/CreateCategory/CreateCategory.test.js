import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";
import store from "../../redux";
import { GET_CATEGORIES_TITLE_LIST } from "../../redux/types/category";
import CreateCategory from "./CreateCategory";
import AppTest from "../../../tests/AppTest";

jest.mock("axios");

describe("<CreateCategory />", () => {
  it("should validate category", () => {
    const { getByTestId, getByText } = render(
      <AppTest>
        <CreateCategory />
      </AppTest>
    );

    fireEvent.click(getByTestId("AddCategoryButton"));
    const error = "The task length must not be shorter than 3 characters";
    expect(getByText(error)).toBeTruthy();
  });

  it("should add new category on click event", () => {
    axios.mockResolvedValue({});

    store.dispatch({
      type: GET_CATEGORIES_TITLE_LIST,
      titleList: ["category_1", "category_2"],
    });

    const { getByTestId } = render(
      <AppTest>
        <CreateCategory />
      </AppTest>
    );

    fireEvent.change(getByTestId("AddCategoryInputField"), {
      target: { value: "Demo category" },
    });
    fireEvent.click(getByTestId("AddCategoryButton"));

    expect(axios).toHaveBeenCalledWith({
      data: {
        categoryTitle: "Demo category",
        parentCategoryId: null,
        lvl: 0,
      },
      method: "post",
      url: "/api/v1/category/:categoryTitle",
    });
  });
});
