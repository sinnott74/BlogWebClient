import React from "react";
import PropTypes from "prop-types";
import OptionsMenuItem from "core/components/OptionsMenuItem";
import classnames from "classnames";
import "./OptionsMenu.css";

export default class OptionsMenu extends React.Component {
  render() {
    this.setDocumentScroll();
    return (
      <div
        className={classnames("options-menu", {
          "options-menu__opened": this.props.opened
        })}
      >
        <div className="options-scrim" onClick={this.props.handleScrimClick} />
        <aside
          className={classnames("options-view", {
            "options-view__animate": this.props.opened
          })}
        >
          {this._getLogOptionItem()}
        </aside>
      </div>
    );
  }

  setDocumentScroll() {
    if (this.props.opened) {
      document.body.classList.add("noscroll");
    } else {
      document.body.classList.remove("noscroll");
    }
  }

  _getLogOptionItem() {
    if (!this.props.loggedIn) {
      return (
        <OptionsMenuItem to="/login" onClick={this.props.handleItemClick}>
          Login
        </OptionsMenuItem>
      );
    } else {
      return (
        <OptionsMenuItem to="/logout" onClick={this.props.handleItemClick}>
          Log Out
        </OptionsMenuItem>
      );
    }
  }
}

OptionsMenu.propTypes = {
  opened: PropTypes.bool.isRequired,
  handleScrimClick: PropTypes.func.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  logggIn: PropTypes.bool
};
