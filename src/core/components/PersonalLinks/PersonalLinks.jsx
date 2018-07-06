import React from "react";
import PersonalLink from "./PersonalLink.jsx";
import Github from "core/images/github.svg";
import Facebook from "core/images/facebook.svg";
import Twitter from "core/images/twitter.svg";
import LinkedIn from "core/images/linkedin.svg";
import "./PersonalLinks.css";

// Functional Component
const PersonalLinks = props => {
  return (
    <div className="personallinks">
      <PersonalLink
        url="https://github.com/sinnott74"
        icon={Github}
        alt="Github"
      />
      <PersonalLink
        url="https://facebook.com/sinnott74"
        icon={Facebook}
        alt="Facebook"
      />
      <PersonalLink
        url="https://twitter.com/sinnott74"
        icon={Twitter}
        alt="Twitter"
      />
      <PersonalLink
        url="https://ie.linkedin.com/in/daniel-sinnott"
        icon={LinkedIn}
        alt="LinkedIn"
      />
    </div>
  );
};

export default PersonalLinks;
