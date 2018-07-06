import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

/**
 * Redirected a user if isLoggedIn is not true
 */
const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
export default AuthenticatedRoute;

AuthenticatedRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};
