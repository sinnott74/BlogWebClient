import React from "react";
import PropTypes from "prop-types";
import Button from "react-md/lib/Buttons/Button";
import DialogContainer from "react-md/lib/Dialogs/DialogContainer";
import classnames from "classnames";
import "./TodoAdd.css";
import TodoForm from "../TodoForm/TodoForm";

export default class TodoAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddingTodo: false,
      pageX: null,
      pageY: null
    };

    this.handleAddDialogHide = this.handleAddDialogHide.bind(this);
    this.handleAddTodoClick = this.handleAddTodoClick.bind(this);
    this.handleScrimClick = this.handleScrimClick.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  render() {
    const todoAddClassName = classnames("todoadd", {
      "todoadd-adding": this.state.isAddingTodo
    });
    return (
      <div className={todoAddClassName}>
        <div className="todoadd-scrim" onClick={this.handleScrimClick} />
        <DialogContainer
          dialogClassName="todoadd-dialog"
          visible={this.state.isAddingTodo}
          pageX={this.state.pageX}
          pageY={this.state.pageY}
          focusOnMount={false}
          fullPage
          onHide={this.handleAddDialogHide}
        >
          <TodoForm
            onAddTodo={this.handleAddTodo}
            username={this.props.username}
          />
        </DialogContainer>
        <Button
          className="todoadd-fab"
          floating
          primary
          onClick={this.handleAddTodoClick}
        >
          add
        </Button>
      </div>
    );
  }

  handleAddTodoClick(e) {
    const { pageX, pageY } = e;

    this.setState({
      isAddingTodo: !this.state.isAddingTodo,
      pageX,
      pageY
    });
  }

  handleAddDialogHide() {
    this.setState({
      isAddingTodo: false
    });
  }

  handleScrimClick(e) {
    this.handleAddDialogHide();
  }

  handleAddTodo(todo) {
    this.props.onTodoAdd(todo);
    this.handleAddDialogHide();
  }
}

TodoAdd.propTypes = {
  username: PropTypes.string.isRequired,
  onTodoAdd: PropTypes.func.isRequired
};
