import React from "react";
import PropTypes from "prop-types";
import Card from "core/components/Card";
import TextField from "react-md/lib/TextFields/TextField";
import Button from "react-md/lib/Buttons/Button";
import "./TodoForm.css";

export default class TodoForm extends React.Component {
  constructor() {
    super();

    this.state = { text: "" };

    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleUpdateText = this.handleUpdateText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <Card className="todoform">
        <form className="todoform_form" onSubmit={this.handleSubmit}>
          <TextField
            id={"text" + this.state.id}
            type="text"
            name="Todotext"
            placeholder="What do you have to do?"
            required
            value={this.state.text}
            autoComplete="off"
            autoFocus
            maxLength={100}
            onChange={this.handleUpdateText}
          />
          <Button
            icon
            className="todo-addbtn"
            tooltipLabel="Add Todo"
            tooltipPosition="left"
            tooltipDelay={1000}
            onClick={this.handleAddTodo}
          >
            add
          </Button>
        </form>
      </Card>
    );
  }

  handleUpdateText(text, e) {
    if (text.length >= 100) {
      return;
    }
    this.setState({
      text
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleAddTodo();
  }

  handleAddTodo() {
    this.props.onAddTodo({
      text: this.state.text,
      username: this.props.username
    });
    this.setState({ text: "" });
  }
}

TodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};
