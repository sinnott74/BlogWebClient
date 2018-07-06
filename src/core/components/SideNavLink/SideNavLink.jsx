import React from "react";
import PropTypes from "prop-types";
import Link from "core/components/Link";
import FontIcon from "react-md/lib/FontIcons/FontIcon";
import "./SideNavLink.css";

// Functional Component
const SideNavLink = props => {
  return (
    <Link
      exact
      to={props.to}
      className="side-nav__link"
      activeClassName="side-nav__link-active"
    >
      <FontIcon className="side-nav-link__icon">{props.icon}</FontIcon>
      <div className="side-nav-link__text">{props.children}</div>
    </Link>
  );
};

SideNavLink.propTypes = {
  to: PropTypes.string
};

export default SideNavLink;
