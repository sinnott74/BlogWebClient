import React from "react";
import PropTypes from "prop-types";
import "./CodeListItem.css";

const CodeListItem = props => {
  return (
    <div className="codelistitem">
      <div className="codelistitem__name">
        <a href={props.url}>{props.name}</a>
      </div>
      <div className="codelistitem__description">{props.description}</div>
    </div>
  );
};

CodeListItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default CodeListItem;
