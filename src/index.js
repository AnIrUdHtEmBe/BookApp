import React from "react";
import { createRoot } from "react-dom";
import "./styles/index.css";
import App from "./App";
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
