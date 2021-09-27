import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Task from "./Task.jsx";
import { mockData } from "../../../tests/mockStore";

const middlewares = [thunk];
let mockStore;
const mockStoreConf = configureStore(middlewares);
const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    category: "test-category",
  }),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("Task Component", () => {
  let props;
  beforeEach(() => {
    mockStore = mockStoreConf(mockData);
    props = {
      task: {
        categoryId: "3",
        taskId: "1",
        title: "Just do it",
        description: "bla",
        status: "new",
      },
    };
  });

  it("Category snapshot", () => {
    const component = renderer.create(
      <Router>
        <Provider store={mockStore}>
          <Task {...props} />
        </Provider>
      </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

    it("should redirect to edit task on edit button click", () => {
      const { root } = renderer.create(
        <Router>
          <Provider store={mockStore}>
            <Task {...props} />
          </Provider>
        </Router>
      );

      root.findByType("button").props.onClick();

      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
      expect(mockHistoryPush).toHaveBeenCalledWith(
        "/test-category/Just do it/edit"
      );
    });
});
