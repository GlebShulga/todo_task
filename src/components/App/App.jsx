import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryList from "../CategoryList/CategoryList";
import TaskList from "../TaskList/TaskList";
import CreateCategory from "../CreateCategory/CreateCategory";
import CreateTask from "../CreateTask/CreateTask";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./App.scss";

function App() {
  const [choosenCategory, setChoosenCategory] = useState("");
  const [isNewTaskCreated, setIsNewTaskCreated] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [rootCategories, setRootCategories] = useState([]);
  const [isEditingTaskMode, setEditingTaskMode] = useState(false);
  const [choosenTask, setChoosenTask] = useState({});
  const [newCategoryIdForTask, setNewCategoryIdForTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const fetchCategoryList = async () => {
    await axios("/api/v1/category")
      .then((res) => {
        const data = res.data;
        setCategoryList(data);
        setRootCategories(data.filter((el) => el.parentCategoryId === null));
      })
      .catch((err) => console.log(err));
  };

  const fetchTaskList = async () => {
    await axios("/api/v1/task")
      .then((res) => {
        const data = res.data;
        setTaskList(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  useEffect(() => {
    fetchTaskList();
  }, [isNewTaskCreated]);

  const categoryTitleList = categoryList.map(
    (category) => category.categoryTitle
  );

  return (
    <div className="App">
      <ProgressBar
        taskList={taskList}
        choosenCategory={choosenCategory}
      />
      <div className="App-lists">
        <CreateCategory
          categoryTitleList={categoryTitleList}
          choosenCategory={choosenCategory}
          fetchCategoryList={fetchCategoryList}
        />
        <CreateTask
          choosenCategory={choosenCategory}
          setIsNewTaskCreated={setIsNewTaskCreated}
          isNewTaskCreated={isNewTaskCreated}
        />
      </div>
      <div className="App-lists">
        <CategoryList
          categoryTitleList={categoryTitleList}
          setChoosenCategory={setChoosenCategory}
          choosenCategory={choosenCategory}
          categoryList={categoryList}
          fetchCategoryList={fetchCategoryList}
          rootCategories={rootCategories}
          isEditingTaskMode={isEditingTaskMode}
          choosenTask={choosenTask}
          setNewCategoryIdForTask={setNewCategoryIdForTask}
        />
        <TaskList
          taskList={taskList}
          fetchTaskList={fetchTaskList}
          isEditingTaskMode={isEditingTaskMode}
          setEditingTaskMode={setEditingTaskMode}
          choosenCategory={choosenCategory}
          isNewTaskCreated={isNewTaskCreated}
          setChoosenTask={setChoosenTask}
          choosenTask={choosenTask}
          newCategoryIdForTask={newCategoryIdForTask}
        />
      </div>
    </div>
  );
}

export default App;
