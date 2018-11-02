import React, { StrictMode } from "react";
import HeaderLayout from "core/containers/HeaderLayout";
import SideNavLayout from "core/containers/SideNavLayout";
import SideNavPanel from "core/components/SideNavPanel";
import OptionsMenu from "core/containers/OptionsMenu";
import Toast from "core/containers/Toast";
import ServiceWorker from "core/containers/ServiceWorker";
import Routes from "core/components/Routes";
import ScreenMediaQuery from "core/containers/ScreenMediaQuery";
import PropTypes from "prop-types";

import "core/components/Card";
import "./App.css";

export default class App extends React.PureComponent {
  render() {
    this.props.darkTheme
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");

    return (
      <div className="app">
        <StrictMode>
          <SideNavLayout
            sideNavPanel={<SideNavPanel isLoggedIn={this.props.isLoggedIn} />}
          >
            <HeaderLayout title="Sinnott">
              <Routes />
              <OptionsMenu />
            </HeaderLayout>
          </SideNavLayout>
          <Toast />
          <ServiceWorker />
          <ScreenMediaQuery mediaQuery="(min-width: 1025px)" />
        </StrictMode>
      </div>
    );
  }
}

App.propTypes = {
  darkTheme: PropTypes.bool,
  isLoggedIn: PropTypes.bool
};
