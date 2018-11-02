import React from "react";
import PropTypes from "prop-types";
import Button from "react-md/lib/Buttons/Button";
import "./TodoDeleteButton.css";

export default class TodoDeleteButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeleting: false
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
  }

  render() {
    const deleteContent = !this.state.isDeleting ? (
      <Button
        icon
        className="tododeletebtn-delete"
        tooltipLabel="Delete"
        tooltipPosition="left"
        tooltipDelay={1000}
        onClick={this.handleDelete}
      >
        delete
      </Button>
    ) : (
      <React.Fragment>
        <Button
          flat
          className="tododeletebtn-confirm"
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
          className="tododeletebtn-cancel"
          tooltipLabel="Cancel deletion"
          tooltipPosition="top"
          tooltipDelay={1000}
          onClick={this.handleCancelDelete}
        >
          Cancel
        </Button>
      </React.Fragment>
    );

    return <div className="tododeletebtn">{deleteContent}</div>;
  }

  handleDelete() {
    this.setState({
      isDeleting: true
    });
  }

  handleCancelDelete() {
    this.setState({
      isDeleting: false
    });
  }

  handleConfirmDelete() {
    this.props.onDelete();
  }
}

TodoDeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired
};
