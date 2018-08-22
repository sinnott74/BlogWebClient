import { connect } from "react-redux";
import { addBlogPost } from "blog/ducks/blog";
import { getLoggedInUserID, getLoggedInUsername } from "core/ducks/auth";
import BlogEditor from "blog/components/BlogEditor";

const mapStateToProps = (state, ownProps) => ({
  blogpost: {
    title: "",
    user_id: getLoggedInUserID(state)
  },
  isSubmitting: state.blog.isLoading,
  username: getLoggedInUsername(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSave: blogpost => dispatch(addBlogPost(blogpost))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogEditor);
