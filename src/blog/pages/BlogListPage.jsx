import React from "react";
import BlogList from "blog/containers/BlogList";

export default class BlogListPage extends React.Component {
  componentDidMount() {
    document.title = "Blog";
  }

  render() {
    return <BlogList />;
  }
}
