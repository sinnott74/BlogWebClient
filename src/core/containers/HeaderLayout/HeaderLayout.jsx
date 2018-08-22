import HeaderLayout from "core/components/HeaderLayout";
import { connect } from "react-redux";
import { openSideNav } from "core/ducks/sidenav";
import { toggleOptionsMenu } from "core/ducks/optionsMenu";

const mapDispatchToProps = {
  handleMenuButtonClick: openSideNav,
  handleOptionsButtonClick: toggleOptionsMenu
};

export default connect(
  null,
  mapDispatchToProps
)(HeaderLayout);
