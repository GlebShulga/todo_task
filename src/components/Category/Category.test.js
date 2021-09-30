import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Category from "./Category.jsx";
import {
  updateChosenCategory,
  delCategory,
} from "../../redux/actions/category";
import {
  UPDATE_CHOSEN_CATEGORY,
  DEL_CATEGORY,
} from "../../redux/types/category";

import { mockData } from "../../../tests/mockStore";

jest.mock("axios");

const mockHistoryPush = jest.fn();

jest.mock("../../redux/actions/category", () => ({
  ...jest.requireActual("../../redux/actions/category"),
  updateChosenCategory: jest.fn(),
  delCategory: jest.fn(),
  setIsCreateTaskModalOpen: jest.fn(),
  renameCategory: jest.fn(),
}));

jest.mock("../../redux/actions/task", () => ({
  ...jest.requireActual("../../redux/actions/task"),
  setNewCategoryIdForTask: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const middlewares = [thunk];
let mockStore;
const mockStoreConf = configureStore(middlewares);

describe("<Category />", () => {
  let props;
  beforeEach(() => {
    mockStore = mockStoreConf(mockData);
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

  it("should render icons", () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={mockStore}>
          <Category {...props} />
        </Provider>
      </Router>
    );
    expect(getByTestId("faCheckSquare")).toBeInTheDocument();
    expect(getByTestId("faTrashAlt")).toBeInTheDocument();
    expect(getByTestId("faPlus")).toBeInTheDocument();
  });

  it("should choose category", () => {
    let mockFn;
    updateChosenCategory.mockImplementationOnce((callback) => {
      mockFn = jest.fn((dispatch) => {
        dispatch({
          type: UPDATE_CHOSEN_CATEGORY,
          chosenCategory: props.category,
        });
      });
      return mockFn;
    });

    const { getByTestId } = render(
      <Router>
        <Provider store={mockStore}>
          <Category {...props} />
        </Provider>
      </Router>
    );

    fireEvent.click(getByTestId("ChooseCategoryButton"));

    expect(mockStore.getActions()).toEqual([
      {
        type: UPDATE_CHOSEN_CATEGORY,
        chosenCategory: props.category,
      },
    ]);
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith(
      `/${props.category.categoryTitle}`
    );
  });

  it("should delete category", () => {
    let mockFn;
    delCategory.mockImplementationOnce((callback) => {
      mockFn = jest.fn((dispatch) => {
        dispatch({
          type: DEL_CATEGORY,
          categoryList: mockData.category.categoryList,
        });
      });
      return mockFn;
    });

    const { getByTestId } = render(
      <Router>
        <Provider store={mockStore}>
          <Category {...props} />
        </Provider>
      </Router>
    );

    fireEvent.click(getByTestId("DelCategoryButton"));

    expect(mockStore.getActions()).toEqual([
      {
        type: DEL_CATEGORY,
        categoryList: mockData.category.categoryList,
      },
    ]);
  });
});
