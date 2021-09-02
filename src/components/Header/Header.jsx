import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";

const Header = ({ task }) => {
  // const onClickEditTask = () => {
  //   setEditingTaskMode(true);
  //   setChoosenTask(task);
  // };

  return (
    <div className="Header">
      <div className="Header-title">To-Do List</div>
      <form action="" className="Header-form">
        <input
          type="text"
          placeholder="Search"
          name="search"
          className="Header-form_input"
        />
        <button className="Header-form_button" type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
};

export default Header;
