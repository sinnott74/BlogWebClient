import React from "react";
import PropTypes from "prop-types";
import Icon from "core/components/Icon";

const PersonalLink = props => {
  return (
    <a href={props.url}>
      <Icon img={props.icon} alt={props.alt} />
    </a>
  );
};

PersonalLink.propTypes = {
  url: PropTypes.string,
  icon: PropTypes.string,
  alt: PropTypes.string
};

export default PersonalLink;
