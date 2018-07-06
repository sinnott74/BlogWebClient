import React from "react";
import PropTypes from "prop-types";

// Functional Component
const Icon = props => {
  return (
    <img
      src={props.img}
      alt={props.alt}
      title={props.alt}
      className={props.className}
    />
  );
};

export default Icon;

Icon.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
};
