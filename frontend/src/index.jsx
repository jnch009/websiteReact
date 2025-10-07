import React from 'react';
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import Website from './components/Website/Website';
import * as serviceWorker from './serviceWorker';
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode><Website /></React.StrictMode>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
