import React from "react";
import TodoApp from "todo/containers/TodoApp";

export default class TodoPage extends React.Component {
  componentDidMount() {
    document.title = "Todos";
  }

  render() {
    return <TodoApp />;
  }
}
