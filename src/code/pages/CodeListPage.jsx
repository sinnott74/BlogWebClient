import React from "react";
import CodeList from "code/components/CodeList";

export default class CodeListPage extends React.Component {
  constructor() {
    super();
    this.codeList = [
      {
        name: "Pong",
        description:
          "Very simple implementation of everyone's favourite game of two dimensional tennis in the browser",
        url: "http://sinnott74.github.io/pong"
      },
      {
        name: "Speech Recoginition",
        description: "Playing around with HTML5's Speech Recoginition API",
        url: "http://sinnott74.github.io/Speech-Recognition"
      }
    ];
  }

  componentDidMount() {
    document.title = "Code";
  }

  render() {
    return <CodeList codeList={this.codeList} />;
  }
}
