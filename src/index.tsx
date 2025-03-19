import React from 'react';
import ReactDOM from "react-dom";
import App from "./App.tsx";

// Storage username
const username = "Admin";
localStorage.setItem("username", username);


ReactDOM.render(<App />, document.getElementById("root"));