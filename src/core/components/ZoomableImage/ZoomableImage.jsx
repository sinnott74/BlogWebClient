import React from "react";
import Button from "react-md/lib/Buttons/Button";
import FontIcon from "react-md/lib/FontIcons/FontIcon";
import classnames from "classnames";
import PropTypes from "prop-types";
import LazyImage from "core/components/LazyImage";
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

    this.imgRef = React.createRef();
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
        <Button className="zoomableimage__button" onClick={this.onClose}>
          <div className="zoomableimage__buttoninner">
            <FontIcon inherit>clear</FontIcon>
            <span>esc</span>
          </div>
        </Button>
        <LazyImage
          src={this.props.src}
          alt={this.props.alt}
          title={this.props.title}
          onClick={this.onOpen}
          ref={this.imgRef}
          className="zoomableimage__image"
        />
        <div className="zoomableimage__subtext">
          <div>{this.props.title}</div>
          <div className="zoomableimage__clickzoomtext">(Click to zoom)</div>
        </div>
      </div>
    );
  }

  // FLIP technique
  componentDidUpdate(prevProps) {
    if (this.state.zoomed) {
      console.log(this.ref.current.getBoundingClientRect());
    }
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
