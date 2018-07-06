import React from "react";
import PropTypes from "prop-types";

export default class ServiceWorker extends React.Component {
  constructor() {
    super();
    this._registerServiceWorker();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return null;
  }

  _registerServiceWorker() {
    let _self = this;
    if (!("serviceWorker" in navigator)) {
      // Service worker is not supported on this platform
      return;
    }

    navigator.serviceWorker
      .register("/service-worker.js", {
        scope: "/"
      })
      .then(function(registration) {
        console.log("Service worker is registered.");

        var isUpdate = false;

        // If this fires we should check if there's a new Service Worker
        // waiting to be activated. If so, ask the user to force refresh.
        if (registration.active) {
          isUpdate = true;
        }

        registration.onupdatefound = function(updateEvent) {
          console.log("A new Service Worker version has been found...");

          // If an update is found the spec says that there is a new Service
          // Worker installing, so we should wait for that to complete then
          // show a notification to the user.
          registration.installing.onstatechange = function(event) {
            if (this.state === "installed") {
              var message = isUpdate
                ? "App updated. Refresh for the new version."
                : "App ready for offline use.";
              _self.props.handleMessage(message);
            }
          };
        };
        console.log("After onupdatefound function set");
      })
      .catch(function(err) {
        console.log("Unable to register service worker.", err);
      });
  }
}

ServiceWorker.propTypes = {
  handleMessage: PropTypes.func.isRequired
};
