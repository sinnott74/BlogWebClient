import OptionsMenu from "core/components/OptionsMenu";
import { connect } from "react-redux";
import { closeOptionsMenu, isOpened } from "core/ducks/optionsMenu";
import { isLoggedIn } from "core/ducks/auth";

const mapStateToProps = state => ({
  opened: isOpened(state),
  loggedIn: isLoggedIn(state)
});

const mapDispatchToProps = {
  handleScrimClick: closeOptionsMenu,
  handleItemClick: closeOptionsMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsMenu);
