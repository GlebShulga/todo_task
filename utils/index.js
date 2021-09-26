import { applyMiddleware, createStore } from "redux";
import rootReducer from "./../src/redux/reducers"
import { middleware } from "../src/redux";

export const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const testStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};
