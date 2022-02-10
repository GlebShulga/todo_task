import React, { useState, useEffect } from "react";
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

  const TASK_TABLE = "/tasktable";
  const SEARCH = 'search'
  const SUBSTRING = ":subString";
  const CATEGORY = "/:category";
  const CATEGORIES = "/categories";
  const SHOW_DONE_TRUE = "showDone=true";
  const SHOW_DONE_FALSE = "showDone=false";

  const categoryParams = matchPath(pathname, { path: CATEGORY });
  const choosenCategoryTitle = categoryParams?.params.category;
  const taskTableParams = matchPath(pathname, { path: TASK_TABLE });

  const searchParams = matchPath(pathname, {
    path: `${CATEGORY}/${SEARCH}/${SUBSTRING}`,
  });

  useEffect(() => {
    const filterParams = matchPath(pathname, {
      path: `${CATEGORIES}/${SHOW_DONE_TRUE}`,
    })?.isExact;
    if (filterParams) {
      dispatch(setIsFilterStatusDone(true));
    }
  }, []);

  const [search, setSearch] = useState(searchParams?.params.subString ?? "");

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const onChangeFilterStatusDone = (e) => {
    if (e.target.checked) {
      dispatch(setIsFilterStatusDone(true));
      history.push(`${CATEGORIES}/${SHOW_DONE_TRUE}`);
    } else {
      dispatch(setIsFilterStatusDone(false));
      history.push(`${CATEGORIES}/${SHOW_DONE_FALSE}`);
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
      history.push(`/${choosenCategoryTitle}/${SEARCH}/${search}`);
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

      {!taskTableParams?.isExact && (
        <button
          className="header-task-table_button"
          onClick={() => {
            history.push(TASK_TABLE);
          }}
          data-testid="LinkToTaskTablePageButton"
        >
          Common task list
        </button>
      )}

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
