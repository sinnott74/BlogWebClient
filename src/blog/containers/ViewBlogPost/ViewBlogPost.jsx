import ViewBlogPost from "blog/components/ViewBlogPost";
import { connect } from "react-redux";
import { getLoggedInUserID } from "core/ducks/auth";
import { loadBlogPost, showFilteredBlogPosts } from "blog/ducks/blog";

class DataFetchingViewBlogPost extends ViewBlogPost {
  componentDidMount() {
    super.componentDidMount();
    this.props.fetchData();
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...state.blog.byId[ownProps.id],
  loggedInUserID: getLoggedInUserID(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: () => dispatch(loadBlogPost(ownProps.id)),
  onTagClick: tag => dispatch(showFilteredBlogPosts(tag))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataFetchingViewBlogPost);
