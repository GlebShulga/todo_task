import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Switch, StaticRouter } from "react-router-dom";
import store, { history } from "./redux";
import "./index.scss";
import App from "./components/routes";
import * as serviceWorker from './serviceWorker';

const RouterSelector = (props) =>
  typeof window !== "undefined" ? (
    <ConnectedRouter {...props} />
  ) : (
    <StaticRouter {...props} />
  );


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterSelector history={history}>
        <Switch>
          <App />
        </Switch>
      </RouterSelector>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
