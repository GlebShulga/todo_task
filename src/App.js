import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryList from "./components/CategoryList";
import TaskList from "./components/TaskList";
import CreateCategory from "./components/CreateCategory";
import CreateTask from "./components/CreateTask";
import "./assets/scss/App.scss";

function App() {
  const [choosenCategory, setChoosenCategory] = useState("");
  const [isCategoryListUpdated, setIsCategoryListUpdated] = useState(false);
  const [isNewTaskCreated, setIsNewTaskCreated] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
   await axios("/api/v1/category")
      .then((res) => {
        const data = res.data;
        setCategoryList(data);
      })
      .catch((err) => console.log(err));
  };

    useEffect(() => {
      fetchCategoryList();
    }, [isCategoryListUpdated]);

  const categoryTitleList = categoryList.map(
    (category) => category.categoryTitle
  );

  return (
    <div className="App">
      <div className="App-lists">
        <CreateCategory
          categoryTitleList={categoryTitleList}
          choosenCategory={choosenCategory}
          setIsCategoryListUpdated={setIsCategoryListUpdated}
          fetchCategoryList={fetchCategoryList}
        />
        <CreateTask
          choosenCategory={choosenCategory}
          setIsNewTaskCreated={setIsNewTaskCreated}
          isCategoryListUpdated={isCategoryListUpdated}
        />
      </div>
      <div className="App-lists">
        <CategoryList
          categoryTitleList={categoryTitleList}
          setChoosenCategory={setChoosenCategory}
          choosenCategory={choosenCategory}
          isCategoryListUpdated={isCategoryListUpdated}
          setIsCategoryListUpdated={setIsCategoryListUpdated}
          categoryList={categoryList}
          fetchCategoryList={fetchCategoryList}
        />
        <TaskList
          choosenCategory={choosenCategory}
          isNewTaskCreated={isNewTaskCreated}
        />
      </div>
    </div>
  );
}

export default App;
