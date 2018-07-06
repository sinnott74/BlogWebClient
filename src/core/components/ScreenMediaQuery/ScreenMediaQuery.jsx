import React from "react";
import PropTypes from "prop-types";

export default class ScreenMediaQuery extends React.Component {
  componentDidMount() {
    if (!window.matchMedia) return;
    this.mediaQueryList = window.matchMedia(this.props.mediaQuery);
    this._onMatch = this._onMatch.bind(this);
    this.mediaQueryList.addListener(this._onMatch);
    this._onMatch(this.mediaQueryList);
  }

  componentWillUnmount() {
    this.mediaQueryList && this.mediaQueryList.removeListener(this._onMatch);
  }

  render() {
    return null;
  }

  _onMatch(mediaQueryList) {
    if (mediaQueryList.matches) {
      this.props.onMatch();
    }
  }
}

ScreenMediaQuery.propTypes = {
  onMatch: PropTypes.func.isRequired
};
