import React from "react";
import PropTypes from "prop-types";
import Link from "core/containers/Link";
import "./HeaderLayout.css";
import Button from "react-md/lib/Buttons/Button";

export default class HeaderLayout extends React.PureComponent {
  render() {
    return (
      <div className="header-layout">
        <div className="header" role="banner">
          <Button
            icon
            className="header__menu"
            tooltipLabel="Menu"
            tooltipPosition="right"
            tooltipDelay={1000}
            onClick={this.props.handleMenuButtonClick}
          >
            menu
          </Button>
          <h1 className="header__titlecontainer">
            <Link to={"/"} className="header__titletext">
              {this.props.title}
            </Link>
          </h1>
          <Button
            icon
            className="header__options"
            tooltipLabel="Options"
            tooltipPosition="left"
            tooltipDelay={1000}
            onClick={this.props.handleOptionsButtonClick}
          >
            more_vert
          </Button>
        </div>
        <div className="header-layout_main">{this.props.children}</div>
      </div>
    );
  }
}

HeaderLayout.propTypes = {
  title: PropTypes.string.isRequired,
  handleMenuButtonClick: PropTypes.func.isRequired,
  handleOptionsButtonClick: PropTypes.func.isRequired
};
