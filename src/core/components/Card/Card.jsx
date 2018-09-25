import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./Card.css";

// Functional Component
const Card = props => {
  return (
    <div className={classnames("card", props.className)}>{props.children}</div>
  );
};

Card.propTypes = {
  children: PropTypes.node
};

export default Card;
