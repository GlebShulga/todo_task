import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";

const Header = ({
  setIsFilterStatusDone,
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
        <div className="header-title" to="/">
          To-Do List
        </div>
        <div className="header-filter_form">
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
            <button className="header-form_button" disabled>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </form>
        </div>
    </div>
  );
};

export default Header;
