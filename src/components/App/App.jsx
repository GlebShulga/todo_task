import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CreateCategory from "../CreateCategory/CreateCategory";
import CreateTask from "../CreateTask/CreateTask";
import ProgressBar from "../ProgressBar/ProgressBar";
import Header from "../Header/Header";
import Content from "../Content/Content";
import { fetchCategoryList } from "../../redux/actions/category";
import { fetchTaskList } from "../../redux/actions/task";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoryList());
    dispatch(fetchTaskList());
  }, []);

  return (
    <div className="app">
      <Header />
      <ProgressBar />
      <div className="app-lists app-lists_padding">
        <CreateCategory />
        <CreateTask />
      </div>
      <Content />
    </div>
  );
}

export default React.memo(App);
