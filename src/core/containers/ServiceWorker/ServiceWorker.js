import { connect } from "react-redux";
import { showToast } from "core/ducks/toast";
import ServiceWorker from "core/components/ServiceWorker";

const mapDispatchToProps = {
  handleMessage: showToast
};

export default connect(null, mapDispatchToProps)(ServiceWorker);
