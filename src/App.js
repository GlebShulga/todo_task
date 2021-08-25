import React, { useState } from "react";
import CategoryList from './CategoryList'
import TaskList from "./TaskList";
import './assets/scss/App.scss';

function App() {
const [choosenCategoryId, setChoosenCategoryId] = useState("");

  return (
    <div className="App">
      <CategoryList
        setChoosenCategoryId={setChoosenCategoryId}
        choosenCategoryId={choosenCategoryId}
      />
      <TaskList choosenCategoryId={choosenCategoryId} />
    </div>
  );
}

export default App;
