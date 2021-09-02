import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";

const Header = ({
  setIsFilterStatusDone,
  isEditingTaskMode,
  choosenTask,
  taskList,
  setSearchResultsList,
  setIsSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const results = taskList.filter((task) =>
      task.title.toLowerCase().includes(searchTerm)
    );
    setSearchResultsList(results);
  }, [searchTerm, taskList]);

  const onChangeSearch = (event) => {
    setSearchTerm(event.target.value);
    setIsSearch(true)
  };

  const onChangeFilterStatusDone = (e) => {
    e.target.checked
      ? setIsFilterStatusDone(true)
      : setIsFilterStatusDone(false);
  };

  return (
    <div className="Header">
      <div className="Header-title">
        {isEditingTaskMode ? choosenTask.title : "To-Do List"}
      </div>
      <div className="Header-filter-form">
        <div className="EditTask-status">
          <input
            type="checkbox"
            id="statusDone"
            name="statusDone"
            value={true}
            onChange={onChangeFilterStatusDone}
          />
          <label htmlFor="statusDone">Show done</label>
        </div>
        <form action="" className="Header-form">
          <input
            type="text"
            placeholder="Search"
            name="search"
            className="Header-form_input"
            value={searchTerm}
            onChange={onChangeSearch}
          />
          <button className="Header-form_button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
