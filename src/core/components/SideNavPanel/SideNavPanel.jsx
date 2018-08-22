import React from "react";
import SideNavLink from "core/components/SideNavLink";
import PersonalLinks from "core/components/PersonalLinks";
import { version } from "../../../../package.json";
import personalPic from "./me.jpg";
import "./SideNavPanel.css";

export default class SideNavPanel extends React.Component {
  render() {
    return (
      <div className="sidenvapanel">
        <div className="sidenavpanel__header">
          <img alt="Me" className="sidenavpanel__image" src={personalPic} />
          <h2 className="sidenavpanel__name">Daniel Sinnott</h2>
          <h4 className="sidenavpanel__email">Daniel.Sinnott@outlook.com</h4>
        </div>
        <div className="sidenavpanel__body">
          <div className="sidenavpanel__links">
            <SideNavLink to="/" icon="create">
              Blog
            </SideNavLink>
            <SideNavLink to="/about" icon="person_outline">
              About
            </SideNavLink>
            {/* <SideNavLink to="/code" icon="code">
              Code
            </SideNavLink> */}
          </div>
          <div className="sidenavpanel__contentbottom">
            <PersonalLinks />
            <div className="sidenavpanel__version">Version {version}</div>
          </div>
        </div>
      </div>
    );
  }
}
