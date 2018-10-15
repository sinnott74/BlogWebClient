import React from "react";
import PropTypes from "prop-types";
import TodoListItem from "todo/components/TodoListItem";
import "./TodoList.css";

export default class TodoList extends React.Component {
  render() {
    const todos = this.props.todos.map(todo => {
      return (
        <TodoListItem
          key={todo.id}
          {...todo}
          onDelete={this.props.onTodoDelete}
          onUpdate={this.props.onTodoUpdate}
        />
      );
    });
    return <div className="todolist">{todos}</div>;
  }
}

TodoList.propTypes = {
  onTodoDelete: PropTypes.func.isRequired,
  onTodoUpdate: PropTypes.func.isRequired,
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
