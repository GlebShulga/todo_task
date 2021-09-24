import { combineReducers } from 'redux'
import { connectRouter } from "connected-react-router";
import category from "./category";
import task from "./task"

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    category,
    task,
  });

export default createRootReducer;