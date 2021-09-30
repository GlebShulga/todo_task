import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { matchPath } from "react-router";
import {
  setIsFilterStatusDone,
  updateChosenCategory,
} from "../../redux/actions/category";
import {
  setSearchCriteria,
  setEditingTaskMode,
} from "../../redux/actions/task";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFilterStatusDone } = useSelector((s) => s.category);
  const { pathname } = useLocation();

  const categoryParams = matchPath(pathname, { path: "/:category" });
  const choosenCategoryTitle = categoryParams?.params.category;

  const searchParams = matchPath(pathname, {
    path: "/:category/search/:subString",
  });

  useEffect(() => {
    const filterParams = matchPath(pathname, {
      path: "/categories/showDone=true",
    })?.isExact;
    if (filterParams) {
      dispatch(setIsFilterStatusDone(true));
    }
  }, []);

  const [search, setSearch] = React.useState(
    searchParams?.params.subString ?? ""
  );

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const onChangeFilterStatusDone = (e) => {
    if (e.target.checked) {
      dispatch(setIsFilterStatusDone(true));
      history.push("/categories/showDone=true");
    } else {
      dispatch(setIsFilterStatusDone(false));
      history.push("/categories/showDone=false");
    }
  };

  const onClickReturnToStartPage = () => {
    history.push(`/`);
    dispatch(updateChosenCategory({}));
    dispatch(setEditingTaskMode(false));
    dispatch(setIsFilterStatusDone(false));
  };

  const onClickSearch = () => {
    if (search.length > 0) {
      dispatch(setSearchCriteria(search));
      history.push(`/${choosenCategoryTitle}/search/${search}`);
    }
  };

  return (
    <div className="header" data-test="headerComponent">
      <button
        className="header-title"
        data-testid="HeaderTitle"
        onClick={onClickReturnToStartPage}
      >
        To-Do List
      </button>

      <button
        className="header-task-table_button"
        onClick={() => {
          history.push(`/tasktable`);
        }}
        data-testid="LinkToTaskTablePageButton"
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
            checked={isFilterStatusDone}
            data-testid="StatusDoneCheckBox"
          />
          <label htmlFor="statusDone">Show done</label>
        </div>
        <div className="header-form">
          <input
            type="text"
            placeholder="Search"
            name="search"
            className="header-form_input"
            value={search}
            onChange={onChangeSearch}
            data-testid="HeaderFormInput"
          />
          <button
            className="header-form_button"
            onClick={onClickSearch}
            data-testid="SearchButton"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);
