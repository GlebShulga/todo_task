import React from "react";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import renderer, { act } from "react-test-renderer";
import { shallow } from "enzyme";
import { toMatchDiffSnapshot } from "snapshot-diff";
import CreateCategory from "./CreateCategory";
import { mockData } from "../../../tests/mockStore";

expect.extend({ toMatchDiffSnapshot });

const middlewares = [thunk];
let mockStore;
const mockStoreConf = configureStore(middlewares);

describe("CreateCategory Component", () => {
  beforeEach(() => {
    mockStore = mockStoreConf(mockData)
  });

  it("renders CreateCategory without crashing", () => {
    shallow(
      <Router>
        <Provider store={mockStore}>
          <CreateCategory />
        </Provider>
      </Router>
    );
  });

  it("CreateCategory snapshot", () => {
    const component = renderer.create(
      <Router>
        <Provider store={mockStore}>
          <CreateCategory />
        </Provider>
      </Router>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    act(() => {
      component.root.findAllByType("button")[0].props.onClick();
    });
    const treeUpdate = component.toJSON();
    expect(tree).toMatchDiffSnapshot(treeUpdate);
  });
});
