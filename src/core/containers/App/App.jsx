import App from "core/components/App";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { isDarkTheme } from "core/ducks/settings";

const mapStateToProps = state => ({
  darkTheme: isDarkTheme(state)
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(App)
);
