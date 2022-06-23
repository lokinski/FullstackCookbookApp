import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import App from "./App";
import { Global } from "./styles/global";
import "./styles/bootstrap.scss";

ReactDOM.render(
  <>
    <Global />
    <App />
  </>,
  document.getElementById("root")
);
