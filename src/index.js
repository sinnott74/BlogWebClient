import React from "react";
import ReactDOM from "react-dom";
import store, { history } from "core/redux/store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import App from "core/components/App";

// UI components to bundle centrally instead of within each page chunk
import "react-md/lib/Buttons/Button";
import "react-md/lib/TextFields/TextField";
import "react-md/lib/Pickers/DatePicker";

history.listen(function(location) {
  if (window.ga) {
    window.ga("set", "page", location.pathname + location.search);
    window.ga("send", "pageview", location.pathname + location.search);
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
