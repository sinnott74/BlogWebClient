import React from "react";
import PropTypes from "prop-types";
import Button from "react-md/lib/Buttons/Button";
import "./Toast.css";

export default class Toast extends React.Component {
  render() {
    return (
      <div
        role="alert"
        className={"toast " + (this.props.showing ? "toast__opened" : "")}
      >
        <div className="toast__message">{this.props.message}</div>
        <Button
          className="toast__button"
          icon
          onClick={this.props.handleCloseButtonClick}
          aria-label="Close Toast"
        >
          clear
        </Button>
      </div>
    );
  }
}

Toast.propTypes = {
  showing: PropTypes.bool,
  message: PropTypes.string,
  handleCloseButtonClick: PropTypes.func
};
