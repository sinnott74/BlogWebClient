import React from "react";
import Card from "core/components/Card";
import Settings from "core/containers/Settings";

export default class SettingsPage extends React.Component {
  componentDidMount() {
    document.title = "Settings";
  }

  render() {
    return (
      <Card>
        <h1>Settings</h1>
        <Settings />
      </Card>
    );
  }
}
