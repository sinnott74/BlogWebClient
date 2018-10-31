import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Link = props => {
  return (
    <NavLink
      className={props.className}
      activeClassName={props.activeClassName}
      style={props.style}
      exact={props.exact}
      onClick={props.handleClick}
      title={props.title}
      to={{
        pathname: props.to,
        state: {
          from: props.location.pathname
        }
      }}
    >
      {props.children}
    </NavLink>
  );
};

export default Link;

Link.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  exact: PropTypes.bool,
  handleClick: PropTypes.func,
  title: PropTypes.string
};
