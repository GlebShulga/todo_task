import React from "react";
import renderer, {act} from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { toMatchDiffSnapshot } from "snapshot-diff";
import App from "./App.jsx";
import { mockData } from "../../../tests/mockStore";

const middlewares = [thunk];
let mockStore;
const mockStoreConf = configureStore(middlewares);


describe("App Component", () => {
  beforeEach(() => {
    mockStore = mockStoreConf(mockData);
  });

  it("App snapshot", () => {
    const component = renderer.create(
      <Router>
        <Provider store={mockStore}>
          <App />
        </Provider>
      </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
