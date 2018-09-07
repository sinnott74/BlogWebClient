import React from "react";
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

export default class App extends React.Component {
  render() {
    const className = this.props.darkTheme ? "app dark" : "app";
    return (
      <div className={className}>
        <SideNavLayout sideNavPanel={<SideNavPanel />}>
          <HeaderLayout title="Sinnott">
            <Routes />
            <OptionsMenu />
          </HeaderLayout>
        </SideNavLayout>
        <Toast />
        <ServiceWorker />
        <ScreenMediaQuery mediaQuery="(min-width: 1025px)" />
      </div>
    );
  }
}

App.propTypes = {
  darkTheme: PropTypes.bool
};
