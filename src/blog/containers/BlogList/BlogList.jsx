import BlogList from "blog/components/BlogList";
import { connect } from "react-redux";
import {
  loadBlogPosts,
  getBlogPostsSortedByCreatedByDate
} from "blog/ducks/blog";

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(loadBlogPosts())
});

const mapStateToProps = state => ({
  blogPosts: getBlogPostsSortedByCreatedByDate(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList);
