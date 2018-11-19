import Pagination from "core/components/Pagination";
import { connect } from "react-redux";
import { withRouter } from "react-router";

/**
 * Reads the page number from the location. Defaults to 1 if it doesn't exist.
 * @param {Location} location
 */
function getPage(location) {
  return Number(new URLSearchParams(location.search).get("page")) || 1;
}

const mapStateToProps = (state, ownProps) => ({
  page: getPage(ownProps.location)
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Pagination)
);
