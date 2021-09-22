import React from "react";
import {
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { matchPath } from "react-router";
import CategoryList from "../CategoryList/CategoryList";
import TaskList from "../TaskList/TaskList";
import EditTask from "../EditTask/EditTask";
import TaskTable from "../TaskTable/TaskTable";

function Content() {
  const { pathname } = useLocation();

  const isTaskTable = matchPath(pathname, { path: "/tasktable" })?.isExact;

  return (
    <div className="app-lists">
      {!isTaskTable && <CategoryList />}
      <Switch>
        <Route exact path="/tasktable">
          <TaskTable />
        </Route>
        <Route path="/:category/:task/edit">
          <EditTask />
        </Route>
        <Route path="/:category">
          <TaskList />
        </Route>
        <Route path="/:category/search/:subString">
          <TaskList />
        </Route>
        <Route path="/categories/showDone=true">
          <CategoryList />
        </Route>
      </Switch>
    </div>
  );
}

export default Content;
