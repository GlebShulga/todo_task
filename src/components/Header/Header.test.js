import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import thunk from "redux-thunk";
import { mockData } from "../../../tests/mockStore";
import { setSearchCriteria } from "../../redux/actions/task";
import { SET_SEARCH_CRITERIA } from "../../redux/types/task";
import Header from "./Header";

const middlewares = [thunk];
let mockStore;
const mockStoreConf = configureStore(middlewares);
const mockHistoryPush = jest.fn();

jest.mock("../../redux/actions/task", () => ({
  ...jest.requireActual("../../redux/actions/task"),
  setSearchCriteria: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("<Header/>", () => {
  beforeEach(() => {
    mockStore = mockStoreConf(mockData);
  });

  it("should render Header Component", () => {
    shallow(
      <Provider store={mockStore}>
        <Header />
      </Provider>
    );
  });

  it("Header snapshot", () => {
    const component = renderer.create(
      <Router>
        <Provider store={mockStore}>
          <Header />
        </Provider>
      </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should push to TaskTable component", () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={mockStore}>
          <Header />
        </Provider>
      </Router>
    );

    fireEvent.click(getByTestId("LinkToTaskTablePageButton"));
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith(`/tasktable`);
  });

  it("should apply search criteria", () => {
    let mockFn;
    setSearchCriteria.mockImplementationOnce((callback) => {
      mockFn = jest.fn((dispatch) => {
        dispatch({
          type: SET_SEARCH_CRITERIA,
          searchCriteria: "task",
        });
      });
      return mockFn;
    });

    const myInitialState = "task";

    React.useState = jest.fn().mockReturnValue([myInitialState, {}]);

    const { getByTestId } = render(
      <Router>
        <Provider store={mockStore}>
          <Header />
        </Provider>
      </Router>
    );

    fireEvent.click(getByTestId("SearchButton"));

    expect(mockStore.getActions()).toEqual([
      {
        type: SET_SEARCH_CRITERIA,
        searchCriteria: "task",
      },
    ]);
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  });
});
