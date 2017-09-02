import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./reduxStore";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);

registerServiceWorker();
