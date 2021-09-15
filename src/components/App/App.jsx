import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CategoryList from "../CategoryList/CategoryList";
import TaskList from "../TaskList/TaskList";
import EditTask from "../EditTask/EditTask";
import CreateCategory from "../CreateCategory/CreateCategory";
import CreateTask from "../CreateTask/CreateTask";
import ProgressBar from "../ProgressBar/ProgressBar";
import Header from "../Header/Header";
import "./App.scss";
import { catListWithDoneFlag } from "./helpers";

function App() {
  const [choosenCategory, setChoosenCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [rootCategories, setRootCategories] = useState([]);
  const [isEditingTaskMode, setEditingTaskMode] = useState(false);
  const [choosenTask, setChoosenTask] = useState({});
  const [newCategoryIdForTask, setNewCategoryIdForTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isFilterStatusDone, setIsFilterStatusDone] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [isSearch, setIsSearch] = useState(false);

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
  const patchTask = async (taskId, status, title, description, categoryId) => {
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
    })
      .then((res) => {
        const data = res.data;
        setTaskList(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCategoryList();
    fetchTaskList();
  }, []);

  const categoryListWithDoneFlag = useMemo(
    () => catListWithDoneFlag(taskList, categoryList),
    [taskList, categoryList]
  );

  const categoryTitleList = categoryList.map(
    (category) => category.categoryTitle
  );

    useEffect(() => {
      if (isFilterStatusDone) {
        setRootCategories(
          categoryListWithDoneFlag.filter(
            (el) => el.parentCategoryId === null && el.isAllTasksDone
          )
        );
      } else {
        setRootCategories(
          categoryList.filter((el) => el.parentCategoryId === null)
        );
      }
    }, [categoryList, categoryListWithDoneFlag, isFilterStatusDone]);

  return (
    <div className="app">
      <Header
        setIsFilterStatusDone={setIsFilterStatusDone}
        isEditingTaskMode={isEditingTaskMode}
        choosenTask={choosenTask}
        setSearchCriteria={setSearchCriteria}
        searchCriteria={searchCriteria}
        setIsSearch={setIsSearch}
      />
      <ProgressBar taskList={taskList} choosenCategory={choosenCategory} />
      <div className="app-lists">
        <div className="app-list">
          <CreateCategory
            categoryTitleList={categoryTitleList}
            choosenCategory={choosenCategory}
            setCategoryList={setCategoryList}
            setRootCategories={setRootCategories}
          />
          <CategoryList
            categoryTitleList={categoryTitleList}
            setChoosenCategory={setChoosenCategory}
            choosenCategory={choosenCategory}
            categoryList={categoryList}
            rootCategories={rootCategories}
            isEditingTaskMode={isEditingTaskMode}
            choosenTask={choosenTask}
            setNewCategoryIdForTask={setNewCategoryIdForTask}
            setCategoryList={setCategoryList}
            setRootCategories={setRootCategories}
          />
        </div>
        <div className="app-list">
          <CreateTask
            choosenCategory={choosenCategory}
            setTaskList={setTaskList}
          />
          {!isEditingTaskMode && (
            <TaskList
              taskList={taskList}
              setEditingTaskMode={setEditingTaskMode}
              setChoosenTask={setChoosenTask}
              isFilterStatusDone={isFilterStatusDone}
              searchCriteria={searchCriteria}
              isSearch={isSearch}
              categoryList={categoryList}
              isEditingTaskMode={isEditingTaskMode}
              choosenCategory={choosenCategory}
            />
          )}
          {isEditingTaskMode && (
            <EditTask
              setEditingTaskMode={setEditingTaskMode}
              task={choosenTask}
              patchTask={patchTask}
              newCategoryIdForTask={newCategoryIdForTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
