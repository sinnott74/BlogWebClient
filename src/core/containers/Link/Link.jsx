import Link from "core/components/Link";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { closeSideNav } from "core/ducks/sidenav";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick: e => {
      dispatch(closeSideNav());
      if (ownProps.onClick) {
        ownProps.onClick();
      }
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Link)
);
