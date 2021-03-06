import React, { lazy } from "react";
import { Route, Switch, withRouter } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Spinner from "core/components/Spinner";
import AuthenticatedRoute from "core/containers/AuthenticatedRoute";
import "./Routes.css";

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
let routesConfigs = flatten(pages);

// Sort routConfigs by longest path
// Paths without variables are listed before paths with variable
routesConfigs = routesConfigs.sort((a, b) => {
  if (!a.path) {
    return 1;
  }
  if (!b.path) {
    return -1;
  }

  let aHasVariable = a.path.includes(":");
  let bHasVariable = b.path.includes(":");
  if (aHasVariable && !bHasVariable) {
    return 1;
  }

  if (!aHasVariable && bHasVariable) {
    return -1;
  }

  return b.path.length - a.path.length;
});

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
  return lazy(loader);
  // return Loadable({
  //   loader: loader,
  //   loading: Spinner
  // });
}

const Routes = props => {
  return (
    <div className="main" role="main">
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={props.location.key}
          timeout={{ enter: 150 }}
          classNames="fade"
          exit={false}
        >
          <div className="routes">
            <React.Suspense fallback={<Spinner />}>
              <Switch location={props.location}>{dynamicRoutes}</Switch>
            </React.Suspense>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default withRouter(Routes);
