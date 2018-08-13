import AuthenticatedRoute from "core/components/AuthenticatedRoute";
import { connect } from "react-redux";
import { isLoggedIn } from "core/ducks/auth";

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: isLoggedIn(state)
});

export default connect(
  mapStateToProps,
  null
)(AuthenticatedRoute);
