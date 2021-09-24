import React from "react";
import { Switch, Route } from "react-router-dom";
import CategoryList from "../CategoryList/CategoryList";
import TaskList from "../TaskList/TaskList";
import EditTask from "../EditTask/EditTask";
import TaskTable from "../TaskTable/TaskTable";

function Content() {
  return (
    <div className="app-lists">
      <Switch>
        <Route exact path="/tasktable" component={TaskTable} />
        <Route path="/" component={CategoryList} />
      </Switch>
      <Route exact path="/:category/search/:subString" component={TaskList} />
      <Route exact path="/:category" component={TaskList} />
      <Route path="/:category/:task/edit" component={EditTask} />
    </div>
  );
}

export default Content;
