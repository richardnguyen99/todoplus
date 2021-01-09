import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { ToastProvider } from "./context";
import "./styles/client.scss";

ReactDOM.render(
  <ToastProvider>
    <App />
  </ToastProvider>,
  document.querySelector("#root")
);
