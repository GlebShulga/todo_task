import React from "react";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import renderer, { act } from "react-test-renderer";
import { shallow } from "enzyme";
import { toMatchDiffSnapshot } from "snapshot-diff";
import EditTask from "./EditTask";
import { mockData } from "../../../tests/mockStore";

expect.extend({ toMatchDiffSnapshot });

const middlewares = [thunk];
let mockStore;
const mockStoreConf = configureStore(middlewares);

describe("EditTask Component", () => {
  beforeEach(() => {
    mockStore = mockStoreConf(mockData);
  });

  it("renders EditTask without crashing", () => {
    shallow(
      <Router>
        <Provider store={mockStore}>
          <EditTask />
        </Provider>
      </Router>
    );
  });

  it("EditTask snapshot", () => {
    const component = renderer.create(
      <Router>
        <Provider store={mockStore}>
          <EditTask />
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
