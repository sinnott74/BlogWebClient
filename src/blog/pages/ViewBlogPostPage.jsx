import React from "react";
import PropTypes from "prop-types";
import ViewBlogPost from "blog/containers/ViewBlogPost";
import Helmet from "react-helmet";

const ViewBlogPostPage = props => {
  console.log();
  return (
    <React.Fragment>
      <Helmet>
        <link
          rel="canonical"
          href={`https://${window.location.hostname}/blog/${
            props.match.params.id
          }`}
        />
      </Helmet>
      <ViewBlogPost id={props.match.params.id} showActions />
    </React.Fragment>
  );
};

ViewBlogPostPage.propTypes = {
  id: PropTypes.number
};

export default ViewBlogPostPage;
