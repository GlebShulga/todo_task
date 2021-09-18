import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import createHistory from "./history";

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];


const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  rootReducer(history),
  initialState,
  composedEnhancers
);

export default store;
