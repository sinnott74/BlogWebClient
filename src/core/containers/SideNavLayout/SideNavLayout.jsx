import SideNavLayout from "core/components/SideNavLayout";
import { connect } from "react-redux";
import { openSideNav, closeSideNav, isOpened } from "core/ducks/sidenav";

const mapStateToProps = state => ({
  opened: isOpened(state)
});

const mapDispatchToProps = {
  openSideNav,
  closeSideNav
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNavLayout);
