import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { closeSideNav } from "core/ducks/sidenav";

const Link = props => {
  return (
    <NavLink
      className={props.className}
      exact={props.exact}
      activeClassName={props.activeClassName}
      onClick={props.handleClick}
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

Link.propTypes = {
  to: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick: e => {
      dispatch(closeSideNav());
      if (ownProps.onClick) {
        ownProps.onClick();
      }
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Link));
