import App from "core/components/App";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { isDarkTheme } from "core/ducks/settings";
import { isLoggedIn } from "core/ducks/auth";

const mapStateToProps = state => ({
  darkTheme: isDarkTheme(state),
  isLoggedIn: isLoggedIn(state)
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(App)
);
