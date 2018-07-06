import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

// Functional Component
const Card = props => {
  let className = "card";
  if (props.className) {
    className += " " + props.className;
  }
  return <div className={className}>{props.children}</div>;
};

Card.propTypes = {
  children: PropTypes.node
};

export default Card;
