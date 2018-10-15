import React from "react";
import PropTypes from "prop-types";
import TodoList from "todo/components/TodoList";
import TodoForm from "todo/components/TodoForm";
import "./TodoApp.css";

export default class TodoApp extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div className="todo">
        <h1 className="todo-title">Todos</h1>
        <TodoForm
          onAddTodo={this.props.onTodoAdd}
          username={this.props.username}
        />
        <TodoList
          todos={this.props.todos}
          onTodoUpdate={this.props.onTodoUpdate}
          onTodoDelete={this.props.onTodoDelete}
        />
      </div>
    );
  }
}

TodoApp.propTypes = {
  onTodoAdd: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
  onTodoUpdate: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      created_on: PropTypes.string.isRequired
    })
  )
};
