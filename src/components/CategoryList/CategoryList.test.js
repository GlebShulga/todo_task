import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import CategoryList from "./CategoryList.jsx";
import { mockData } from "../../../tests/mockStore";

const middlewares = [thunk];
let mockStore;
const mockStoreConf = configureStore(middlewares);

describe("CategoryList Component", () => {
  beforeEach(() => {
    mockStore = mockStoreConf(mockData);
  });

  it("CategoryList snapshot", () => {
    const component = renderer.create(
      <Router>
        <Provider store={mockStore}>
          <CategoryList />
        </Provider>
      </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
