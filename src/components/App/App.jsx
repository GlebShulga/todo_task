import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryList from "../CategoryList/CategoryList";
import TaskList from "../TaskList/TaskList";
import EditTask from "../EditTask/EditTask";
import CreateCategory from "../CreateCategory/CreateCategory";
import CreateTask from "../CreateTask/CreateTask";
import ProgressBar from "../ProgressBar/ProgressBar";
import Header from "../Header/Header";
import "./App.scss";
import { fetchCategoryList } from "../../redux/actions/category";
import { fetchTaskList } from "../../redux/actions/task";

function App() {
  const dispatch = useDispatch();
  const { isEditingTaskMode } = useSelector((s) => s.task);

  useEffect(() => {
    dispatch(fetchCategoryList());
    dispatch(fetchTaskList());
  }, []);

  return (
    <div className="app">
      <Header />
      <ProgressBar />
      <div className="app-lists">
        <div className="app-list">
          <CreateCategory />
          <CategoryList />
        </div>
        <div className="app-list">
          <CreateTask />
          {!isEditingTaskMode && <TaskList />}
          {isEditingTaskMode && <EditTask />}
        </div>
      </div>
    </div>
  );
}

export default React.memo(App);
