import React from "react";
import PropTypes from "prop-types";
import "./Settings.css";
import Switch from "react-md/lib/SelectionControls/Switch";

export default class Settings extends React.Component {
  render() {
    return (
      <div className="settings">
        <Switch
          id="darkTheme"
          type="switch"
          label="Dark theme"
          name="darkTheme"
          labelBefore
          checked={this.props.darkTheme}
          onChange={this.props.handleDarkThemeChange}
        />
      </div>
    );
  }
}

Settings.propTypes = {
  darkTheme: PropTypes.bool,
  handleDarkThemeChange: PropTypes.func.isRequired
};
