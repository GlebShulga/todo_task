import React, { useEffect, useState } from "react";
import axios from "axios";
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
        taskList.map((task) => {
          return choosenCategory.categoryId === task.categoryId ? (
            <div className="TaskTable" key={task.taskId}>
              <input
                type="checkbox"
                id="status"
                name="status"
                className=""
                // checked={data.status === done ?? false}
                // value={data.read_only ?? false}
                // onChange={""}
              />
              <Task
                task={task}
                setEditingTaskMode={setEditingTaskMode}
                setChoosenTask={setChoosenTask}
              />
            </div>
          ) : null;
        })}
    </div>
  );
};

export default TaskList;
