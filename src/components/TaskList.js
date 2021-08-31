import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import Task from './Task'
import EditTask from './EditTask'
import "../assets/scss/TaskList.scss";

const TaskList = ({ choosenCategory, isNewTaskCreated }) => {
  const [taskList, setTaskList] = useState([]);
  const [isEditingTaskMode, setEditingTaskMode] = useState(false);
  const [choosenTask, setChoosenTask] = useState({})

    const fetchTaskList = async () => {
      await axios("/api/v1/task")
        .then((res) => {
          const data = res.data;
          setTaskList(data);
        })
        .catch((err) => console.log(err));
    };

     const patchTask = async (taskId, status, title, description) => {
       await axios({
         method: "patch",
         url: "/api/v1/category",
         data: {
           taskId,
           status,
           title,
           description,
         },
       });
     };


  useEffect(() => {
    fetchTaskList()
  }, [isNewTaskCreated]);

  return (
    <div className="TaskList">
      {isEditingTaskMode && (
        <EditTask
          setEditingTaskMode={setEditingTaskMode}
          task={choosenTask}
          patchTask={patchTask}
          fetchTaskList={fetchTaskList}
        />
      )}
      {!isEditingTaskMode &&
        taskList.filter((task) => choosenCategory.categoryId === task.categoryId).map((task) => {
          return (
            <div className="TaskTable" key={task.taskId}>
              <FontAwesomeIcon
                icon={faCheckSquare}
                className={
                  task.status === 'done'
                    ? "checkMark"
                    : "checkMark_hidden"
                }
              />
              <Task
                task={task}
                setEditingTaskMode={setEditingTaskMode}
                setChoosenTask={setChoosenTask}
              />
            </div>
          );
        })}
    </div>
  );
};

export default TaskList;
