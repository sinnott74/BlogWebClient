import React from "react";
import PropTypes from "prop-types";
import "./Spinner.css";

const Spinner = props => {
  const size = props.size || 48;

  return (
    <div className="loader">
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <circle className="spinner" cx="16" cy="16" r="14" fill="none" />
      </svg>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.number
};

export default Spinner;
