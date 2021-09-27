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
});
