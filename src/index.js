import React from "react";
import ReactDOM from "react-dom/client";
import { Main } from "./components";
import { BrowserRouter as Router } from "react-router-dom";
// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);

root.render(
  <Router>
    <Main />
  </Router>
);
