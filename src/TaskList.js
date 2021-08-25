import React, { useEffect, useState } from "react";
import axios from "axios";
import editIcon from "./assets/images/editIcon.svg";
import "./assets/scss/TaskList.scss";

const TaskList = ({ choosenCategoryId }) => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    axios("/api/v1/task")
      .then((res) => {
        const data = res.data;
        console.log(data, "data");
        setTaskList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // const statuses = ["new", "in progress", "done"];

  // const [activeStatus, setActiveStatus] = useState("all");

  return (
    <div className="TaskList">
      {taskList.map((task) => {
        return (
          choosenCategoryId === task.categoryId ?
          <div className="Task">
            <input
              type="checkbox"
              id="read_only"
              name="read_only"
              className=""
              // checked={data.read_only ?? false}
              // value={data.read_only ?? false}
              onChange={""}
            />
            <div key={task.taskId} className="Task-title">
              {task.title}
            </div>
            <img src={editIcon} className="Task-Edit_icon" alt="edit icon" />
          </div>
         : null
        );
      })}
    </div>
  );
};

export default TaskList;
