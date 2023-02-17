import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TicTacToe from "./tic-tac-toe";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TicTacToe />
  </React.StrictMode>
);
