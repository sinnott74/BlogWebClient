import BlogList from "blog/components/BlogList";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  loadBlogPosts,
  getFilteredAndSortedBlogPosts,
  getFilterTags,
  addFilterTag,
  removeFilterTag,
  loadFilterTagsFromURL
} from "blog/ducks/blog";

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: () => dispatch(loadBlogPosts()),
  addFilterTag: tag => dispatch(addFilterTag(ownProps.location, tag)),
  removeFilterTag: tag => dispatch(removeFilterTag(ownProps.location, tag)),
  loadFilterTagsFromURL: () =>
    dispatch(loadFilterTagsFromURL(ownProps.location))
});

const mapStateToProps = (state, ownProps) => ({
  blogPosts: getFilteredAndSortedBlogPosts(state),
  filterTags: getFilterTags(state)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BlogList)
);
