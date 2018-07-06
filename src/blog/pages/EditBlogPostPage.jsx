import React from "react";
import EditBlogPost from "blog/containers/EditBlogPost";

const EditBlogPostPage = props => {
  document.title = "Blog";
  return <EditBlogPost id={props.match.params.id} />;
};

export default EditBlogPostPage;
