import React, { Component } from "react";
import axios from "axios";
import "./TaskTable.scss";

class TaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      tasks: [],
    };
  }

  renderTableHeader() {
    return (
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
      </tr>
    );
  }

  renderTableData() {
    return this.state.tasks.map((task) => {
      const { taskId, title, description, status } = task;
      return (
        <tr key={taskId}>
          <td>{title}</td>
          <td>{description}</td>
          <td>{status}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h1 className="title">Tasks Table</h1>
        <table className="tasks-table">
          <tbody>
            {this.renderTableHeader()}
            {this.renderTableData()}
          </tbody>
        </table>
        <p className="fetching">
          {this.state.isFetching ? "Fetching tasks..." : ""}
        </p>
      </div>
    );
  }
  componentDidMount() {
    this.fetchTasks();
  }

  async fetchTasksAsync() {
    try {
      this.setState({ ...this.state, isFetching: true });
      const response = await axios.get("/api/v1/task");
      this.setState({ tasks: response.data, isFetching: false });
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, isFetching: false });
    }
  }

  fetchTasks = this.fetchTasksAsync;
}

export default TaskTable;
