import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import RouteConfig from "./components/routes";
import * as serviceWorker from "./serviceWorker";

const target = document.getElementById("root");

ReactDOM.render(<RouteConfig />, target);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
