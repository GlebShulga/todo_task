import React, { Component } from "react";
import { toggleTaskTable } from "../../redux/actions/category";
import { fetchTaskList } from "../../redux/actions/task";
import { connect } from "react-redux";
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

  componentWillReceiveProps(nextProps) {
    this.setState({ tasks: nextProps.tasks.taskList });
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
    console.log(this.state.tasks);
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
        <div className="task-table_button_position">
          <button
            className="task-table_button"
            onClick={() => {
              this.props.toggleTaskTable(false);
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTaskTable: () => dispatch(toggleTaskTable(false)),
    fetchTaskList: () => dispatch(fetchTaskList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);
