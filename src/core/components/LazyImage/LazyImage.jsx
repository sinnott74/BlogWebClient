import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./LazyImage.css";

import { ReactComponent as Placeholder } from "./placeholder.svg";

const defaultHeightToWidthRatio = 0.5;

/**
 * Image which loads its source when scrolled into view
 */
export default class LazyImage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      load: true,
      loaded: true,
      showInitial: false,
    };

    this.imgRef = React.createRef();
    this.onLazyLoad = this.onLazyLoad.bind(this);
    this.onLazyImageFadeInEnd = this.onLazyImageFadeInEnd.bind(this);

    // IntersectionObserver exists, lazy load image
    if (window.IntersectionObserver) {
      this.intersectionCallback = this.intersectionCallback.bind(this);
      this.observer = new IntersectionObserver(this.intersectionCallback);
      this.state.load = false;
      this.state.loaded = false;
      this.state.showInitial = true;
    }
  }

  componentDidMount() {
    if (this.observer) {
      this.observer.observe(this.imgRef.current);
    }
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  render() {
    const containerStyle = {
      ...this.props.style,
      paddingTop: this.calculateHeight(),
    };

    const className = classnames("LazyImage", this.props.className, {
      "LazyImage-loaded": this.state.loaded,
    });

    return (
      <div
        className={className}
        style={containerStyle}
        onClick={this.props.onClick}
        ref={this.imgRef}
      >
        {this.state.showInitial && (
          <Placeholder className="LazyImage__placeholder" />
        )}
        {this.props.initialSrc && this.state.showInitial && (
          <img
            src={this.props.initialSrc}
            alt={this.props.alt}
            title={this.props.title}
            className="LazyImage__initial"
          />
        )}
        {this.state.load && (
          <img
            src={this.props.src}
            alt={this.props.alt}
            title={this.props.title}
            className="LazyImage__lazy"
            onLoad={this.onLazyLoad}
            onAnimationEnd={this.onLazyImageFadeInEnd}
          />
        )}
      </div>
    );
  }

  intersectionCallback(entries, observer) {
    if (entries.some((entry) => entry.isIntersecting)) {
      this.onInView();
    }
  }

  onInView() {
    if (this.props.src) {
      this.setState({
        load: true,
      });
    }
    this.observer.disconnect();
    this.observer = null;
  }

  onLazyLoad() {
    this.setState({
      loaded: true,
    });
  }

  onLazyImageFadeInEnd() {
    this.setState({
      showInitial: false,
    });
  }

  calculateHeight() {
    const ratio =
      this.props.heightToWidthRatio ||
      (this.props.src && this.props.src.split("#")[1]) ||
      defaultHeightToWidthRatio;
    return ratio * 100 + "%";
  }
}

LazyImage.propTypes = {
  heightToWidthRatio: PropTypes.number,
  src: PropTypes.string,
  initialSrc: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
};
