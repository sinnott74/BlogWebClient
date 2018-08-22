import React from "react";
import BlogList from "../containers/BlogList";

export default class ListBlogPostPage extends React.Component {
  componentDidMount() {
    document.title = "Blog";
  }

  render() {
    return <BlogList />;
  }
}
