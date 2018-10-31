import React from "react";
import PropTypes from "prop-types";
import Button from "react-md/lib/Buttons/Button";
import Link from "core/components/Link";

export default class CancelButton extends React.PureComponent {
  render() {
    return (
      <Link to={this.props.link}>
        <Button raised={true}>Cancel</Button>
      </Link>
    );
  }
}

CancelButton.propTypes = {
  link: PropTypes.string
};
