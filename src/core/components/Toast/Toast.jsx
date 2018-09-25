import React from "react";
import PropTypes from "prop-types";
import Button from "react-md/lib/Buttons/Button";
import classnames from "classnames";
import "./Toast.css";

export default class Toast extends React.Component {
  render() {
    return (
      <div
        role="alert"
        className={classnames("toast", { toast__opened: this.props.showing })}
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
