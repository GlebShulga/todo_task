import React, { Component } from "react";
import { fetchTaskList } from "../../redux/actions/task";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./TaskTable.scss";

class TaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks.taskList,
    };
  }
  componentDidMount() {
    this.props.fetchTaskList();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tasks !== prevState.tasks) {
      return ({ tasks: nextProps.tasks.taskList });
    }
    return null;
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
      <div className="width">
        <div className="task-table_button_position">
          <button
            className="task-table_button"
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            X
          </button>
        </div>
        <h1 className="title">Tasks Table</h1>
        <table className="tasks-table">
          <tbody>
            {this.renderTableHeader()}
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.task,
  category: state.category
});

const mapDispatchToProps = (dispatch) => ({
    fetchTaskList: () => dispatch(fetchTaskList()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskTable));
