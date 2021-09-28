import React from "react";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { render, fireEvent } from "@testing-library/react";
import renderer, { act } from "react-test-renderer";
import { shallow } from "enzyme";
import { toMatchDiffSnapshot } from "snapshot-diff";
import EditTask from "./EditTask";
import { mockData } from "../../../tests/mockStore";
import { setEditingTaskMode } from "../../redux/actions/task";
import { SET_EDITING_TASK_MODE } from "../../redux/types/task";

expect.extend({ toMatchDiffSnapshot });

const mockHistoryPush = jest.fn();

const middlewares = [thunk];
let mockStore;
const mockStoreConf = configureStore(middlewares);

jest.mock("../../redux/actions/task", () => ({
  ...jest.requireActual("../../redux/actions/task"),
  setEditingTaskMode: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

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

  it("should click on Cancel Button", () => {
    let mockFn;
    setEditingTaskMode.mockImplementationOnce((callback) => {
      mockFn = jest.fn((dispatch) => {
        dispatch({
          type: SET_EDITING_TASK_MODE,
          isEditingTaskMode: false,
        });
      });
      return mockFn;
    });

    const { getByTestId } = render(
      <Router>
        <Provider store={mockStore}>
          <EditTask />
        </Provider>
      </Router>
    );

    fireEvent.click(getByTestId("CancelChangesButton"));

    expect(mockStore.getActions()).toEqual([
      {
        type: SET_EDITING_TASK_MODE,
        isEditingTaskMode: false,
      },
    ]);
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  });
});
