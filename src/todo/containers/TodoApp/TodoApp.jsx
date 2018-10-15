import TodoApp from "todo/components/TodoApp";
import { connect } from "react-redux";
import {
  loadTodos,
  deleteTodo,
  editTodo,
  addTodo,
  getTodosSortedByCreatedByDate
} from "todo/ducks/todo";
import { getLoggedInUsername } from "core/ducks/auth";

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: () => dispatch(loadTodos()),
  onTodoDelete: id => dispatch(deleteTodo(id)),
  onTodoUpdate: todo => dispatch(editTodo(todo)),
  onTodoAdd: todo => dispatch(addTodo(todo))
});

const mapStateToProps = (state, ownProps) => ({
  todos: getTodosSortedByCreatedByDate(state),
  username: getLoggedInUsername(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp);
