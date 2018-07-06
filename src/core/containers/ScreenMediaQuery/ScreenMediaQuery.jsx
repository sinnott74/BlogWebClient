import ScreenMediaQuery from "core/components/ScreenMediaQuery";
import { connect } from "react-redux";
import { largeScreen } from "core/ducks/screen";

const mapDispatchToProps = {
  onMatch: largeScreen
};

export default connect(null, mapDispatchToProps)(ScreenMediaQuery);
