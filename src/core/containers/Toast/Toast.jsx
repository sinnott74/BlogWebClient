import Toast from "core/components/Toast";
import { connect } from "react-redux";
import { hideToast, isShowing, getMessage } from "core/ducks/toast";

const mapStateToProps = state => ({
  showing: isShowing(state),
  message: getMessage(state)
});

const mapDispatchToProps = {
  handleCloseButtonClick: hideToast
};

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
