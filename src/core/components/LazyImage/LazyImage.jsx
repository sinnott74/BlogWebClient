import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import defaultSrc from "./default.svg";
import "./LazyImage.css";

/**
 * Image which loads its source when scrolled into view
 */
export default class LazyImage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      load: true,
      loaded: true
    };

    this.imgRef = React.createRef();
    this.onSrcLoad = this.onSrcLoad.bind(this);

    // IntersectionObserver exists, lazy load image
    if (window.IntersectionObserver) {
      this.intersectionCallback = this.intersectionCallback.bind(this);
      this.observer = new IntersectionObserver(this.intersectionCallback);
      this.state.load = false;
      this.state.loaded = false;
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
    const className = classnames("LazyImage", this.props.className, {
      "LazyImage-loaded": this.state.loaded
    });

    return (
      <div
        className={className}
        style={this.props.style}
        onClick={this.props.onClick}
      >
        <img
          src={this.props.initialSrc || defaultSrc}
          alt={this.props.alt}
          title={this.props.title}
          ref={this.imgRef}
          style={this.props.imgStyle}
          className="LazyImage__inital"
        />
        {this.state.load && (
          <img
            src={this.props.src}
            alt={this.props.alt}
            title={this.props.title}
            className="LazyImage__lazy"
            style={this.props.imgStyle}
            onLoad={this.onSrcLoad}
            onAnimationEnd={this.onLazyImageLoadAnimationEnd}
          />
        )}
      </div>
    );
  }

  intersectionCallback(entries, observer) {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        this.onInView();
      }
    });
  }

  onInView() {
    if (this.props.src) {
      this.setState({
        load: true
      });
    }
    this.observer.disconnect();
    this.observer = null;
  }

  onSrcLoad() {
    this.setState({
      loaded: true
    });
  }
}

LazyImage.propTypes = {
  src: PropTypes.string,
  initialSrc: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  imgStyle: PropTypes.objectOf(PropTypes.string),
  style: PropTypes.objectOf(PropTypes.string)
};
