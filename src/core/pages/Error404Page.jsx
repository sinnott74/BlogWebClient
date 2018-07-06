import React from "react";
import Card from "core/components/Card";

export default class Error404Page extends React.Component {
  componentDidMount() {
    document.title = "404 - Not Found";
  }

  render() {
    return (
      <Card>
        <h1>404</h1>
        <p>Sorry that page couldn't be found... :/</p>
      </Card>
    );
  }
}
