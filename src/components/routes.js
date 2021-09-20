import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TaskList from "./TaskList/TaskList";
import EditTask from "./EditTask/EditTask";
import TaskTable from "./TaskTable/TaskTable";
import App from "./App/App";

const routes = [
  {
    path: "/search/:subString",
    component: TaskList,
  },
  {
    path: "/tasktable",
    component: TaskTable,
  },
  {
    path: "/:category/:task/edit",
    component: EditTask,
  },
  {
    path: "/:category",
    component: TaskList,
  },
];

export default function RouteConfigExample() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
