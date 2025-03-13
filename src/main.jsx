import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./Router";
import "./index.css"; // Import Tailwind CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
