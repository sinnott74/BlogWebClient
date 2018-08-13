import BlogList from "blog/components/BlogList";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  loadBlogPosts,
  getBlogPostsSortedByCreatedByDate,
  getFilterTags,
  addFilterTag,
  removeFilterTag
} from "blog/ducks/blog";

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: () => dispatch(loadBlogPosts()),
  getFilterTags: location => dispatch(getFilterTags(ownProps.location)),
  addFilterTag: tag => dispatch(addFilterTag(ownProps.location, tag)),
  removeFilterTag: tag => dispatch(removeFilterTag(ownProps.location, tag))
});

const mapStateToProps = (state, ownProps) => ({
  blogPosts: getBlogPostsSortedByCreatedByDate(state),
  filterTags: state.blog.filterTags
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BlogList)
);
