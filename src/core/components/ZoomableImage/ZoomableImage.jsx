import React from "react";
import Button from "react-md/lib/Buttons/Button";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./ZoomableImage.css";

export default class ZoomableImage extends React.Component {
  constructor() {
    super();

    this.state = {
      zoomed: false
    };

    this.ref = React.createRef();

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  render() {
    return (
      <div
        className={classnames(
          "zoomableimage",
          { "zoomableimage-fullscreen": this.state.zoomed },
          this.props.className
        )}
        tabIndex="-1"
        ref={this.ref}
        onKeyDown={this.onKeyDown}
      >
        <Button
          icon
          className="zoomableimage__button"
          tooltipLabel="Close"
          tooltipPosition="left"
          tooltipDelay={1000}
          onClick={this.onClose}
        >
          clear
        </Button>
        <img
          src={this.props.src}
          alt={this.props.alt}
          title={this.props.title}
          onClick={this.onOpen}
        />
        <div className="zoomableimage__subtext">
          <div>{this.props.title}</div>
          <div>(Click to zoom)</div>
        </div>
      </div>
    );
  }

  onKeyDown(e) {
    if (e.keyCode === 27) {
      this.onClose();
    }
  }

  onOpen() {
    this.ref.current.focus();
    this.setState({ zoomed: true });
  }

  onClose() {
    this.setState({ zoomed: false });
  }
}

ZoomableImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string
};
