import React from "react";
import {
  Switch,
  Route,
  StaticRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "../redux";
// import TaskList from "./TaskList/TaskList";
// import EditTask from "./EditTask/EditTask";
// import CategoryList from "./CategoryList/CategoryList";
import TaskTable from "./TaskTable/TaskTable";
import App from "./App/App";

const RouterSelector = (props) =>
  typeof window !== "undefined" ? (
    <ConnectedRouter {...props} />
  ) : (
    <StaticRouter {...props} />
  );

const routes = [
  {
    path: "/:category/search/:subString",
    component: App,
  },
  {
    path: "/categories/showDone=true",
    component: App,
  },
  {
    path: "/tasktable",
    component: TaskTable,
  },
  {
    path: "/:category/:task/edit",
    component: App,
  },
  {
    path: "/:category",
    component: App,
  },
];

export default function RouteConfig() {
  return (
    <Provider store={store}>
      <RouterSelector history={history}>
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
      </RouterSelector>
    </Provider>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}
