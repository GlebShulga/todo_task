import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsFilterStatusDone,
  setIsOpenTaskTable,
} from "../../redux/actions/category";
import { setIsSearch, setSearchCriteria } from "../../redux/actions/task";

const Header = () => {
  const dispatch = useDispatch();
  const { searchCriteria } = useSelector((s) => s.task);

  const onChangeSearch = (event) => {
    dispatch(setSearchCriteria(event.target.value));
    dispatch(setIsSearch(true));
  };

  const onChangeFilterStatusDone = (e) => {
    e.target.checked
      ? dispatch(setIsFilterStatusDone(true))
      : dispatch(setIsFilterStatusDone(false));
  };

  return (
    <div className="header">
      <div className="header-title" to="/">
        To-Do List
      </div>
      <button
        className="header-task-table_button"
        onClick={() => {
          dispatch(setIsOpenTaskTable(true));
        }}
      >
        Task table button
      </button>
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
