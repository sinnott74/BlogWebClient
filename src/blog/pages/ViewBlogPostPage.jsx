import React from "react";
import PropTypes from "prop-types";
import ViewBlogPost from "blog/containers/ViewBlogPost";

const ViewBlogPostPage = props => {
  return <ViewBlogPost id={props.match.params.id} showActions />;
};

ViewBlogPostPage.propTypes = {
  id: PropTypes.number
};

export default ViewBlogPostPage;
