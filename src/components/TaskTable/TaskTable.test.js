import React from "react";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import renderer, {act} from "react-test-renderer";
import { shallow } from "enzyme";
import { toMatchDiffSnapshot } from "snapshot-diff";
import TaskTable from "./TaskTable";

expect.extend({toMatchDiffSnapshot});

const middlewares = [thunk];
let mockStore;
const mockStoreConf = configureStore(middlewares);

  describe("TaskTable Component", () => {
    beforeEach(() => {
      mockStore = mockStoreConf({
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

    it("renders TaskTable without crashing", () => {
    shallow(
      <Router>
        <Provider store={mockStore}>
          <TaskTable />
        </Provider>
      </Router>
    );
    });

    it("TaskTable snapshot", () => {
      const component = renderer
        .create(
          <Router>
            <Provider store={mockStore}>
              <TaskTable />
            </Provider>
          </Router>
        )
        const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
      act(() => {
        component.root.findAllByType('button')[0].props.onClick()
      })
          const treeUpdate = component.toJSON();
          expect(tree).toMatchDiffSnapshot(treeUpdate);
    });
  });
