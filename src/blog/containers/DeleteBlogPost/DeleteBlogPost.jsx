import { connect } from "react-redux";
import { deleteBlogPost } from "blog/ducks/blog";
import DeleteBlogPost from "blog/components/DeleteBlogPost";

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDeleteButtonClick: () => dispatch(deleteBlogPost(ownProps.id))
});

export default connect(null, mapDispatchToProps)(DeleteBlogPost);
