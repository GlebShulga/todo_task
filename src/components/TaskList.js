import React, { useEffect, useState } from "react";
import axios from "axios";
import editIcon from "../assets/images/editIcon.svg";
import "../assets/scss/TaskList.scss";

const TaskList = ({ choosenCategory, isNewTaskCreated }) => {
  const [taskList, setTaskList] = useState([]);

    const fetchTaskList = async () => {
      await axios("/api/v1/task")
        .then((res) => {
          const data = res.data;
          setTaskList(data);
        })
        .catch((err) => console.log(err));
    };

  useEffect(() => {
    fetchTaskList()
  }, [isNewTaskCreated]);

  return (
    <div className="TaskList">
      {taskList.map((task) => {
        return choosenCategory.categoryId === task.categoryId ? (
          <div className="Task" key={task.taskId}>
            <input
              type="checkbox"
              id="status"
              name="status"
              className=""
              // checked={data.status === done ?? false}
              // value={data.read_only ?? false}
              // onChange={""}
            />
            <div key={task.taskId} className="Task-title">
              {task.title}
            </div>
            <img src={editIcon} className="Task-Edit_icon" alt="edit icon" />
          </div>
        ) : null;
      })}
    </div>
  );
};

export default TaskList;
