import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import ProgressBar from "./ProgressBar";

let mockStore;
const mockStoreConf = configureStore([]);

describe("ProgressBar Component", () => {
  beforeEach(() => {
    mockStore = mockStoreConf({
      category: { isFilterStatusDone: false },
      task: {
        taskList: [
          {
            categoryId: "3",
            taskId: "1",
            title: "Just do it",
            description: "bla",
            status: "new",
            _createdAt: 1630474050422,
          },
          {
            categoryId: "3",
            taskId: "2",
            title: "Do it one more time",
            status: "new",
            description: "",
            _createdAt: 1630474050402,
          },
        ],
      },
    });
  });
  it("should render ProgressBar Component", () => {
    shallow(
      <Provider store={mockStore}>
        <ProgressBar />
      </Provider>
    );
  });

  it("ProgressBar snapshot", () => {
    const component = renderer.create(
      <Router>
        <Provider store={mockStore}>
          <ProgressBar />
        </Provider>
      </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
