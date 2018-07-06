import React from "react";
import PropTypes from "prop-types";
import Button from "react-md/lib/Buttons/Button";
import CircularProgress from "react-md/lib/Progress/CircularProgress";
import "./SubmittButton.css";

export default class SubmitButton extends React.PureComponent {
  render() {
    return <div className="submit-button">{this._getButton()}</div>;
  }

  _getButton() {
    if (!this.props.isSubmitting) {
      return (
        <Button
          raised={true}
          primary
          type="submit"
          onClick={this.props.onClick}
        >
          {this.props.children}
        </Button>
      );
    } else {
      return (
        <Button
          raised={true}
          primary
          type="submit"
          disabled
          iconEl={<CircularProgress id="loadingProgress" />}
        >
          {this.props.children}
        </Button>
      );
    }
  }
}

SubmitButton.propTypes = {
  isSubmitting: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};
