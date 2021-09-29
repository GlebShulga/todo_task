import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import thunk from "redux-thunk";
import { mockData } from "../../../tests/mockStore";
import { SET_SEARCH_CRITERIA } from "../../redux/types/task";
import reactRouter from "react-router";
import Header from "./Header";
import { SET_IS_FILTER_STATUS_DONE } from "../../redux/types/category";

const middlewares = [thunk];
let mockStore;
const mockStoreConf = configureStore(middlewares);
const mockHistoryPush = jest.fn();

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
    const wrapper = shallow(
      <Provider store={mockStore}>
        <Header />
      </Provider>
    );
    wrapper.update();
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

  it("should apply search criteria with search text", () => {
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

  it("should apply search criteria with filter", () => {
    const searchCriteria = "task";

    React.useState = jest.fn().mockReturnValue([searchCriteria, () => {}]);
    jest
      .spyOn(reactRouter, "matchPath")
      .mockImplementation((pathname, pathObj) => ({
        params: {
          category: "category1",
        },
        isExact: true,
      }));
    const Component = (
      <Router>
        <Provider store={mockStore}>
          <Header />
        </Provider>
      </Router>
    );
    const { getByTestId } = render(Component);
    fireEvent.click(getByTestId("StatusDoneCheckBox"));
    fireEvent.change(getByTestId("HeaderFormInput"), {
      target: { value: searchCriteria },
    });
    fireEvent.click(getByTestId("SearchButton"));
    expect(mockHistoryPush).toHaveBeenCalledWith("/categories/showDone=true");
    expect(mockHistoryPush).toHaveBeenCalledWith("/category1/search/task");
    expect(mockStore.getActions()).toEqual([
      { type: SET_IS_FILTER_STATUS_DONE, data: true },
      {
        data: true,
        type: SET_IS_FILTER_STATUS_DONE,
      },
      {
        searchCriteria: searchCriteria,
        type: SET_SEARCH_CRITERIA,
      },
    ]);
    expect(mockHistoryPush).toHaveBeenCalledTimes(2);
  });
  it("should navigate to back previous page", () => {
    React.useState = jest.fn().mockReturnValue(["", () => {}]);
    const { getByTestId } = render(
      <Router>
        <Provider store={mockStore}>
          <Header />
        </Provider>
      </Router>
    );
    fireEvent.click(getByTestId("HeaderTitle"));
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith(`/`);
  });
});
