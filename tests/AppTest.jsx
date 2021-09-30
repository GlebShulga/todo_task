import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { history } from "../src/redux";
import store from "../src/redux";

const AppTest = ({ children }) => {
  return (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
};

export default AppTest;
