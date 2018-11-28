import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./LazyImage.css";

const defaultPlaceholderColor = "#dcdcdc";

/**
 * Image which loads its source when scrolled into view
 */
export default class LazyImage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      load: true,
      loaded: true,
      showInitial: false
    };

    this.imgRef = React.createRef();
    this.onSrcLoad = this.onSrcLoad.bind(this);
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
    const placeholderColor =
      this.props.placeholderColor || defaultPlaceholderColor;

    const className = classnames("LazyImage", this.props.className, {
      "LazyImage-loaded": this.state.loaded
    });

    const imgStyle = {
      ...this.props.style,
      position: this.state.showInitial ? "absolute" : "relative"
    };

    const placeHolderStyle = {
      ...this.props.style,
      backgroundColor: placeholderColor
    };

    return (
      <div
        className={className}
        style={this.props.style}
        onClick={this.props.onClick}
        ref={this.imgRef}
      >
        {this.state.showInitial && (
          <div className="LazyImage__placeholder" style={placeHolderStyle} />
        )}
        {this.props.initialSrc &&
          this.state.showInitial && (
            <img
              src={this.props.initialSrc}
              alt={this.props.alt}
              title={this.props.title}
              style={imgStyle}
              className="LazyImage__inital"
            />
          )}
        {this.state.load && (
          <img
            src={this.props.src}
            alt={this.props.alt}
            title={this.props.title}
            className="LazyImage__lazy"
            style={imgStyle}
            onLoad={this.onSrcLoad}
            onAnimationEnd={this.onLazyImageLoadAnimationEnd}
          />
        )}
      </div>
    );
  }

  intersectionCallback(entries, observer) {
    if (entries.some(entry => entry.isIntersecting)) {
      this.onInView();
    }
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

  onLazyImageFadeInEnd() {
    this.setState({
      showInitial: false
    });
  }
}

LazyImage.propTypes = {
  placeholderColor: PropTypes.string,
  src: PropTypes.string,
  initialSrc: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string)
};
