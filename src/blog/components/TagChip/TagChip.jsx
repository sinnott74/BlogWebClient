import React from "react";
import PropTypes from "prop-types";
import Chip from "react-md/lib/Chips/Chip";
import "./TagChip.css";

export default class TagChip extends React.PureComponent {
  render() {
    return (
      <Chip
        removable={this.props.removable}
        label={this.props.tag}
        onClick={this.handleRemove}
      />
    );
  }

  handleRemove = () => {
    this.props.onClick && this.props.onClick(this.props.tag);
  };
}

TagChip.propTypes = {
  tag: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  removable: PropTypes.bool
};
