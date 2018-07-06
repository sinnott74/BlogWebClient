import React from "react";
import DeleteBlogPost from "blog/containers/DeleteBlogPost";

const DeleteBlogPostPage = props => {
  document.title = "Blog";
  return <DeleteBlogPost id={props.match.params.id} />;
};

export default DeleteBlogPostPage;
