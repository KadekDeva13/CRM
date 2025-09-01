import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import AppRouter from "./router/protectedRouter";
 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
