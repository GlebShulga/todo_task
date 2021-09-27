import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Category from "./Category.jsx";
import {mockData} from "../../../tests/mockStore";

jest.mock("../../redux/actions/category", () => ({
  ...jest.requireActual("../../redux/actions/category"),
  renameCategory: jest.fn(),
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

});
