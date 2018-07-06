import React from "react";
import PropTypes from "prop-types";
import "./SideNavLayout.css";

export default class SideNavLayout extends React.Component {
  render() {
    return (
      <div className="side-nav-layout">
        <div
          className="side-nav side_nav--animatable"
          ref={sidenav => {
            this.sidenav = sidenav;
          }}
        >
          <div
            className="side-nav__scrim"
            onClick={this._handleScrimTap}
            ref={scrim => {
              this.scrim = scrim;
            }}
          />
          <div
            className="side-nav__content"
            onTouchStart={this._handleSideNavTouchStart}
            onTouchMove={this._handleSideNavTouchMove}
            onTouchEnd={this._handleSideNavTouchEnd}
            ref={sideNavContent => {
              this.sideNavContent = sideNavContent;
            }}
          >
            {this.props.sideNavPanel}
          </div>
          <div
            className="side-nav__edgearea"
            onTouchStart={this._handleEdgeTouchStart}
            onTouchMove={this._handleSideNavTouchMove}
            onTouchEnd={this._handleSideNavTouchEnd}
            ref={edge => {
              this.edge = edge;
            }}
          />
        </div>
        <div className="side-nav-layout_main">{this.props.children}</div>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.THRESHOLD = 15 * window.devicePixelRatio;
    this.MAXOPACITY = 0.85;

    this._close = this._close.bind(this);
    this._open = this._open.bind(this);
    this._updateUI = this._updateUI.bind(this);
    this._handleSideNavTouchStart = this._handleSideNavTouchStart.bind(this);
    this._handleSideNavTouchMove = this._handleSideNavTouchMove.bind(this);
    this._handleSideNavTouchEnd = this._handleSideNavTouchEnd.bind(this);
    this._handleEdgeTouchStart = this._handleEdgeTouchStart.bind(this);
    this._handleScrimTap = this._handleScrimTap.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.opened) {
      this._open();
    } else {
      this._close();
    }
  }

  _handleSideNavTouchStart(e) {
    this.sidenav.classList.remove("side_nav--animatable");
    this.sideNavContentWidth = this.sideNavContent.offsetWidth;
    this.touching = true;
    this.touchStartX = e.touches[0].pageX;
    this.touchStartY = e.touches[0].pageY;
    this.translateX = 0;
    this.translateY = 0;
    this.direction = "";
    this.do = this._close;
    this.undo = this._open;
  }

  _handleEdgeTouchStart(e) {
    this._handleSideNavTouchStart(e);
    this.sideNavContent.style.transform = "translate3d(-95%, 0 , 0)";
    this.touchingEdge = true;
    this.do = this._open;
    this.undo = this._close;
  }

  _handleSideNavTouchMove(e) {
    const diffX = this.touchingEdge
      ? e.touches[0].pageX - this.touchStartX
      : this.touchStartX - e.touches[0].pageX;
    this.translateX = clamp(diffX, 0, this.sideNavContentWidth);
    this.translateY = e.touches[0].pageY - this.touchStartY;

    if (!this.direction) {
      this.direction = this._getDirection(this.translateX, this.translateY);
    }

    if (this.direction === "horizontal") {
      requestAnimationFrame(this._updateUI);
    } else {
      this.translateX = 0;
    }
  }

  _updateUI() {
    if (this.touching) {
      let opacityPercentage =
        this.translateX / this.sideNavContentWidth * this.MAXOPACITY;
      let tranformX = this.translateX;

      if (this.touchingEdge) {
        tranformX = this.sideNavContentWidth - tranformX;
      } else {
        opacityPercentage = this.MAXOPACITY - opacityPercentage;
      }

      this.sideNavContent.style.transform =
        "translate3d(" + -tranformX + "px, 0, 0)";
      this.scrim.style.opacity = opacityPercentage;
    }
  }

  _handleSideNavTouchEnd(e) {
    this.sidenav.classList.add("side_nav--animatable");
    this.touching = false;
    this.direction = "";
    this.touchingEdge = false;

    if (this.translateX >= this.THRESHOLD) {
      this.do();
    } else {
      this.undo();
    }
  }

  _getDirection(translateX, translateY) {
    if (Math.abs(translateX) >= Math.abs(translateY)) {
      return "horizontal";
    } else {
      return "vertical";
    }
  }

  _handleScrimTap(e) {
    this.props.closeSideNav();
  }

  _handleLinkTap(e) {
    this.props.closeSideNav();
  }

  _close() {
    this.sidenav.classList.remove("side_nav--opened");
    this.sideNavContent.style.transform = "";
    this.scrim.style.opacity = "";
    document.body.classList.remove("noscroll");
    this.isOpened = false;

    setTimeout(() => {
      if (!this.isOpened && this.props.opened) {
        this.props.closeSideNav();
      }
    }, 130);
  }

  _open() {
    this.sidenav.classList.add("side_nav--opened");
    this.sideNavContent.style.transform = "";
    this.scrim.style.opacity = "";
    document.body.classList.add("noscroll");
    this.isOpened = true;

    setTimeout(() => {
      if (this.isOpened && !this.props.opened) {
        this.props.openSideNav();
      }
    }, 130);
  }
}

SideNavLayout.propTypes = {
  opened: PropTypes.bool.isRequired,
  openSideNav: PropTypes.func.isRequired,
  closeSideNav: PropTypes.func.isRequired,
  sideNavPanel: PropTypes.element.isRequired
};

/**
 * Clamps a value to between the Min & Max range
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
