import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Link = props => {
  return (
    <NavLink
      className={props.className}
      activeClassName={props.activeClassName}
      style={getStyle(props)}
      exact={props.exact}
      onClick={props.handleClick}
      title={props.title}
      to={{
        pathname: props.to,
        search: props.search,
        state: {
          from: props.location.pathname
        }
      }}
    >
      {props.children}
    </NavLink>
  );
};

/**
 * Gets the style for the link. Sets pointerEvents to none if disabled prop is set.
 * @param {*} props
 */
function getStyle(props) {
  let style = props.style || {};
  if (props.disabled) {
    style.pointerEvents = "none";
  }
  return style;
}

export default Link;

Link.propTypes = {
  to: PropTypes.string.isRequired,
  search: PropTypes.string,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  exact: PropTypes.bool,
  handleClick: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.string
};
