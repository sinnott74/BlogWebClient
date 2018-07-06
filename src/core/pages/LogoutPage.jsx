import React from "react";
import { connect } from "react-redux";
import { logout } from "core/ducks/auth";
import { Redirect } from "react-router";

class LogoutPage extends React.Component {
  componentDidMount(props) {
    this.props.handleLogout();
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to={this._getRedirectUrl()} />;
    }
  }

  _getRedirectUrl() {
    var { from } = this.props.location.state || { from: { pathname: "/" } };
    let forwardUrl = from;
    return forwardUrl;
  }
}

const mapDispatchToProps = {
  handleLogout: logout
};

export default connect(null, mapDispatchToProps)(LogoutPage);
