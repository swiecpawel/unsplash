import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Gallery from "./components/Gallery/Gallery";

ReactDOM.render(
  <React.StrictMode>

      <Router>
          <Switch>
              <Route exact path="/">
                  <App />
              </Route>
              <Route path="/:query">
                  <Gallery />
              </Route>
          </Switch>
      </Router>,

  </React.StrictMode>,
  document.getElementById("root")
);
