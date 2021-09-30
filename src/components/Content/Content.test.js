import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Content from "./Content.jsx";
import { mockData } from "../../../tests/mockStore";

const middlewares = [thunk];
let mockStore;
const mockStoreConf = configureStore(middlewares);

describe("Content Component", () => {
  beforeEach(() => {
    mockStore = mockStoreConf(mockData);
  });

  it("Content snapshot", () => {
    const component = renderer.create(
      <Router>
        <Provider store={mockStore}>
          <Content />
        </Provider>
      </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
