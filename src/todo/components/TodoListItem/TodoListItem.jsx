import React from "react";
import PropTypes from "prop-types";
import Card from "core/components/Card";
import Checkbox from "react-md/lib/SelectionControls/Checkbox";
import Button from "react-md/lib/Buttons/Button";
import TextField from "react-md/lib/TextFields/TextField";
import classnames from "classnames";
import "./TodoListItem.css";

export default class TodoListItem extends React.Component {
  constructor(props) {
    super();

    this.state = {
      isEditing: false,
      isDeleting: false,
      ...props
    };

    this.updateTodo = this.updateTodo.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCompletedCheckboxChange = this.handleCompletedCheckboxChange.bind(
      this
    );
  }
  render() {
    const todoClasses = classnames("todo_item", {
      "todo_item-completed": this.state.completed && !this.state.isEditing
    });

    return (
      <Card
        className={todoClasses}
        onDoubleClick={() => {
          this.setState({ isEditing: true });
        }}
      >
        <Checkbox
          id={"completedCheckBox-" + this.state.id}
          className="todo_item-completechkbox"
          name="Completed"
          aria-label="Todo completed"
          checked={this.state.completed}
          onChange={this.handleCompletedCheckboxChange}
        />
        {this.getText()}
        {!this.state.isEditing && this.getDelete()}
      </Card>
    );
  }

  handleDeleteClick() {
    this.setState({
      isDeleting: true
    });
  }

  handleCompletedCheckboxChange(value, e) {
    this.setState(
      {
        completed: value
      },
      this.updateTodo
    );
  }

  updateTodo() {
    this.setState({ isEditing: false });
    this.props.onUpdate({
      id: this.state.id,
      text: this.state.text,
      username: this.state.username,
      completed: this.state.completed,
      created_on: this.state.created_on
    });
  }

  getText() {
    if (this.state.isEditing) {
      return (
        <TextField
          id={"text" + this.state.id}
          type="text"
          name="todo text"
          placeholder="todo text"
          required
          value={this.state.text}
          autoComplete="off"
          maxLength={100}
          autoFocus
          onBlur={this.updateTodo}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              this.updateTodo();
            }
          }}
          onChange={this.handleTextChange}
        />
      );
    } else {
      return <div className="todo_item-text">{this.state.text}</div>;
    }
  }

  getDelete() {
    if (!this.state.isDeleting) {
      return (
        <Button
          icon
          className="todo_item-deletebtn"
          tooltipLabel="Delete"
          tooltipPosition="left"
          tooltipDelay={1000}
          onClick={this.handleDeleteClick}
        >
          delete
        </Button>
      );
    } else {
      return (
        <React.Fragment>
          <Button
            flat
            className="todo_item-confirmdeletebtn"
            tooltipLabel="Confirm deletion"
            tooltipPosition="top"
            tooltipDelay={1000}
            onClick={this.handleConfirmDelete}
          >
            Confirm
          </Button>
          <span>or</span>
          <Button
            flat
            className="todo_item-canceldeletebtn"
            tooltipLabel="Cancel deletion"
            tooltipPosition="top"
            tooltipDelay={1000}
            onClick={this.handleCancelDelete}
          >
            Cancel
          </Button>
        </React.Fragment>
      );
    }
  }

  handleCancelDelete() {
    this.setState({
      isDeleting: false
    });
  }

  handleConfirmDelete() {
    this.props.onDelete(this.state.id);
  }

  handleTextChange(text, e) {
    if (text.length >= 100) {
      return;
    }
    this.setState({
      text
    });
  }
}

TodoListItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  created_on: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};
