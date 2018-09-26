import React from "react";
import { Route, Switch } from "react-router";
import Loadable from "react-loadable";
import Spinner from "core/components/Spinner";
import AuthenticatedRoute from "core/containers/AuthenticatedRoute";

/**
 * Import all route pages
 * @param {Array} Array of require contexts which map to a route config file
 */
function importAll(r) {
  return r.keys().map(item => {
    return r(item).default;
  });
}
// Relative to Src, recursively look for all files that match **/pages/pages.js
const pages = importAll(
  require.context("../../../", true, /.+\/pages\/pages.js/)
);

/**
 * Flattens an array with a depth of 1
 * @param {Array} array
 */
function flatten(array) {
  return array.reduce((accumulator, currentValue) => {
    return accumulator.concat(currentValue);
  }, []);
}

/**
 * Combine the page configurations
 */
const routesConfigs = flatten(pages);

// const pageRouteConfigs = routesConfigs.filter(routeConfig => {
//   return !routeConfig.modal;
// });

/**
 * Creates a React-Router route for each configured route
 */
const dynamicRoutes = routesConfigs.map((routeConfig, index) => {
  let component = getLoadableComponent(routeConfig.loader);

  const routeProps = {
    path: routeConfig.path,
    exact: routeConfig.exact
  };

  let route;
  if (routeConfig.authenticated) {
    route = (
      <AuthenticatedRoute key={index} {...routeProps} component={component} />
    );
  } else {
    route = <Route key={index} {...routeProps} component={component} />;
  }

  return route;
});

/**
 * Creates a loadable component
 * @param {} loader
 */
function getLoadableComponent(loader) {
  return Loadable({
    loader: loader,
    loading: Spinner
  });
}

const Routes = props => {
  return (
    <div className="main" role="main">
      <Switch>{dynamicRoutes}</Switch>
    </div>
  );
};

export default Routes;
