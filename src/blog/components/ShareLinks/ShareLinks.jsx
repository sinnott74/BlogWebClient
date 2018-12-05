import React from "react";
import PropTypes from "prop-types";
import Icon from "core/components/Icon";
import Facebook from "core/images/facebook.svg";
import Twitter from "core/images/twitter.svg";
import "./ShareLinks.css";

export default class ShareLinks extends React.PureComponent {
  render() {
    return (
      <div className="sharelinks">
        <a
          className="sharelink"
          target="blank"
          rel="noopener noreferrer"
          href={`https://twitter.com/intent/tweet?url=${this.props.url}&text=${
            this.props.title
          }`}
        >
          <Icon
            className="sharelink__img"
            img={Twitter}
            alt="Share to Twitter"
          />
        </a>
        <a
          className="sharelink"
          target="blank"
          rel="noopener noreferrer"
          href={`https://www.facebook.com/sharer/sharer.php?u=${
            this.props.url
          }`}
        >
          <Icon
            className="sharelink__img"
            img={Facebook}
            alt="Share to Facebook"
          />
        </a>
      </div>
    );
  }
}

ShareLinks.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
