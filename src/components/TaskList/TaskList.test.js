import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import TaskList from "./TaskList.jsx";
import { mockData } from "../../../tests/mockStore";

const middlewares = [thunk];
let mockStore;
const mockStoreConf = configureStore(middlewares);

describe("CategoryList Component", () => {
  beforeEach(() => {
    mockStore = mockStoreConf(mockData);
  });

  it("TaskList snapshot", () => {
    const component = renderer.create(
      <Router>
        <Provider store={mockStore}>
          <TaskList />
        </Provider>
      </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


});
