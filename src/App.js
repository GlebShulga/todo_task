import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryList from "./components/CategoryList";
import TaskList from "./components/TaskList";
import CreateCategory from "./components/CreateCategory";
import CreateTask from "./components/CreateTask";
import ProgressBar from "./components/ProgressBar";
import "./assets/scss/App.scss";

function App() {
  const [choosenCategory, setChoosenCategory] = useState("");
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
  }, []);

  const categoryTitleList = categoryList.map(
    (category) => category.categoryTitle
  );

  const completed = 70

  return (
    <div className="App">
      <ProgressBar completed={completed} />
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
