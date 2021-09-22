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
        <Route exact path="/tasktable" component={TaskTable} />
        <Route path="/:category/:task/edit" component={EditTask}/>
        <Route path="/:category" component={TaskList}/>
        <Route path="/:category/search/:subString" component={TaskList}/>
        <Route path="/categories/showDone=true" component={CategoryList}/>
      </Switch>
    </div>
  );
}

export default Content;
