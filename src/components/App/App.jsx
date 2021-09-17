import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryList from "../CategoryList/CategoryList";
import TaskList from "../TaskList/TaskList";
import EditTask from "../EditTask/EditTask";
import CreateCategory from "../CreateCategory/CreateCategory";
import CreateTask from "../CreateTask/CreateTask";
import ProgressBar from "../ProgressBar/ProgressBar";
import Header from "../Header/Header";
import TaskTable from "../TaskTable/TaskTable";
import "./App.scss";
import { fetchCategoryList } from "../../redux/actions/category";
import { fetchTaskList } from "../../redux/actions/task";

function App() {
  const dispatch = useDispatch();
  const { isEditingTaskMode } = useSelector((s) => s.task);
    const { isOpenTaskTable } =
      useSelector((s) => s.category);

  useEffect(() => {
    dispatch(fetchCategoryList());
    dispatch(fetchTaskList());
  }, []);

  return (
    <div className="app">
      <Header />
      {!isOpenTaskTable &&
      <>
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
      </>}
      {isOpenTaskTable && <TaskTable />}
    </div>
  );
}

export default App;
