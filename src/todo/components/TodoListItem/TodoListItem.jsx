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
      inEdit: false,
      ...props
    };

    this.updateTodo = this.updateTodo.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleCompletedCheckboxChange = this.handleCompletedCheckboxChange.bind(
      this
    );
  }
  render() {
    const todoClasses = classnames("todo_item", {
      "todo_item-completed": this.state.completed && !this.state.inEdit
    });

    return (
      <Card
        className={todoClasses}
        onDoubleClick={() => {
          this.setState({ inEdit: true });
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
        {!this.state.inEdit && (
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
        )}
      </Card>
    );
  }

  handleDeleteClick() {
    this.props.onDelete(this.state.id);
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
    this.setState({ inEdit: false });
    this.props.onUpdate({
      id: this.state.id,
      text: this.state.text,
      username: this.state.username,
      completed: this.state.completed
    });

    // XHR to update server state
  }

  getText() {
    if (this.state.inEdit) {
      return (
        <TextField
          id={"text" + this.state.id}
          type="text"
          name="todo text"
          placeholder="todo text"
          required
          value={this.state.text}
          autoComplete="off"
          autoFocus
          onBlur={this.updateTodo}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              this.updateTodo();
            }
          }}
          onChange={(text, e) => {
            this.setState({
              ...this.state,
              text
            });
          }}
        />
      );
    } else {
      return <div className="todo_item-text">{this.state.text}</div>;
    }
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
