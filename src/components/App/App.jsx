import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryList from "../CategoryList/CategoryList";
import TaskList from "../TaskList/TaskList";
import EditTask from "../EditTask/EditTask";
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
    const patchTask = async (
      taskId,
      status,
      title,
      description,
      categoryId
    ) => {
      await axios({
        method: "patch",
        url: "/api/v1/task",
        data: {
          taskId,
          status,
          title,
          description,
          categoryId,
        },
      });
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
      <ProgressBar taskList={taskList} choosenCategory={choosenCategory} />
      <div className="App-lists">
        <div className="App-list">
          {!isEditingTaskMode && (
            <CreateCategory
              categoryTitleList={categoryTitleList}
              choosenCategory={choosenCategory}
              fetchCategoryList={fetchCategoryList}
            />
          )}
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
        </div>
        <div className="App-list">
          {!isEditingTaskMode && (
            <CreateTask
              choosenCategory={choosenCategory}
              setIsNewTaskCreated={setIsNewTaskCreated}
              isNewTaskCreated={isNewTaskCreated}
            />
          )}
          {!isEditingTaskMode && (
            <TaskList
              taskList={taskList}
              setEditingTaskMode={setEditingTaskMode}
              choosenCategory={choosenCategory}
              setChoosenTask={setChoosenTask}
            />
          )}
          {isEditingTaskMode && (
            <EditTask
              setEditingTaskMode={setEditingTaskMode}
              task={choosenTask}
              patchTask={patchTask}
              fetchTaskList={fetchTaskList}
              newCategoryIdForTask={newCategoryIdForTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
