import Settings from "core/components/Settings";
import { connect } from "react-redux";
import { isDarkTheme, toggleDarkTheme } from "core/ducks/settings";

const mapStateToProps = state => ({
  darkTheme: isDarkTheme(state)
});

const mapDispatchToProps = {
  handleDarkThemeChange: toggleDarkTheme
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
