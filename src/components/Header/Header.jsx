import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";

const Header = ({
  setIsFilterStatusDone,
  isEditingTaskMode,
  choosenTask,
  setSearchCriteria,
  searchCriteria,
  setIsSearch,
}) => {

  const onChangeSearch = (event) => {
    setSearchCriteria(event.target.value);
    setIsSearch(true);
  };

  const onChangeFilterStatusDone = (e) => {
    e.target.checked
      ? setIsFilterStatusDone(true)
      : setIsFilterStatusDone(false);
  };

  return (
    <div className="header">
      <div className="header-title">
        {isEditingTaskMode ? choosenTask.title : "To-Do List"}
      </div>
      {!isEditingTaskMode && (
        <div className="header-filter-form">
          <div className="status">
            <input
              type="checkbox"
              id="statusDone"
              name="statusDone"
              value={true}
              onChange={onChangeFilterStatusDone}
            />
            <label htmlFor="statusDone">Show done</label>
          </div>
          <form action="" className="header-form">
            <input
              type="text"
              placeholder="Search"
              name="search"
              className="header-form_input"
              value={searchCriteria}
              onChange={onChangeSearch}
            />
            <button className="header-form_button">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Header;
